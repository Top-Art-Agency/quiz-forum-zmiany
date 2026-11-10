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

### Odporność na problemy

- **Telefon się odświeży / zablokuje** — gracz wraca automatycznie z tymi samymi punktami.
- **Ekran się odświeży** — kod QR zostaje ten sam, telefony same łączą się ponownie, wyniki zostają; przycisk pokazuje „KONTYNUUJ OD PYTANIA N”.
- **NOWA GRA** zeruje wyniki (np. przed właściwym quizem po próbie).

## Edycja pytań

**Najprościej:** w lobby kliknij **EDYTUJ PYTANIA**. Edytor otwiera się w osobnym oknie (przeciągnij je na ekran laptopa, żeby publiczność nie widziała odpowiedzi).
- **+ Dodaj pytanie**, wpisz treść i odpowiedzi, zaznacz **poprawna**, wybierz czas.
- Pytania można przesuwać ↑ ↓, duplikować i usuwać; do 6 odpowiedzi na pytanie.
- Zmiany zapisują się same i od razu trafiają na ekran quizu, także w trakcie gry (nowe pytania na końcu pojawią się po bieżącym).
- **Zdjęcia (opcjonalne):** 🖼 *Dodaj zdjęcie* pod treścią pytania oraz ikonka 🖼 przy każdej odpowiedzi. Odpowiedź może być samym zdjęciem. Zdjęcia są automatycznie zmniejszane, żeby szybko docierały na telefony. Zamiast wgrywać plik możesz też podać link albo nazwę pliku wgranego do repo (🔗).
- **Tryb tekstowy** pozwala wkleić lub skopiować całą listę naraz.
- Zmiany są zapamiętane **w tej przeglądarce na tym komputerze**. Żeby były na stałe, kliknij **Pobierz config.js** i podmień ten plik na GitHubie.

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

## Wymagania techniczne

- Internet na komputerze ekranu i na telefonach (połączenie przez PeerJS / WebRTC, darmowy serwer PeerJS).
- Przy bardzo restrykcyjnym Wi-Fi gościnnym część telefonów może nie połączyć się peer-to-peer — wtedy niech gracze użyją danych komórkowych. **Zrób próbę na miejscu przed eventem.**
