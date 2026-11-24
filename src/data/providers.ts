import { Provider } from '../types/tariff';

export const PROVIDERS: Provider[] = [
  {
    id: 'prov-telekom',
    slug: 'telekom',
    name: 'Telekom Deutschland',
    shortName: 'Telekom',
    tagline: 'Mehrfacher Netztest-Sieger im D1-Mobilfunk- & Glasfasernetz',
    brandColor: '#E20074',
    brandBgLight: '#FDF2F8',
    networkSummary: 'Telekom D1-Netz (5G+) & größtes deutsches Glasfaser-/VDSL-Netz',
    rating: 4.8,
    reviewCount: 4820,
    connectTestGrade: 'ÜBERRAGEND (975 / 1.000 Pkt.)',
    headquarters: 'Bonn, Nordrhein-Westfalen',
    founded: '1995',
    customerServiceHours: 'Täglich 24 Stunden (kostenlose Hotline & MeinMagenta App)',
    hotline: '0800 33 02202',
    officialDomain: 'telekom.de',
    description:
      'Die Deutsche Telekom bietet die höchste 5G-Abdeckung Deutschlands, herausragende Sprachqualität sowie leistungsstarke MagentaZuhause DSL- und FTTH-Glasfaseranschlüsse.',
    longDescription:
      'Als größtes Telekommunikationsunternehmen Europas setzt die Telekom seit Jahren den Maßstab bei Netzabdeckung, 5G-Geschwindigkeit und Zuverlässigkeit. Sowohl im unabhängigen connect-Mobilfunknetztest als auch im Festnetztest erzielt das Bonner Unternehmen regelmäßig die Bestnote „Überragend“. Besonders attraktiv sind die MagentaEINS-Kombivorteile sowie das inklusive Roaming in der gesamten EU, Großbritannien und der Schweiz.',
    highlights: [
      'Über 97 % 5G-Bevölkerungsabdeckung in Deutschland',
      'EU-Roaming inklusive Schweiz & Großbritannien ohne Aufpreis',
      'MagentaEINS Vorteil: 5 € monatlich sparen + doppeltes Datenvolumen',
      'Ausgezeichneter 24/7 Kundenservice & über 400 Telekom Shops vor Ort',
    ],
    pros: [
      'Beste bundesweite 5G- und LTE-Netzabdeckung auch im ländlichen Raum',
      'Schweiz-Roaming bereits in allen MagentaMobil-Tarifen enthalten',
      'Sehr zuverlässige VDSL- und Glasfaser-Leitungen mit hoher Stabilität',
      'Attraktive Wechselboni und Cashback-Aktionen für Neukunden',
    ],
    cons: [
      'Reguläre Grundgebühr nach der Aktionsphase höher als bei Discountern',
      'Beste Effektivpreise meist nur bei 24 Monaten Laufzeit',
    ],
    categories: ['mobile', 'sim-only', 'broadband', 'unlimited'],
    faqs: [
      {
        question: 'Ist Schweiz-Roaming bei Telekom MagentaMobil wirklich inklusive?',
        answer:
          'Ja, anders als bei vielen Mitbewerbern ist die Datennutzung im Roaming in der Schweiz und in Großbritannien bei allen aktuellen MagentaMobil-Tarifen bereits ohne Zusatzkosten inklusive.',
      },
      {
        question: 'Wie funktioniert der MagentaEINS-Vorteil?',
        answer:
          'Wer gleichzeitig einen MagentaMobil-Handytarif und einen MagentaZuhause-Festnetztarif ab Tarifstufe M nutzt, erhält monatlich 5 € Rabatt auf die Mobilfunkrechnung sowie je nach Tarif doppeltes oder unbegrenztes Datenvolumen.',
      },
      {
        question: 'Wie nehme ich meine bisherige Rufnummer zur Telekom mit?',
        answer:
          'Die Rufnummernmitnahme ist gesetzlich kostenlos und kann direkt im Bestellprozess beauftragt werden. Häufig gewährt die Telekom zusätzlich bis zu 150 € Wechselbonus.',
      },
    ],
  },
  {
    id: 'prov-vodafone',
    slug: 'vodafone',
    name: 'Vodafone Deutschland',
    shortName: 'Vodafone',
    tagline: 'Starkes D2-5G-Netz & Deutschlands größtes Gigabit-Kabelnetz',
    brandColor: '#E60000',
    brandBgLight: '#FEF2F2',
    networkSummary: 'Vodafone D2-Netz (5G) & bundesweites Kabel-Glasfaser- & DSL-Netz',
    rating: 4.6,
    reviewCount: 3940,
    connectTestGrade: 'SEHR GUT (924 / 1.000 Pkt.)',
    headquarters: 'Düsseldorf, Nordrhein-Westfalen',
    founded: '1990 (als Mannesmann Mobilfunk / D2)',
    customerServiceHours: 'Mo–So 07:30 – 22:00 Uhr (24/7 Störungshotline)',
    hotline: '0800 172 1212',
    officialDomain: 'vodafone.de',
    description:
      'Vodafone kombiniert ein leistungsstarkes 5G-Mobilfunknetz (D2) mit dem größten deutschen Gigabit-Kabelnetz für ultraschnelles Internet bis 1.000 Mbit/s.',
    longDescription:
      'Mit Sitz in Düsseldorf versorgt Vodafone Millionen Haushalte und Mobilfunkkunden in ganz Deutschland. Bei den GigaMobil-Tarifen punktet Vodafone durch das beliebte GigaDepot, mit dem ungenutztes Datenvolumen automatisch kostenlos in den nächsten Monat übertragen wird. Im Festnetzbereich ermöglicht das modernisierte Kabel-Glasfasernetz Gigabit-Geschwindigkeiten zu besonders attraktiven Monatspreisen.',
    highlights: [
      'GigaDepot: Ungenutztes Datenvolumen automatisch mitnehmen',
      'Gigabit-Kabelinternet bis zu 1.000 Mbit/s für über 24 Mio. Haushalte',
      'GigaKombi: Bis zu 10 € monatlich sparen bei Mobilfunk + Festnetz',
      'Hohe Wechselboni von bis zu 200 € bei Rufnummernmitnahme',
    ],
    pros: [
      'Hervorragendes Preis-Leistungs-Verhältnis bei Gigabit-Kabeltarifen',
      'Starkes 5G-Netz in Städten, Ballungsräumen und entlang von Autobahnen',
      'Attraktive Smartphone-Bundles mit Flaggschiff-Geräten ab 1 €',
      'Ungenutzte GB verfallen dank GigaDepot nicht sofort am Monatsende',
    ],
    cons: [
      'Kabel-Internet teilt sich in Spitzenzeiten lokal Bandbreite im Segment',
      'Schweiz-Roaming im Standardtarif nicht automatisch inklusive',
    ],
    categories: ['mobile', 'sim-only', 'broadband', 'unlimited'],
    faqs: [
      {
        question: 'Was genau bringt mir das Vodafone GigaDepot?',
        answer:
          'Wenn Sie am Ende eines Abrechnungsmonats noch ungenutztes Highspeed-Datenvolumen übrig haben, wird diese Reserve automatisch und kostenlos in den Folgemonat übertragen.',
      },
      {
        question: 'Ist Kabel-Internet von Vodafone bei mir verfügbar?',
        answer:
          'Über unsere PLZ-Verfügbarkeitsprüfung im Bereich Internet & Festnetz sehen Sie sofort, ob an Ihrer Adresse Kabel-Glasfaser bis 1.000 Mbit/s oder VDSL verfügbar ist.',
      },
    ],
  },
  {
    id: 'prov-o2',
    slug: 'o2',
    name: 'o2 Telefónica',
    shortName: 'o2',
    tagline: 'Preis-Leistungs-Sieger für große Datenpakete & echte Unlimited-Tarife',
    brandColor: '#0019A5',
    brandBgLight: '#EFF6FF',
    networkSummary: 'o2 Telefónica 5G-Netz (3,6 GHz Highspeed) & bundesweiter Festnetz-Mix',
    rating: 4.7,
    reviewCount: 4310,
    connectTestGrade: 'SEHR GUT (908 / 1.000 Pkt.)',
    headquarters: 'München, Bayern',
    founded: '1995 (Viag Interkom / Telefónica Germany)',
    customerServiceHours: 'Mo–Fr 07:00 – 20:00 Uhr, Sa 10:00 – 18:00 Uhr',
    hotline: '089 78 79 79 400',
    officialDomain: 'o2online.de',
    description:
      'o2 begeistert mit innovativen Tarifen wie dem automatischen o2 Grow-Datenvorteil, fairen Unlimited-Flats und technologieoffenen o2 Home Internettarifen.',
    longDescription:
      'Telefónica Deutschland hat das o2-Mobilfunknetz in den vergangenen Jahren massiv modernisiert und erreicht heute über 96 % der Bevölkerung mit 5G. Im connect-Netztest wurde o2 mehrfach mit der Note „Sehr gut“ ausgezeichnet. Alleinstellungsmerkmal ist der „Grow-Vorteil“: Ihr monatliches Datenvolumen wächst jedes Jahr automatisch und ohne Mehrkosten um bis zu 10 GB mit. Im Festnetz bietet o2 Home freie Technologiewahl über DSL, Kabel oder Glasfaser.',
    highlights: [
      'o2 Grow-Vorteil: Jedes Jahr automatisch mehr GB ohne Aufpreis',
      'Branchenführende Unlimited-Tarife inklusive On-Demand-Innovation',
      'o2 Kombi-Vorteil mit bis zu 50 % Rabatt auf Zweittarife',
      'o2 Home nutzt bundesweit DSL-, Kabel- UND Glasfaserleitungen',
    ],
    pros: [
      'Exzellentes Preis-pro-Gigabyte-Verhältnis und echte Unlimited-Optionen',
      'Stark ausgebautes 5G-Netz mit Note „Sehr gut“ im Netztest',
      'Wahlweise mit 24 Monaten Laufzeit oder flexibel monatlich kündbar',
      'Kostenlose Connect-Option bei ausgewählten Boost-Tarifen für bis zu 10 Geräte',
    ],
    cons: [
      'In sehr abgelegenen Berg- und Waldregionen teils etwas hinter D1',
    ],
    categories: ['mobile', 'sim-only', 'broadband', 'unlimited'],
    faqs: [
      {
        question: 'Wie funktioniert o2 Mobile Unlimited On Demand?',
        answer:
          'Sie erhalten jeden Tag automatisch 10 GB Highspeed-Datenvolumen mit bis zu 300 Mbit/s. Verbrauchen Sie an einem Tag mehr, können Sie beliebig oft kostenlos weitere 2 GB-Pakete per SMS freischalten – ideal für Streamer zum halben Preis eines klassischen Unlimited-Tarifs.',
      },
      {
        question: 'Was bedeutet der o2 Grow-Vorteil?',
        answer:
          'Je nach gewähltem o2 Mobile Tarif erhöht sich Ihr monatliches Inklusiv-Datenvolumen nach jedem Vertragsjahr automatisch um 5 GB oder 10 GB dauerhaft – ohne Preiserhöhung.',
      },
    ],
  },
  {
    id: 'prov-1und1',
    slug: '1und1',
    name: '1&1 Telecom',
    shortName: '1&1',
    tagline: 'Modernes Open-RAN 5G-Netz, starke Handy-Bundles & schnelles Glasfaser/DSL',
    brandColor: '#003D8F',
    brandBgLight: '#EFF6FF',
    networkSummary: 'Eigenes 1&1 5G-Netz inkl. bundesweitem Vodafone National Roaming',
    rating: 4.5,
    reviewCount: 3190,
    connectTestGrade: 'GUT – SEHR GUT (Open-RAN 5G + D2-Roaming)',
    headquarters: 'Montabaur, Rheinland-Pfalz',
    founded: '1988',
    customerServiceHours: 'Rund um die Uhr (24/7 telefonischer Kundenservice)',
    hotline: '0721 96 00',
    officialDomain: '1und1.de',
    description:
      'Deutschlands vierter Netzbetreiber kombiniert stark rabattierte Einstiegsmonate bei DSL, Glasfaser und All-Net-Flats mit erstklassigem 24/7-Service und Austausch-Garantie.',
    longDescription:
      '1&1 zählt zu den bekanntesten deutschen Telekommunikationsmarken und betreibt Europas erstes vollständig virtualisiertes Open-RAN 5G-Mobilfunknetz – nahtlos ergänzt durch bundesweites 5G-National-Roaming im Vodafone-Netz. Besonders beliebt sind die 1&1 HomeServer (powered by AVM FRITZ!Box), der kostenlose Übernacht-Austauschservice bei Smartphone-Defekten sowie stark reduzierte Aktionspreise in den ersten 6 bis 10 Vertragsmonaten.',
    highlights: [
      '5G inklusive National Roaming im starken Vodafone D2-Netz',
      'Bis zu 10 Monate stark reduzierter Aktionspreis bei DSL & Glasfaser',
      '1&1 Austausch-Service am nächsten Werktag bei Geräteschaden',
      'Leistungsstarke Wi-Fi 7 HomeServer (FRITZ!Box-Technologie) optional',
    ],
    pros: [
      'Hervorragend kalkulierbare Einstiegspreise in den ersten Vertragsmonaten',
      'Kostenlose 24/7 Service-Hotline mit hoher Erreichbarkeit',
      'Top-Smartphones ohne hohe Einmalzahlung kombinierbar',
      'Sofort-Start-Option für Internetanschlüsse noch vor dem Schalttermin',
    ],
    cons: [
      'Nach Ablauf der Rabattmonate steigt die Grundgebühr auf das reguläre Niveau',
    ],
    categories: ['mobile', 'sim-only', 'broadband', 'unlimited'],
    faqs: [
      {
        question: 'Welches Mobilfunknetz nutzt 1&1 aktuell?',
        answer:
          '1&1 betreibt ein eigenes modernes 5G-Netz in immer mehr deutschen Städten und nutzt überall sonst automatisch das bundesweite 5G- und LTE-Netz von Vodafone per National Roaming.',
      },
    ],
  },
  {
    id: 'prov-congstar',
    slug: 'congstar',
    name: 'congstar',
    shortName: 'congstar',
    tagline: 'Faire Allnet-Flats & monatlich kündbare Flex-Tarife in Telekom-Qualität',
    brandColor: '#111827',
    brandBgLight: '#F3F4F6',
    networkSummary: 'Original Telekom D1-Netz (inkl. 5G-Option)',
    rating: 4.8,
    reviewCount: 2870,
    connectTestGrade: 'SEHR GUT (Mobilfunk-Discounter des Jahres)',
    headquarters: 'Köln, Nordrhein-Westfalen',
    founded: '2007 (100 % Tochter der Deutschen Telekom)',
    customerServiceHours: 'Mo–Sa 08:00 – 22:00 Uhr, So 09:00 – 18:00 Uhr',
    hotline: '0221 79 700 700',
    officialDomain: 'congstar.de',
    description:
      'Als offizielle Tochtermarke der Telekom bietet congstar erstklassige D1-Netzqualität zu fairen Preisen – mit jährlich wachsendem GB+ Datenvolumen und voller Flexibilität.',
    longDescription:
      'Wer die überragende Netzabdeckung der Deutschen Telekom nutzen möchte, aber keinen klassischen Premium-Vertrag benötigt, findet bei congstar die ideale Lösung. Fast alle Tarife sind als monatlich kündbare „Flex“-Variante buchbar. Dank „GB+“ wächst das Datenvolumen jedes Jahr automatisch an, und über die vielfach prämierte congstar App lassen sich Optionen, eSIM-Profile und Tarifwechsel mit wenigen Klicks verwalten.',
    highlights: [
      'Beste Telekom D1-Netzabdeckung zum fairen Mittelklasse-Preis',
      'GB+ inklusive: Jedes Jahr automatisch bis zu 5 GB mehr Datenvolumen',
      'Fast alle Tarife auch monatlich kündbar (Flex-Option)',
      'Mehrfach ausgezeichneter digitaler Kundenservice per App & Chat',
    ],
    pros: [
      'Zuverlässiges Telekom-Netz mit 5G zu deutlich günstigerer Grundgebühr',
      'Keine versteckten Preissprünge nach 6 oder 24 Monaten',
      'Bequeme eSIM-Aktivierung in wenigen Minuten',
    ],
    cons: [
      'Maximale 5G-Geschwindigkeit auf 50 bis 100 Mbit/s begrenzt (für Alltag völlig ausreichend)',
    ],
    categories: ['mobile', 'sim-only'],
    faqs: [
      {
        question: 'Steigt die Grundgebühr bei congstar nach 24 Monaten an?',
        answer:
          'Nein! congstar verzichtet bewusst auf Lockvogel-Preissprünge. Der vereinbarte Monatspreis bleibt dauerhaft stabil – gleichzeitig wächst Ihr Datenvolumen dank GB+ jedes Jahr.',
      },
    ],
  },
  {
    id: 'prov-fraenk',
    slug: 'fraenk',
    name: 'fraenk',
    shortName: 'fraenk',
    tagline: 'Der radikal einfache 10-Euro-App-Tarif im Telekom 5G-Netz',
    brandColor: '#059669',
    brandBgLight: '#ECFDF5',
    networkSummary: 'Telekom D1-Netz (inkl. 5G & Schweiz-Roaming)',
    rating: 4.9,
    reviewCount: 2450,
    connectTestGrade: 'HERVORRAGEND (4,9 / 5 App-Bewertung)',
    headquarters: 'Köln / Bonn (Telekom-Marke)',
    founded: '2020',
    customerServiceHours: 'Mo–So 08:00 – 22:00 Uhr per Live-Chat in der App',
    hotline: 'Digitaler Live-Chat via fraenk App',
    officialDomain: 'fraenk.de',
    description:
      '10 € pro Monat, 15 GB 5G im Telekom-Netz, 0 € Anschlusspreis, monatlich kündbar und inklusive Schweiz-Roaming – komplett digital per App.',
    longDescription:
      'fraenk hat den deutschen Mobilfunkmarkt revolutioniert: Ein transparenter Grundpreis (10 € für 15 GB oder 15 € für 25 GB), keine Bereitstellungskosten, keine Mindestvertragslaufzeit und volle Kostenkontrolle, da kostenpflichtige Sonderrufnummern oder Auslandsfallen standardmäßig deaktiviert sind. Die Abrechnung erfolgt bequem über PayPal, Apple Pay oder SEPA-Lastschrift.',
    highlights: [
      'Dauerhaft 10,00 € / Monat für 15 GB 5G im besten Telekom-Netz',
      '0,00 € Anschlusspreis & monatlich mit 14 Tagen Frist kündbar',
      'Inklusive EU-Roaming UND Schweiz-Datennutzung ohne Zusatzkosten',
      'Sofort startklar dank digitaler eSIM in unter 10 Minuten',
    ],
    pros: [
      'Unschlagbar einfacher Festpreis im Telekom 5G-Netz',
      'Volle Kostenkontrolle – keine unerwarteten Zusatzkosten möglich',
      'Schweiz-Roaming selbst im 10-€-Tarif bereits enthalten',
    ],
    cons: [
      'Ausschließlich per Smartphone-App buchbar und verwaltbar',
      'Keine Smartphone-Hardware-Bundles direkt beim Anbieter',
    ],
    categories: ['sim-only'],
    faqs: [
      {
        question: 'Kann ich bei fraenk unbemerkt in eine Kostenfalle tappen?',
        answer:
          'Nein. Bei fraenk sind kostenpflichtige Drittanbieterdienste, teure Sonderrufnummern und kostenpflichtiges Nicht-EU-Roaming ab Werk gesperrt. Sie zahlen garantiert nur Ihren gebuchten Tarif.',
      },
    ],
  },
  {
    id: 'prov-klarmobil',
    slug: 'klarmobil',
    name: 'klarmobil.de',
    shortName: 'klarmobil',
    tagline: 'Maximale Ersparnis im D-Netz für Preisjäger & Smartphone-Sparfüchse',
    brandColor: '#EA580C',
    brandBgLight: '#FFF7ED',
    networkSummary: 'Vodafone D2-Netz & Telekom D1-Netz (je nach Aktionstarif)',
    rating: 4.4,
    reviewCount: 2680,
    connectTestGrade: 'SEHR GUT (Preis-Leistungs-Tipp)',
    headquarters: 'Büdelsdorf, Schleswig-Holstein (freenet Gruppe)',
    founded: '2005',
    customerServiceHours: 'Mo–Fr 08:00 – 20:00 Uhr, Sa 09:00 – 17:00 Uhr',
    hotline: '040 34 8585 300',
    officialDomain: 'klarmobil.de',
    description:
      'klarmobil liefert regelmäßig die niedrigsten Effektivpreise Deutschlands für große 5G-Allnet-Flats im D-Netz sowie stark subventionierte Smartphone-Bundles.',
    longDescription:
      'Als etablierte Marke der freenet AG richtet sich klarmobil an preisbewusste Nutzer, die viel Datenvolumen im leistungsstarken D-Netz suchen, ohne Premium-Grundgebühren zu zahlen. Durch exklusive Online-Rabatte und Rufnummernmitnahme-Boni liegen die Effektivpreise oft bis zu 50 % unter den Originaltarifen der Netzbetreiber.',
    highlights: [
      'Top-Konditionen im starken Vodafone 5G D-Netz',
      'Herausragende Effektivpreise bei Smartphone-Bundles & SIM-Only',
      '50 € Bonus bei Mitnahme Ihrer bestehenden Rufnummer auf ausgewählte Deals',
      'Auch flexible Unlimited-Tarife zum Sparpreis verfügbar',
    ],
    pros: [
      'Extrem günstiges Verhältnis aus 5G-Datenvolumen und Monatspreis',
      'Regelmäßig rechnerisch negative Effektivpreise bei Handy-Bundles',
      'Bewährte D-Netz-Qualität in ganz Deutschland',
    ],
    cons: [
      'Nach 24 Monaten empfiehlt sich ein Tarifcheck, da Aktionsrabatte auslaufen können',
    ],
    categories: ['mobile', 'sim-only', 'unlimited'],
    faqs: [
      {
        question: 'Warum sollte ich bei klarmobil auf den Effektivpreis über 24 Monate achten?',
        answer:
          'klarmobil gewährt in den ersten 24 Monaten hohe Aktionsrabatte. Unser TarifPilot-Effektivpreis berücksichtigt alle Kosten exakt über die Mindestlaufzeit. Nach 24 Monaten können Sie den Vertrag gemäß TKG jederzeit monatlich kündigen oder wechseln.',
      },
    ],
  },
  {
    id: 'prov-deutsche-glasfaser',
    slug: 'deutsche-glasfaser',
    name: 'Deutsche Glasfaser',
    shortName: 'Deutsche Glasfaser',
    tagline: 'Echte FTTH-Glasfaser bis direkt in Ihre Wohnung – zukunftssicher & ultraschnell',
    brandColor: '#0284C7',
    brandBgLight: '#F0F9FF',
    networkSummary: '100 % echte FTTH-Glasfaser (Fiber to the Home) bis 1.000 Mbit/s',
    rating: 4.5,
    reviewCount: 1890,
    connectTestGrade: 'SEHR GUT (FTTH-Spezialist)',
    headquarters: 'Borken, Nordrhein-Westfalen',
    founded: '2011',
    customerServiceHours: 'Mo–Fr 08:00 – 20:00 Uhr, Sa 08:00 – 18:00 Uhr',
    hotline: '02861 890 600',
    officialDomain: 'deutsche-glasfaser.de',
    description:
      'Als Pionier für den ländlichen und suburbanen Glasfaserausbau bringt Deutsche Glasfaser reine Lichtwellenleiter ohne Kupferbremse direkt in Ihr Zuhause.',
    longDescription:
      'Während klassische VDSL- oder Kabelanschlüsse auf den letzten Metern noch Kupferleitungen nutzen, verlegt Deutsche Glasfaser reine FTTH-Leitungen (Fiber to the Home) bis in die Wohnung. Das garantiert extrem niedrige Ping-Zeiten für Gaming und Videokonferenzen, hohe Upload-Raten von bis zu 500 Mbit/s und konstante Bandbreite zu jeder Tageszeit.',
    highlights: [
      '100 % Glasfaser bis in die Wohnung (FTTH) ohne Leistungsverlust',
      'Extrem schneller Upload (bis zu 500 Mbit/s) für Homeoffice & Cloud',
      'Hausanschluss im Wert von ab 750 € während der Ausbauphase oft für 0 €',
      'Wechselgarantie: Kostenfrei wechseln nach Ende Ihres Altvertrags (bis zu 12 Monate keine Doppelbelastung)',
    ],
    pros: [
      'Zukunftssicherste Internettechnologie mit minimaler Latenz (< 8 ms)',
      'Garantierte Bandbreite unabhängig von der Auslastung der Nachbarschaft',
      'Attraktive Einstiegspreise im ersten Vertragsjahr',
    ],
    cons: [
      'Verfügbarkeit abhängig vom regionalen Glasfaser-Ausbaugebiet',
    ],
    categories: ['broadband'],
    faqs: [
      {
        question: 'Zahle ich doppelt, wenn mein alter DSL-Vertrag noch läuft?',
        answer:
          'Nein. Bei einem Wechsel zu Deutsche Glasfaser profitieren Sie bis zu 12 Monate lang vom Wechselservice: Sie zahlen für Ihren neuen Glasfaseranschluss erst, wenn Ihr bisheriger Festnetzvertrag endet.',
      },
    ],
  },
];

export function getProviderBySlug(slug: string): Provider | undefined {
  return PROVIDERS.find((p) => p.slug === slug);
}
