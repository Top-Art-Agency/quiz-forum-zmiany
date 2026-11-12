/* =====================================================================
   Wspólna logika typów pytań (ekran, edytor, telefon).
   Pytanie (tak jak zapisuje je edytor / config.js):
   {
     type:   'choice' | 'multi' | 'text' | 'blanks' | 'number' | 'match',
     prompt: 'Treść pytania', image: 'plik.jpg' | 'data:…' | '', limit: 20,
     // choice / multi:
     answers: ['A', 'B', …], images: ['', …], correct: 1, correctSet: [0, 2],
     // text:
     accepted: 'Ice Bucket Challenge | ice bucket', scramble: false,
     // blanks:
     template: 'E – Environmental\nS – [[Social]]\nG – [[Governance]]',
     // number:
     value: 17, tolerance: 17, unit: 'mln zł', slider: false, min: 0, max: 5, step: 0.1,
     // match:
     pairs: [{ left: 'Scope 1', right: 'emisje bezpośrednie' }, …]
   }
   ===================================================================== */
(function(){
  const TYPES = {
    choice: { pl:'Wybór jednej odpowiedzi', en:'Single choice', badge:{ pl:'', en:'' } },
    multi:  { pl:'Wielokrotny wybór', en:'Multiple choice', badge:{ pl:'ZAZNACZ WSZYSTKIE POPRAWNE', en:'SELECT ALL CORRECT' } },
    text:   { pl:'Odpowiedź wpisywana', en:'Typed answer', badge:{ pl:'WPISZ ODPOWIEDŹ', en:'TYPE YOUR ANSWER' } },
    blanks: { pl:'Uzupełnij luki', en:'Fill in the blanks', badge:{ pl:'UZUPEŁNIJ BRAKUJĄCE SŁOWA', en:'FILL IN THE BLANKS' } },
    number: { pl:'Liczba – kto najbliżej', en:'Number – closest wins', badge:{ pl:'KTO NAJBLIŻEJ, WYGRYWA', en:'CLOSEST WINS' } },
    match:  { pl:'Dopasuj pary', en:'Match pairs', badge:{ pl:'POŁĄCZ W PARY', en:'MATCH THE PAIRS' } }
  };

  const toArr = v => Array.isArray(v) ? v : (v && typeof v === 'object' ? Object.keys(v).sort((a, b) => a - b).map(k => v[k]) : []);
  const num = (v, d) => { const n = typeof v === 'number' ? v : parseFloat(String(v == null ? '' : v).replace(',', '.')); return isFinite(n) ? n : d; };

  /* ---------- porównywanie tekstu ---------- */
  function norm(s){
    return String(s == null ? '' : s).toLowerCase()
      .replace(/ł/g, 'l').normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '');
  }
  function lev(a, b){
    if (a === b) return 0;
    const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
    let prev = Array.from({ length:n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++){
      const cur = [i];
      for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return prev[n];
  }
  const acceptedList = s => String(s || '').split('|').map(x => x.trim()).filter(Boolean);
  // Dobrze = taka sama odpowiedź po zignorowaniu wielkości liter, polskich znaków, spacji i interpunkcji,
  // z tolerancją drobnych literówek (1 przy krótkich, 2 przy dłuższych słowach)
  // albo odpowiedź zawierająca szukane słowo (np. „w listopadzie” → „listopad”).
  function textMatches(answer, accepted){
    const a = norm(answer); if (!a) return false;
    return acceptedList(accepted).some(acc => {
      const b = norm(acc); if (!b) return false;
      if (a === b) return true;
      const tol = b.length <= 4 ? 0 : b.length <= 8 ? 1 : 2;
      if (lev(a, b) <= tol) return true;
      if (b.length >= 3 && a.includes(b)) return true;
      return false;
    });
  }

  /* ---------- luki: „S – [[Social]]” ---------- */
  function parseTemplate(tpl){
    const blanks = [];
    const lines = String(tpl || '').split('\n').map(line => {
      const parts = []; let last = 0; const re = /\[\[([^\]]+)\]\]/g; let m;
      while ((m = re.exec(line))){
        if (m.index > last) parts.push({ t:line.slice(last, m.index) });
        parts.push({ b:blanks.length }); blanks.push(m[1]);
        last = m.index + m[0].length;
      }
      if (last < line.length) parts.push({ t:line.slice(last) });
      return parts;
    });
    return { lines, blanks };
  }

  /* ---------- pomocnicze ---------- */
  function shuffle(arr, seed){
    const a = arr.slice(); let s = seed || 1;
    const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function scrambleLetters(word, seed){
    const letters = String(word || '').toUpperCase().replace(/[^A-ZĄĆĘŁŃÓŚŹŻ0-9]/g, '').split('');
    let out = shuffle(letters, seed);
    if (out.join('') === letters.join('') && letters.length > 1) out = shuffle(letters, (seed || 1) + 7);
    return out;
  }
  function fmtNum(v, lang){
    if (v == null || !isFinite(v)) return '–';
    const r = Math.round(v * 1000) / 1000;
    return String(r).replace('.', lang === 'en' ? '.' : ',');
  }

  /* ---------- normalizacja (dane z edytora / serwera / config) ---------- */
  function normalizeItem(q){
    q = q || {};
    const type = TYPES[q.type] ? q.type : 'choice';
    const answers = toArr(q.answers).map(a => a == null ? '' : String(a));
    const images = toArr(q.images).map(a => a || '');
    while (images.length < answers.length) images.push('');
    return {
      type, prompt:String(q.prompt || ''), image:q.image || '', limit:num(q.limit, 0) || 0,
      answers, images:images.slice(0, answers.length),
      correct: typeof q.correct === 'number' ? q.correct : -1,
      correctSet: toArr(q.correctSet).map(Number).filter(n => n >= 0),
      accepted:String(q.accepted || ''), scramble:!!q.scramble,
      template:String(q.template || ''),
      value:num(q.value, null), valueTo:num(q.valueTo, null), tolerance:num(q.tolerance, null), unit:String(q.unit || ''),
      slider:!!q.slider, min:num(q.min, 0), max:num(q.max, 100), step:num(q.step, 1),
      pairs: toArr(q.pairs).map(p => ({ left:String((p && p.left) || ''), right:String((p && p.right) || '') })),
      label:String(q.label || ''), placeholder:String(q.placeholder || ''),
      ok: q.ok
    };
  }
  // Co trzeba poprawić, żeby pytanie trafiło do quizu
  function problems(q){
    const p = [];
    if (!String(q.prompt || '').trim() && !q.image) p.push('brak treści pytania');
    const has = i => !!(q.answers[i] && q.answers[i].trim()) || !!(q.images && q.images[i]);
    if (q.type === 'choice' || q.type === 'multi'){
      const filled = q.answers.filter((a, i) => has(i)).length;
      if (filled < 2) p.push('potrzebne co najmniej 2 odpowiedzi');
      if (q.answers.some((a, i) => !has(i))) p.push('pusta odpowiedź (wpisz tekst albo dodaj zdjęcie)');
      if (q.type === 'choice' && (q.correct < 0 || !has(q.correct))) p.push('zaznacz poprawną odpowiedź');
      if (q.type === 'multi' && !q.correctSet.filter(i => has(i)).length) p.push('zaznacz poprawne odpowiedzi');
    } else if (q.type === 'text'){
      if (!acceptedList(q.accepted).length) p.push('wpisz poprawną odpowiedź');
    } else if (q.type === 'blanks'){
      if (!parseTemplate(q.template).blanks.length) p.push('dodaj co najmniej jedną lukę [[…]]');
    } else if (q.type === 'number'){
      if (q.value == null) p.push('wpisz poprawną liczbę');
      if (q.slider && !(q.max > q.min)) p.push('zakres suwaka: maksimum musi być większe od minimum');
    } else if (q.type === 'match'){
      const full = q.pairs.filter(x => x.left.trim() && x.right.trim()).length;
      if (full < 2) p.push('potrzebne co najmniej 2 pary');
      if (q.pairs.some(x => !x.left.trim() || !x.right.trim())) p.push('niepełna para');
    }
    return p;
  }
  function defaultLimit(type, SC){
    const base = (SC && SC.timeLimitSec) || 20;
    return (type === 'text' || type === 'blanks' || type === 'match') ? Math.max(base, 30) : base;
  }
  // Domyślna tolerancja „kto najbliżej”: przy suwaku pół zakresu, przy roku 20 lat, w innym wypadku sama wartość
  function toleranceOf(q){
    if (q.tolerance != null && q.tolerance > 0) return q.tolerance;
    if (q.slider) return Math.max((q.max - q.min) / 2, 1e-9);
    if (q.value >= 1000 && q.value <= 2100 && Number.isInteger(q.value)) return 20;
    return Math.max(Math.abs(q.value || 0), 1);
  }

  // Napis na plakietce nad pytaniem (można nadpisać w edytorze)
  function defaultLabel(q, lang){
    const pl = lang !== 'en';
    if (q.type === 'choice'){
      const a = q.answers.map(x => norm(x));
      if (a.length === 2 && ((a[0] === 'prawda' && a[1] === 'falsz') || (a[0] === 'true' && a[1] === 'false'))) return pl ? 'PRAWDA CZY FAŁSZ' : 'TRUE OR FALSE';
      if (a.length === 4) return 'ABCD';
      return pl ? 'WYBIERZ ODPOWIEDŹ' : 'CHOOSE ONE';
    }
    if (q.type === 'multi') return pl ? 'WIELOKROTNY WYBÓR' : 'MULTIPLE CHOICE';
    if (q.type === 'text') return q.scramble ? (pl ? 'ROZSYPANKA LITEROWA' : 'SCRAMBLED LETTERS') : (q.image ? (pl ? 'PYTANIE OBRAZKOWE' : 'PICTURE QUESTION') : (pl ? 'ODPOWIEDŹ WŁASNA' : 'TYPE YOUR ANSWER'));
    if (q.type === 'blanks') return pl ? 'UZUPEŁNIJ BRAKUJĄCE SŁOWA' : 'FILL IN THE BLANKS';
    if (q.type === 'number') return q.slider ? (pl ? 'SUWAK – KTO NAJBLIŻEJ' : 'SLIDER – CLOSEST WINS') : (pl ? 'KTO NAJBLIŻEJ, WYGRYWA' : 'CLOSEST WINS');
    if (q.type === 'match') return pl ? 'DOPASOWYWANIE' : 'MATCHING';
    return '';
  }
  function defaultPlaceholder(q, lang){
    const pl = lang !== 'en';
    if (q.type === 'text') return q.scramble ? (pl ? 'Ułóż hasło z liter…' : 'Unscramble the letters…') : (pl ? 'Wpisz nazwę lub pojęcie…' : 'Type a name or term…');
    if (q.type === 'number') return pl ? 'Wpisz odpowiedź…' : 'Type your answer…';
    return '';
  }

  /* ---------- pytanie gotowe do gry (na ekranie) ---------- */
  function safeSrc(src){
    src = String(src || '').trim();
    if (/^data:image\/(png|jpe?g|gif|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/i.test(src)) return src;
    if (/^https?:\/\/[^\s"'<>]+$/i.test(src)) return src;
    if (/^[\w\-./%]+\.(png|jpe?g|gif|webp|svg)$/i.test(src) && !src.includes('..')) return src;
    return null;
  }
  function buildQuestion(item, SC, seed){
    const q = normalizeItem(item);
    const base = { type:q.type, prompt:q.prompt, image:safeSrc(q.image), limit:q.limit || defaultLimit(q.type, SC),
      label:(q.label || defaultLabel(q)).toUpperCase(), placeholder:q.placeholder || defaultPlaceholder(q) };
    if (q.type === 'choice' || q.type === 'multi'){
      return Object.assign(base, { options:q.answers, optionImages:q.images.map(safeSrc),
        correctIndex:q.correct, correctSet:q.type === 'multi' ? q.correctSet : [q.correct] });
    }
    if (q.type === 'text'){
      const acc = acceptedList(q.accepted);
      return Object.assign(base, { accepted:q.accepted, answerText:acc[0] || '', letters:q.scramble ? scrambleLetters(acc[0], seed) : null });
    }
    if (q.type === 'blanks'){
      const t = parseTemplate(q.template);
      return Object.assign(base, { lines:t.lines, blanks:t.blanks });
    }
    if (q.type === 'number'){
      return Object.assign(base, { value:q.value, valueTo:(q.valueTo != null && q.valueTo > q.value) ? q.valueTo : null, tolerance:toleranceOf(q), unit:q.unit, slider:q.slider, min:q.min, max:q.max, step:q.step || 1 });
    }
    if (q.type === 'match'){
      const pairs = q.pairs.filter(x => x.left.trim() && x.right.trim());
      const order = shuffle(pairs.map((_, i) => i), seed);   // order[k] = która prawa strona stoi na pozycji k
      return Object.assign(base, { lefts:pairs.map(x => x.left), rights:pairs.map(x => x.right), order });
    }
    return base;
  }
  // To, co dostają telefony (bez poprawnych odpowiedzi)
  function publicView(q){
    const v = { type:q.type, prompt:q.prompt, image:q.image || null, label:q.label, placeholder:q.placeholder || '' };
    if (q.type === 'choice' || q.type === 'multi'){ v.options = q.options; v.optionImages = q.optionImages.map(x => x || ''); }
    if (q.type === 'text') v.letters = q.letters || null;
    if (q.type === 'blanks') v.lines = q.lines.map(l => l.map(p => p.b != null ? { b:p.b } : { t:p.t })), v.nBlanks = q.blanks.length;
    if (q.type === 'number') Object.assign(v, { unit:q.unit, slider:q.slider, min:q.min, max:q.max, step:q.step });
    if (q.type === 'match') Object.assign(v, { lefts:q.lefts, rights:q.order.map(i => q.rights[i]) });
    return v;
  }

  /* ---------- ocenianie ----------
     Zwraca { fraction 0..1, valid, shown (odpowiedź gracza jako tekst) }.
     Liczby: fraction = bliskość do wyniku (1 = dokładnie), najbliżsi dostają pełne punkty osobno. */
  function grade(q, v, lang){
    const L = 'ABCDEF';
    if (q.type === 'choice'){
      const i = parseInt(v, 10); if (!(i >= 0 && i < q.options.length)) return { valid:false };
      return { valid:true, index:i, fraction: i === q.correctIndex ? 1 : 0, shown: L[i] + (q.options[i] ? '. ' + q.options[i] : '') };
    }
    if (q.type === 'multi'){
      const sel = Array.from(new Set(toArr(v).map(Number).filter(i => i >= 0 && i < q.options.length)));
      if (!sel.length) return { valid:true, sel, fraction:0, shown:'–' };
      const good = sel.filter(i => q.correctSet.includes(i)).length, bad = sel.length - good;
      const f = Math.max(0, (good - bad) / q.correctSet.length);
      return { valid:true, sel, fraction:Math.min(1, f), shown: sel.sort((a, b) => a - b).map(i => L[i]).join(', ') };
    }
    if (q.type === 'text'){
      const s = String(v == null ? '' : v).trim().slice(0, 80);
      return { valid:true, text:s, fraction: textMatches(s, q.accepted) ? 1 : 0, shown: s || '–' };
    }
    if (q.type === 'blanks'){
      const arr = toArr(v).map(x => String(x == null ? '' : x).trim().slice(0, 60));
      const okEach = q.blanks.map((acc, i) => textMatches(arr[i], acc));
      return { valid:true, list:arr, okEach, fraction: okEach.filter(Boolean).length / Math.max(1, q.blanks.length), shown: arr.map(x => x || '…').join(' / ') };
    }
    if (q.type === 'number'){
      const n = num(v, null); if (n == null) return { valid:false };
      // zakres (np. 30–35%): każda liczba w środku jest dokładnie trafiona
      const hi = q.valueTo != null ? q.valueTo : q.value;
      const err = n < q.value ? q.value - n : n > hi ? n - hi : 0;
      return { valid:true, n, err, fraction: Math.max(0, 1 - err / q.tolerance), shown: fmtNum(n, lang) + (q.unit ? ' ' + q.unit : '') };
    }
    if (q.type === 'match'){
      const arr = toArr(v).map(x => parseInt(x, 10));
      const okEach = q.lefts.map((_, i) => arr[i] >= 0 && q.order[arr[i]] === i);
      return { valid:true, list:arr, okEach, fraction: okEach.filter(Boolean).length / Math.max(1, q.lefts.length),
        shown: okEach.filter(Boolean).length + '/' + q.lefts.length };
    }
    return { valid:false };
  }
  // Poprawna odpowiedź jako tekst (na telefon i ekran)
  function correctText(q, lang){
    const L = 'ABCDEF';
    if (q.type === 'choice') return L[q.correctIndex] + (q.options[q.correctIndex] ? '. ' + q.options[q.correctIndex] : '');
    if (q.type === 'multi') return q.correctSet.slice().sort((a, b) => a - b).map(i => L[i] + (q.options[i] ? '. ' + q.options[i] : '')).join(' · ');
    if (q.type === 'text') return q.answerText;
    if (q.type === 'blanks') return q.blanks.map(b => acceptedList(b)[0]).join(' / ');
    if (q.type === 'number') return fmtNum(q.value, lang) + (q.valueTo != null ? '–' + fmtNum(q.valueTo, lang) : '') + (q.unit ? ' ' + q.unit : '');
    if (q.type === 'match') return q.lefts.map((l, i) => l + ' → ' + q.rights[i]).join(' · ');
    return '';
  }

  /* ---------- stary format tekstowy (pytania ABCD) ---------- */
  function parseText(text, SC){
    const out = [];
    String(text || '').split(/\n\s*\n/).map(b => b.trim()).filter(Boolean).forEach(block => {
      const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length < 3) return;
      let prompt = lines[0], limit = 0;
      const m = prompt.match(/\[(\d+)\s*s?\]\s*$/i);
      if (m){ limit = Math.max(5, parseInt(m[1], 10)); prompt = prompt.slice(0, m.index).trim(); }
      let image = '', rest = lines.slice(1);
      if (rest.length && /^\[zdj[eę]cie\]/i.test(rest[0])){ image = rest[0].replace(/^\[zdj[eę]cie\]\s*/i, '').trim(); rest = rest.slice(1); }
      const answers = [], images = []; let correct = -1;
      rest.slice(0, 6).forEach(l => {
        if (l.startsWith('*')){ correct = answers.length; l = l.slice(1).trim(); }
        const k = l.indexOf('[img]');
        answers.push(k >= 0 ? l.slice(0, k).trim() : l); images.push(k >= 0 ? l.slice(k + 5).trim() : '');
      });
      out.push({ type:'choice', prompt, image, limit, answers, images, correct });
    });
    return out;
  }
  function toText(items){
    return items.filter(q => q.type === 'choice').map(q => {
      const lines = [q.prompt.replace(/\s+/g, ' ').trim() + (q.limit ? ' [' + q.limit + 's]' : '')];
      if (q.image) lines.push('[zdjęcie] ' + q.image);
      q.answers.forEach((a, i) => {
        const txt = a.replace(/\s+/g, ' ').trim().replace(/^\*+/, '').replace(/\[img\]/g, '');
        const img = q.images[i];
        lines.push((i === q.correct ? '*' : '') + (img ? (txt ? txt + ' ' : '') + '[img] ' + img : txt));
      });
      return lines.join('\n');
    }).join('\n\n');
  }

  window.QuizCore = { TYPES, toArr, num, norm, lev, textMatches, acceptedList, parseTemplate, shuffle, scrambleLetters, fmtNum,
    normalizeItem, problems, defaultLimit, defaultLabel, defaultPlaceholder, toleranceOf, safeSrc, buildQuestion, publicView, grade, correctText, parseText, toText };
})();
