/* =====================================================================
   KONFIGURACJA QUIZU — wszystko, co zmieniasz pod konkretny event,
   jest w tym jednym pliku. Pozostałych plików nie trzeba ruszać.
   ===================================================================== */
window.QUIZ_CONFIG = {

  /* ---------- BRANDING ---------- */
  eventName: 'Forum Odpowiedzialnej Zmiany',
  tagline:   'Quiz społeczno-ESG · Poznań, 17 listopada 2026',
  logo:      'logo.svg',       // ścieżka do logo (SVG/PNG); '' = brak logo
  kv:        'kv.jpg',         // tło ekranu lobby (KV eventu); '' = brak
  colors: {
    bg:       '#06254A',   // tło (granat z KV)
    surface:  '#0E3463',   // karty / panele
    text:     '#FFFFFF',   // główny tekst
    muted:    '#A9C3E3',   // tekst pomocniczy
    primary:  '#1999E1',   // jasny niebieski z KV (przyciski, akcenty)
    accent:   '#5CC8FF',   // punkty, licznik
    correct:  '#22C55E',   // poprawna odpowiedź
    wrong:    '#EF4444'    // błędna odpowiedź
  },
  // Kolory kafli odpowiedzi A/B/C/D (na ekranie i telefonie)
  answerColors: ['#1999E1', '#0B5FA8', '#2FB5A8', '#5B6CD8'],
  fonts: {
    googleFontsUrl: 'fonts.css',   // arkusz z fontami (lokalny albo link do Google Fonts)
    heading: "'Barlow Condensed', 'Arial Narrow', sans-serif",
    headingStyle: 'italic',
    body:    "'Poppins', system-ui, sans-serif"
  },
  defaultLang: 'pl',                  // 'pl' albo 'en'
  // Napis przy polu imienia na telefonie (np. przy rywalizacji stolikowej)
  nameLabel: { pl: 'Imię albo nazwa stolika', en: 'Your name or table name' },

  /* ---------- SERWER (Firebase Realtime Database) ---------- */
  // Baza: projekt gryeventowe-632b8 (Realtime Database, Belgia).
  // Dane quizu trafiają do osobnej gałęzi: quiz/<roomId>.
  firebase: {
    apiKey: "AIzaSyAZEL93JgA5LfmiAWLJFAaLN2F7q-e5QgY",
    authDomain: "gryeventowe.firebaseapp.com",
    databaseURL: "https://gryeventowe-632b8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gryeventowe",
    storageBucket: "gryeventowe.firebasestorage.app",
    messagingSenderId: "15592080978",
    appId: "1:15592080978:web:fa8fc79a3f0a3ad3b6418b"
  },
  // Nazwa „pokoju” gry. Kod QR zależy tylko od niej, więc jest stały
  // (można go wydrukować). Na kolejny event zmień nazwę = czysta gra.
  roomId: 'forum-odp-zmiany-2026',

  /* ---------- PUNKTACJA ---------- */
  scoring: {
    timeLimitSec: 20,     // domyślny czas na pytanie (można nadpisać per pytanie: [30s])
    maxPoints: 1000,      // za poprawną odpowiedź w 0 sekund
    minPoints: 500,       // za poprawną odpowiedź w ostatniej chwili
    wrongPoints: 0        // za złą odpowiedź / brak odpowiedzi
  },
  // Ranking: najpierw więcej punktów, przy remisie krótszy łączny czas
  // poprawnych odpowiedzi.

  /* ---------- PYTANIA ---------- */
  // Pytania startowe quizu (edytor zapisuje swoje zmiany na serwerze i ma pierwszeństwo).
  // Najwygodniej zmieniać je w edytorze; „Pobierz config.js” w edytorze zapisuje tu aktualną listę.
  // Numer zestawu pytań. Pytania z edytora są używane tylko, jeśli zapisano je dla tego samego numeru
  // (chroni przed nadpisaniem nowego zestawu przez starą wersję edytora).
  questionsVersion: 2,
  questionsList: /*LISTA*/[
  {
    "type": "text",
    "label": "ROZPOZNAJ ZE ZDJĘCIA",
    "prompt": "",
    "image": "ice-bucket.jpg",
    "accepted": "Ice Bucket Challenge | ice bucket | ALS Ice Bucket Challenge | wyzwanie z wiadrem",
    "placeholder": "Wpisz nazwę akcji…",
    "limit": 30
  },
  {
    "type": "blanks",
    "label": "UZUPEŁNIJ SKRÓT",
    "prompt": "Co dokładnie oznacza skrót ESG?",
    "template": "E – Environmental\nS – [[Social|Społeczny|Społeczna odpowiedzialność]]\nG – [[Governance|Corporate Governance|Ład korporacyjny]]",
    "limit": 40
  },
  {
    "type": "multi",
    "label": "WIELOKROTNY WYBÓR",
    "prompt": "Które firmy zostały wyróżnione „Złotym Listkiem ESG POLITYKI 2025”? Zaznacz wszystkie poprawne.",
    "answers": [
      "Energa SA",
      "ING Bank Śląski",
      "Lidl Polska",
      "Santander Bank Polska",
      "Solaris Bus & Coach",
      "mBank"
    ],
    "images": [
      "",
      "",
      "",
      "",
      "",
      ""
    ],
    "correctSet": [
      0,
      1,
      2,
      3,
      4
    ],
    "limit": 40
  },
  {
    "type": "choice",
    "label": "ABCD",
    "prompt": "Co oznacza skrót DEI w kontekście HR i kultury organizacyjnej?",
    "answers": [
      "Diversity, Equity, Inclusion",
      "Development, Ethics, Innovation",
      "Direct Employee Involvement",
      "Digital Education Initiative"
    ],
    "images": [
      "",
      "",
      "",
      ""
    ],
    "correct": 0
  },
  {
    "type": "number",
    "label": "SUWAK PROCENTOWY",
    "prompt": "Jaki procent podatku PIT można przekazać organizacji pożytku publicznego?",
    "value": 1.5,
    "unit": "%",
    "slider": true,
    "min": 0,
    "max": 5,
    "step": 0.1,
    "limit": 25
  },
  {
    "type": "number",
    "label": "KTO NAJBLIŻEJ, WYGRYWA",
    "prompt": "Ile pieniędzy zebrała rekordowa zbiórka Łatwoganga na rzecz Fundacji Cancer Fighters?",
    "value": 290,
    "unit": "mln zł",
    "limit": 30
  },
  {
    "type": "number",
    "label": "KTO NAJBLIŻEJ, WYGRYWA",
    "prompt": "Ile litrów wody potrzeba do wyprodukowania jednej klasycznej bawełnianej koszulki?",
    "value": 2700,
    "unit": "litrów",
    "limit": 30
  },
  {
    "type": "text",
    "label": "ROZSYPANKA LITEROWA",
    "prompt": "Jak nazywa się niewidzialna bariera utrudniająca kobietom awans na najwyższe stanowiska?",
    "accepted": "Szklany sufit | glass ceiling",
    "scramble": true,
    "placeholder": "Ułóż wyrażenie z podanych liter…",
    "limit": 40
  },
  {
    "type": "choice",
    "label": "ABCD",
    "prompt": "Jak nazywa się przedświąteczna akcja społeczna łącząca potrzebujące rodziny z darczyńcami?",
    "answers": [
      "Wielka Orkiestra Świątecznej Pomocy",
      "Szlachetna Paczka",
      "Pajacyk",
      "Serce dla Dzieci"
    ],
    "images": [
      "",
      "",
      "",
      ""
    ],
    "correct": 1
  },
  {
    "type": "text",
    "label": "ODPOWIEDŹ WŁASNA",
    "prompt": "Jak nazywa się fundacja założona przez aktorkę Magdalenę Różczkę?",
    "accepted": "Ukochani | Fundacja Ukochani",
    "limit": 30
  },
  {
    "type": "number",
    "label": "ODPOWIEDŹ LICZBOWA",
    "prompt": "Ile Celów Zrównoważonego Rozwoju wyznaczyła ONZ w Agendzie 2030?",
    "value": 17,
    "unit": "celów",
    "limit": 25
  },
  {
    "type": "number",
    "label": "PODAJ ROK",
    "prompt": "W którym roku uchwalono w Polsce ustawę o działalności pożytku publicznego i o wolontariacie?",
    "value": 2003,
    "limit": 25
  },
  {
    "type": "choice",
    "label": "WSKAŻ AKTYWNOŚĆ",
    "prompt": "Która z aktywności jest przykładem wolontariatu kompetencyjnego?",
    "answers": [
      "Doradztwo marketingowe dla NGO",
      "Sprzątanie lasu",
      "Malowanie płotu",
      "Zbiórka pieniędzy"
    ],
    "images": [
      "",
      "",
      "",
      ""
    ],
    "correct": 0
  },
  {
    "type": "number",
    "label": "PODAJ ROK",
    "prompt": "W którym roku wystartował projekt „MŁODE GŁOWY. Otwarcie o zdrowiu psychicznym”?",
    "value": 2022,
    "limit": 25
  },
  {
    "type": "choice",
    "label": "PRAWDA CZY FAŁSZ",
    "prompt": "Fast Fashion to model szybkiej, masowej produkcji taniej odzieży, często generujący dużo odpadów.",
    "answers": [
      "Prawda",
      "Fałsz"
    ],
    "images": [
      "",
      ""
    ],
    "correct": 0
  },
  {
    "type": "text",
    "label": "ROZPOZNAJ SYMBOL",
    "prompt": "Co symbolizuje ten znak?",
    "image": "czerwona-wstazka.svg",
    "accepted": "Solidarność z osobami żyjącymi z HIV/AIDS | HIV | AIDS | walka z AIDS",
    "placeholder": "Wpisz odpowiedź…",
    "limit": 30
  },
  {
    "type": "text",
    "label": "ODPOWIEDŹ WŁASNA",
    "prompt": "Jak nazywa się zjawisko, gdy firma nie komunikuje swoich działań proekologicznych z obawy przed krytyką?",
    "accepted": "Greenhushing | green hushing",
    "limit": 30
  },
  {
    "type": "number",
    "label": "KTO NAJBLIŻEJ, WYGRYWA",
    "prompt": "Jaki szacunkowy procent populacji Polski stanowią osoby w kryzysie bezdomności?",
    "value": 0.08,
    "unit": "%",
    "limit": 30
  },
  {
    "type": "number",
    "label": "KTO NAJBLIŻEJ, WYGRYWA",
    "prompt": "Jaki procent Polaków deklaruje, że przynajmniej raz w życiu brał udział w wolontariacie?",
    "value": 30,
    "valueTo": 35,
    "unit": "%",
    "limit": 30
  },
  {
    "type": "choice",
    "label": "ABCD",
    "prompt": "Co oznacza pojęcie „Payroll Giving”?",
    "answers": [
      "System premii pracowniczych",
      "Część pensji na cele charytatywne",
      "Płatny urlop szkoleniowy",
      "Automatyczne rozliczanie nadgodzin"
    ],
    "images": [
      "",
      "",
      "",
      ""
    ],
    "correct": 1
  },
  {
    "type": "choice",
    "label": "PRAWDA CZY FAŁSZ",
    "prompt": "Rainbowwashing oznacza marketingowe wykorzystywanie symboli LGBTQ+ bez rzeczywistych zmian w firmie.",
    "answers": [
      "Prawda",
      "Fałsz"
    ],
    "images": [
      "",
      ""
    ],
    "correct": 0
  },
  {
    "type": "text",
    "label": "ODPOWIEDŹ WŁASNA",
    "prompt": "Młodszy pracownik uczy menedżera nowych technologii. Jak nazywa się ten model mentoringu?",
    "accepted": "Reverse Mentoring | mentoring odwrócony | odwrócony mentoring | mentoring odwrotny",
    "limit": 30
  },
  {
    "type": "text",
    "label": "PYTANIE OBRAZKOWE",
    "prompt": "W którym miesiącu odbywa się akcja, której symbolem są te wąsy?",
    "image": "wasy.svg",
    "accepted": "listopad | listopadzie | november",
    "placeholder": "Wpisz miesiąc…",
    "limit": 25
  },
  {
    "type": "match",
    "label": "DOPASOWYWANIE",
    "prompt": "Połącz rodzaj emisji z odpowiednim zakresem.",
    "pairs": [
      {
        "left": "Scope 1",
        "right": "Emisje bezpośrednie firmy"
      },
      {
        "left": "Scope 2",
        "right": "Emisje z zakupionej energii"
      },
      {
        "left": "Scope 3",
        "right": "Emisje w łańcuchu wartości"
      }
    ],
    "limit": 40
  },
  {
    "type": "choice",
    "label": "PRAWDA CZY FAŁSZ",
    "prompt": "Od pierwszego finału w 1993 roku WOŚP zebrała łącznie ponad 2 miliardy złotych.",
    "answers": [
      "Prawda",
      "Fałsz"
    ],
    "images": [
      "",
      ""
    ],
    "correct": 0
  },
  {
    "type": "text",
    "label": "ODPOWIEDŹ WŁASNA",
    "prompt": "Która marka kosmetyczna stworzyła kampanię „Prawdziwe Piękno”?",
    "accepted": "Dove",
    "limit": 30
  }
]/*KONIEC*/,

  // Stary format tekstowy (używany tylko, gdy questionsList jest pusta).
  // Format: pytanie w pierwszej linii, odpowiedzi pod spodem,
  // poprawną oznacz gwiazdką *. Pusta linia = kolejne pytanie.
  // Opcjonalnie na końcu linii pytania: [30s] = własny limit czasu.
  // Opcjonalne zdjęcia: druga linia „[zdjęcie] plik.jpg” (zdjęcie pytania),
  // przy odpowiedzi „Tekst [img] plik.jpg” albo samo „[img] plik.jpg”.
  // Plik wgraj do repo obok index.html albo podaj pełny link https://…
  // UWAGA: jeśli pytania były edytowane na ekranie (przycisk PYTANIA),
  // przeglądarka pamięta tamtą wersję — „PRZYWRÓĆ Z CONFIG” wraca do tej.
  questions: ``
};
