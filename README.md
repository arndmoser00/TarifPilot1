# TarifPilot – Telekommunikations-Vergleichsplattform für Deutschland

**TarifPilot** ist eine moderne, schnelle und vollständig responsive Vergleichsplattform für Mobilfunktarife mit Smartphone, SIM-Only-Allnet-Flats, Festnetz-Internet (DSL, Kabel & FTTH-Glasfaser) sowie Unlimited-5G-Datentarife in Deutschland.

---

## Funktionsumfang

- **Startseite mit interaktivem Tarif-Schnellfinder:** Echtzeit-Vorschau passender Tarife nach Kategorie, Budget, Netz und Flex-Option.
- **4 dedizierte Vergleichsbereiche:**
  - **Mobilfunktarife mit Smartphone** (`#/mobilfunk`) inkl. Hardware-Gegenrechnung
  - **SIM-Only Deals** (`#/sim-only`) ab 10,00 € / Monat (monatlich kündbar & 24 Monate)
  - **Internet, DSL, Kabel & Glasfaser** (`#/internet`) inkl. interaktivem **PLZ-Verfügbarkeits-Vorcheck**
  - **Unlimited 5G-Datentarife** (`#/unlimited`) ohne Datenlimit
- **Umfangreiche Suche & Echtzeit-Filter (`#/vergleich`):** Stichwortsuche, Maximalpreis-Regler, Netz-/Technologieauswahl, Anbieter-Filter, Vertragslaufzeit, Mindest-GB/Mbit/s, eSIM- & Wechselbonus-Filter sowie Sortierung nach Effektivpreis, Grundgebühr, Geschwindigkeit oder TarifPilot-Score.
- **Direktvergleich (bis zu 3 Tarife nebeneinander) & Merkliste:** Persistente Auswahl im Browser mit Bestwert-Hervorhebung.
- **8 Anbieter-Profile (`#/anbieter/:slug`):** Telekom, Vodafone, o2 Telefónica, 1&1, congstar, fraenk, klarmobil und Deutsche Glasfaser inkl. connect-Netztest-Einordnung, Stärken/Schwächen & FAQ.
- **24 Einzel-Angebotsseiten (`#/tarif/:slug`):** Mit vollständiger 24-Monats-Effektivpreis-Aufschlüsselung, technischen Tarifdetails und interaktiver Abschluss-Checkliste.
- **Vollständige Unternehmens- & Rechtsseiten (DE-Standard):** Über uns & Impressum (`#/ueber-uns`), Kontaktformular (`#/kontakt`), Datenschutzerklärung (`#/datenschutz`), AGB (`#/agb`) und Affiliate-Transparenz (`#/affiliate-hinweis`).
- **SEO-Optimierung:** Dynamische Seitentitel, Meta-Descriptions, strukturierte Überschriften-Hierarchie (`h1`–`h3`) und Schema.org JSON-LD.

---

## Technologie-Stack

- **React 18** + **TypeScript** (strict mode)
- **Vite 6** (optimierter Production-Build mit relativen Asset-Pfaden für GitHub Pages)
- **Tailwind CSS 3.4** + **Lucide Icons** + **eigene Vektor-Anbieterlogos (SVG)**
- **React Router v6 (`HashRouter`)** – 100 % kompatibel mit GitHub Pages ohne 404-Fehler bei Seiten-Reloads, unabhängig vom Repository-Namen.

---

## Lokale Entwicklung & Production-Build

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# TypeScript-Prüfung & Production-Build erstellen (Ausgabe in ./dist)
npm run build

# Lokale Vorschau des Production-Builds
npm run preview
```

---

## Automatisches Deployment auf GitHub Pages

Das Repository enthält bereits eine vollständig konfigurierte GitHub-Actions-Pipeline unter `.github/workflows/deploy.yml`:

1. Pushen Sie den Projektstand auf den Branch `main` Ihres GitHub-Repositorys:
   ```bash
   git remote add origin https://github.com/<IHR-BENUTZERNAME>/<IHR-REPO-NAME>.git
   git push -u origin main
   ```
2. Öffnen Sie in GitHub **Settings → Pages**.
3. Wählen Sie unter **Build and deployment → Source** die Option **GitHub Actions** aus.
4. Bei jedem Push auf `main` baut GitHub Actions automatisch das Projekt mittels `npm ci && npm run build` und veröffentlicht die Website live auf GitHub Pages.
