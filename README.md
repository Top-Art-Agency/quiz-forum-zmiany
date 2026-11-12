# Quiz — Forum Odpowiedzialnej Zmiany

Quiz na żywo na event: ekran na projektorze + telefony uczestników (skanują QR).
Działa jako statyczna strona na GitHub Pages — bez serwera i bez bazy danych.

## Pliki

| Plik | Co to jest |
|---|---|
| `index.html` | **Ekran prowadzącego** (projektor / TV) |
| `play.html` | **Strona gracza** (telefon, otwiera się z kodu QR) |
| `config.js` | **Jedyny plik do edycji**: nazwa, kolory, logo, punktacja, pytania |
| `brand.js` | Nakłada branding z `config.js` (nie ruszać) |
| `edytor.html` | **Edytor pytań** (otwiera się przyciskiem EDYTUJ PYTANIA) |
| `logo.svg`, `kv.jpg` | Logo (strzałki z KV) i KV wyświetlany w lobby |
| `fonts.css`, `*.woff2` | Fonty (Barlow Condensed + Poppins) hostowane lokalnie |

## Publikacja na GitHub Pages

1. Na koncie `top-art-agency` załóż nowe **publiczne** repozytorium, np. `quiz-forum-zmiany`.
2. **Add file → Upload files** → przeciągnij **wszystkie pliki** z tego folderu (leżą razem w głównym katalogu).
3. **Settings → Pages** → Source: *Deploy from a branch*, Branch: `main`, folder `/ (root)` → Save.
4. Po 1–2 minutach ekran quizu będzie pod adresem:
   `https://top-art-agency.github.io/quiz-forum-zmiany/`

## Typy pytań

| Typ (w edytorze) | Na telefonie | Punkty |
|---|---|---|
| ABCD / Prawda-Fałsz | jedna odpowiedź | 1000→500 pkt zależnie od czasu |
| Wielokrotny wybór | zaznacz kilka + WYŚLIJ | część punktów za częściowo dobre (złe zaznaczenia odejmują) |
| Odpowiedź wpisywana / rozsypanka | pole tekstowe | jak ABCD; wielkość liter, polskie znaki i drobne literówki nie mają znaczenia |
| Uzupełnij luki (`[[odpowiedź]]`) | pole na każdą lukę | proporcjonalnie do trafionych luk |
| Liczba / rok / suwak – kto najbliżej | liczba albo suwak | najbliżsi 1000 pkt, reszta proporcjonalnie do bliskości |
| Dopasuj pary | lista wyboru przy każdym pojęciu | proporcjonalnie do trafionych par |

Pytanie bez treści, ale ze zdjęciem = na ekranie samo zdjęcie (np. „rozpoznaj ze zdjęcia”). Plakietkę nad pytaniem (np. „PODAJ ROK”) można zmienić w edytorze.

## Punktacja

- Każdy gracz odpowiada **raz** na każde pytanie, w limicie czasu (domyślnie 20 s, przy długich pytaniach 30 s).
- Poprawna odpowiedź = **od 1000 pkt (natychmiast) do 500 pkt (w ostatniej chwili)**, liniowo wg czasu.
- Zła odpowiedź lub brak odpowiedzi = 0 pkt.
- **Ranking:** najpierw suma punktów; przy remisie wygrywa ten, kto miał **krótszy łączny czas poprawnych odpowiedzi**.
- Czas mierzony jest na telefonie od momentu pojawienia się pytania, więc słabszy zasięg nie odbiera punktów.

Wszystkie liczby zmienisz w `config.js` → `scoring`.

## Przebieg na evencie

1. Otwórz ekran (`index.html`) na komputerze podpiętym do projektora, kliknij ⛶ (pełny ekran — chowa przyciski pomocnicze).
2. Uczestnicy skanują QR, wpisują imię albo nazwę stolika → pojawiają się na liście.
3. Prowadzisz quiz jednym przyciskiem albo **spacją / strzałką → / pilotem do prezentacji**:
   **ROZPOCZNIJ → POKAŻ ODPOWIEDŹ → RANKING → NASTĘPNE PYTANIE → … → POKAŻ ZWYCIĘZCÓW** (podium top 3).
   Runda kończy się sama, gdy minie czas albo wszyscy odpowiedzą.
4. Po rundzie ekran pokazuje poprawną odpowiedź, rozkład głosów i 3 najszybszych; telefon pokazuje graczowi jego punkty, czas i miejsce.
5. **EKSPORT CSV** zapisuje pełne wyniki (otwiera się w Excelu).
6. **PRZERWIJ** (albo klawisz Esc poza pełnym ekranem) w każdej chwili wraca do lobby, a wyniki zostają. Potem możesz:
   - **KONTYNUUJ OD PYTANIA N**: przerwane pytanie zostanie zadane jeszcze raz,
   - **ZAKOŃCZ I POKAŻ ZWYCIĘZCÓW**: od razu podium z dotychczasowymi wynikami,
   - **NOWA GRA**: od początku, z wyzerowanymi wynikami.

### Odporność na problemy

- **Telefon się odświeży / zablokuje / zgubi zasięg** — gracz wraca automatycznie z tymi samymi punktami (odpowiedzi nie da się wysłać drugi raz).
- **Ekran się odświeży albo zawiesi** — wyniki są na serwerze; po ponownym otwarciu przycisk pokazuje „KONTYNUUJ OD PYTANIA N”. Można nawet przejść na inny laptop.
- **Kod QR jest stały** (zależy od `roomId` w `config.js`) — można go wydrukować na stoliki.
- **NOWA GRA** zeruje wyniki (np. po próbie przed właściwym quizem).

## Edycja pytań

**Najprościej:** w lobby kliknij **EDYTUJ PYTANIA**. Edytor otwiera się w osobnym oknie (przeciągnij je na ekran laptopa, żeby publiczność nie widziała odpowiedzi).
- **+ Dodaj pytanie**, wpisz treść i odpowiedzi, zaznacz **poprawna**, wybierz czas.
- Pytania można przesuwać ↑ ↓, duplikować i usuwać; do 6 odpowiedzi na pytanie.
- Zmiany zapisują się same **na serwerze** i od razu trafiają na ekran quizu na dowolnym komputerze, także w trakcie gry (nowe pytania na końcu pojawią się po bieżącym).
- **Zdjęcia (opcjonalne):** 🖼 *Dodaj zdjęcie* pod treścią pytania oraz ikonka 🖼 przy każdej odpowiedzi. Odpowiedź może być samym zdjęciem. Zdjęcia są automatycznie zmniejszane, żeby szybko docierały na telefony. Zamiast wgrywać plik możesz też podać link albo nazwę pliku wgranego do repo (🔗).
- **Tryb tekstowy** pozwala wkleić lub skopiować całą listę naraz.
- GitHub nie jest potrzebny do zmiany pytań. **Pobierz config.js** zapisuje kopię zapasową pytań w pliku; **Przywróć z config.js** wraca do pytań z pliku.

Ręcznie w `config.js` → `questions`:

```
Treść pytania? [30s]
Zła odpowiedź
*Poprawna odpowiedź
Zła odpowiedź
Zła odpowiedź
```

Gwiazdka `*` = poprawna, pusta linia = kolejne pytanie, `[30s]` (opcjonalnie) = własny limit czasu.

Zdjęcia (opcjonalnie) — pliki wgraj do repo obok `index.html`:

```
Co widać na zdjęciu?
[zdjęcie] pytanie1.jpg
Odpowiedź tekstowa
*Odpowiedź ze zdjęciem [img] odp-b.jpg
[img] odp-c.jpg
```

## Test obciążenia

`test.html` udaje wielu graczy (boty z osobnymi połączeniami) w **osobnym pokoju** `test-obciazenia`:
1. Otwórz `…/test.html`, kliknij link do ekranu testowego (`index.html?room=test-obciazenia`).
2. Ustaw liczbę botów → **START**, potem prowadź quiz na ekranie testowym.
3. Tabela pokazuje, ile botów dostało pytanie i wynik oraz z jakim opóźnieniem. Na koniec **ZATRZYMAJ** i **WYCZYŚĆ POKÓJ TESTOWY**.

## Serwer — Firebase Realtime Database

Ekran i telefony łączą się przez bazę **Firebase Realtime Database** w projekcie `gryeventowe` (ten sam co ranking gier). Dane quizu są w osobnej gałęzi `quiz/forum-odp-zmiany-2026`, nie mieszają się z rankingiem.

**Jednorazowo sprawdź reguły bazy:** [console.firebase.google.com](https://console.firebase.google.com) → projekt *gryeventowe* → **Realtime Database → Rules**.
- Jeśli widzisz `".read": true, ".write": true` — nic nie rób.
- Jeśli widzisz datę, np. `"now < 1760000000000"` (tryb testowy, który wygasa) albo quiz pokazuje „Serwer odmówił zapisu” — wklej i kliknij **Publish**:

```json
{
  "rules": {
    "scores":       { ".read": true, ".write": true },
    "questionSets": { ".read": true, ".write": true },
    "quiz":         { ".read": true, ".write": true }
  }
}
```

**Limit darmowego planu (Spark): 100 urządzeń naraz** (ekran + telefony). Przy większej grupie przełącz projekt na plan **Blaze** (płatność za użycie — przy jednym quizie to grosze albo 0 zł, wymaga podpięcia karty).

Pozostałe wymagania: internet na laptopie z ekranem i na telefonach. Zrób próbę na miejscu przed eventem.
