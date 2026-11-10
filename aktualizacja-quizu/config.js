/* =====================================================================
   KONFIGURACJA QUIZU — wszystko, co zmieniasz pod konkretny event,
   jest w tym jednym pliku. Pozostałych plików nie trzeba ruszać.
   ===================================================================== */
window.QUIZ_CONFIG = {

  /* ---------- BRANDING ---------- */
  eventName: 'Forum Odpowiedzialnej Zmiany',
  tagline:   'Quiz · Poznań, 17 listopada 2026',
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
  // Format: pytanie w pierwszej linii, odpowiedzi pod spodem,
  // poprawną oznacz gwiazdką *. Pusta linia = kolejne pytanie.
  // Opcjonalnie na końcu linii pytania: [30s] = własny limit czasu.
  // Opcjonalne zdjęcia: druga linia „[zdjęcie] plik.jpg” (zdjęcie pytania),
  // przy odpowiedzi „Tekst [img] plik.jpg” albo samo „[img] plik.jpg”.
  // Plik wgraj do repo obok index.html albo podaj pełny link https://…
  // UWAGA: jeśli pytania były edytowane na ekranie (przycisk PYTANIA),
  // przeglądarka pamięta tamtą wersję — „PRZYWRÓĆ Z CONFIG” wraca do tej.
  questions: `Jaka słynna wiralowa akcja z 2014 roku wspierała walkę z chorobą ALS?
Movember
*Ice Bucket Challenge
Trashtag Challenge
Blue Whale Challenge

Co dokładnie oznacza skrót ESG?
*Environmental, Social, Governance
Ecological, Social, Growth
Environmental, Economic, Sustainability
Eco, Society, Global

Która z poniższych firm w zestawieniu tygodnika „Polityka” została uhonorowana prestiżowym wyróżnieniem „Złoty Listek ESG POLITYK 2025”? [30s]
*Energa SA, ING Bank Śląski, Lidl Polska, Santander Bank Polska, Solaris Bus & Coach.
Energa SA, PKO Bank Polski, Jeronimo Martins, mBank, Solaris Bus & Coach.
InPost, ING Bank Śląski, Lidl Polska, Santander Bank, PGE S.A.
Grupa Orlen, mBank, Lidl Polska, Santander Bank Polska, Allegro

Co w kontekście HR i kultury organizacyjnej oznacza skrót DEI?
*Diversity, Equity, Inclusion (Różnorodność, Równość, Włączenie)
Development, Ethics, Innovation
Direct Employee Involvement
Digital Education Initiative

Jaki procent podatku dochodowego od osób fizycznych (PIT) można obecnie w Polsce przekazać na rzecz wybranej Organizacji Pożytku Publicznego (OPP)?
1%
*1,5%
2%
5%

Ile pieniędzy zebrała historyczna zbiórka charytatywna polskiego influencera Łatwoganga i twórców (m.in. Bedoesa) na rzecz Fundacji Cancer Fighters?
Ok. 220 milionów zł
Ok. 25 milionów zł
*Ok. 290 milionów zł
Ok. 390 milionów zł

Ile w przybliżeniu litrów wody zużywa się do wyprodukowania jednej klasycznej bawełnianej koszulki (T-shirta)?
Ok. 250 litrów
Ok. 700 litrów
*Ok. 2 700 litrów
Ok. 10 000 litrów

Jak nazywa się zjawisko niewidzialnych barier organizacyjnych i społecznych, które uniemożliwiają kobietom awans na najwyższe stanowiska kierownicze?
Szklana podłoga
*Szklany sufit
Lepka podłoga
Aksamitny tor

Jak nazywa się jedna z największych w Polsce akcji społecznych, organizowana w okresie przedświątecznym, łącząca potrzebujące rodziny z darczyńcami?
Wielka Orkiestra Świątecznej Pomocy
*Szlachetna Paczka
Pajacyk
Serce dla Dzieci

Jak nazywa się fundacja założona przez aktorkę Magdalenę Różczkę, działająca na rzecz pomocy dzieciom oraz promowania rodzicielstwa zastępczego i adopcji? [30s]
Fundacja "Urodzeni Zwycięzcy"
Fundacja "Kochaj Mnie Po Prostu"
Fundacja "Urodziliśmy się dla miłości"
*Fundacja "Ukochani”

Ile Celów Zrównoważonego Rozwoju (SDG) wyznaczyła Organizacja Narodów Zjednoczonych (ONZ) w Agendzie 2030?
10
12
*17
21

W którym roku uchwalono w Polsce Ustawę o działalności pożytku publicznego i o wolontariacie, wprowadzającą m.in. mechanizm odpisu podatku na OPP?
1989 r.
*2003 r.
2012 r.
2020 r.

Co oznacza pojęcie "Skill-based volunteering" (wolontariat kompetencyjny)? [30s]
Malowanie płotu w domu dziecka przez cały zespół sprzedaży
*Dzielenie się przez pracowników swoją specjalistyczną wiedzą zawodową (np. marketingową, prawną, IT) z organizacją NGO
Sprzątanie lasu w godzinach pracy
Zbiórka pieniężna na cele charytatywne

W którym roku wystartował ogólnopolski projekt edukacyjno-profilaktyczny „MŁODE GŁOWY. Otwarcie o zdrowiu psychicznym”, inicjowany przez Fundację UNAWEZA?
2018 r.
2020 r.
*2022 r.
2024 r.

Co oznacza krytykowane zjawisko "Fast Fashion" (Szybka Moda)? [30s]
Produkcja odzieży sportowej dla biegaczy
*Masowa, błyskawiczna produkcja tanich ubrań z niskiej jakości materiałów, generująca ogromne ilości odpadów
Szybkie doręczanie ubrań kurierem
Szycie ubrań z materiałów z recyklingu

Co symbolizuje noszenie Czerwonej Wstążki?
Wsparcie dla praw zwierząt
Świadomość i profilaktykę raka piersi
Międzynarodowy Dzień Praw Dziecka
*Solidarność z osobami żyjącymi z HIV/AIDS

Jak nazywa się zjawisko, w którym firma celowo ukrywa lub nie chwali się swoimi realnymi działaniami proekologicznymi z obawy przed krytyką?
Greenwashing
*Greenhushing
Greenbleaching
Eco-ghosting

Jaki szacunkowy procent populacji w Polsce stanowią osoby znajdujące się w kryzysie bezdomności (według badań MRPiPS)?
*Ok. 0,08% (poniżej 0,1%)
Ok. 0,9%
Ok. 1,7%
Ponad 10%

Jaki procent Polaków deklaruje w badaniach społecznych (np. Stowarzyszenia Klon/Jawor), że chociaż raz w życiu brało udział w działaniach wolontariackich?
Ok. 5%
*Ok. 30–35% (ok. jednej trzeciej)
Ok. 65%
Ponad 85%

Co oznacza pojęcie "Payroll Giving"? [30s]
Premia uznaniowa wypłacana w formie kart podarunkowych
*Program, w którym pracownicy deklarują automatyczne przekazywanie zadeklarowanej kwoty/końcówki z pensji na cele charytatywne
Płatny urlop na podnoszenie kwalifikacji
System automatycznego rozliczania nadgodzin

Które pojęcie określa nadużywanie haseł społecznych lub tęczowych (LGBTQ+) w marketingu bez wprowadzania realnych zmian w firmie?
*Pinkwashing / Rainbowwashing
Social washing
False Rainbow
Diversity Power

Czym jest "Reverse Mentoring" (Mentoring odwrócony)? [30s]
Sytuacja, w której mentor płaci mentee za naukę
*Relacja, w której młodszy stażem lub wiekiem pracownik dzieli się wiedzą (np. o technologiach) ze starszym menedżerem
Proces zwolnienia pracownika po szkoleniu
Samodzielna nauka bez udziału mentora

W którym miesiącu roku odbywa się znana globalna akcja "Movember" (Wąsopad)?
W marcu
W czerwcu
W październiku
*W listopadzie

W obliczaniu śladu węglowego firmy (GHG Protocol), co obejmuje tzw. Scope 3 (Zakres 3)? [30s]
Bezpośrednie emisje z zakładowych pieców i pojazdów firmy
Emisje pośrednie z zakupionej energii elektrycznej i ciepła
*Emisje w całym łańcuchu wartości (dostawcy, podróże służbowe, użytkowanie produktów)
Emisje generowane wyłącznie przez serwery IT

Ile łącznie pieniędzy (od pierwszego Finału w 1993 roku) zebrała Wielka Orkiestra Świątecznej Pomocy (WOŚP)?
Ok. 100 milionów zł
Ok. 500 milionów zł
*Ponad 2 miliardy zł
50 miliardów zł

Która ikoniczna kampania marki kosmetycznej zakwestionowała nierealistyczne wzorce urody w mediach, promując "Prawdziwe Piękno"?
Nivea
*Dove
L’Oréal`
};
