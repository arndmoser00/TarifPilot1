import React, { useState } from 'react';
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Link } from 'react-router-dom';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Tarifberatung Mobilfunk & SIM-Only');
  const [message, setMessage] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Bitte füllen Sie alle Pflichtfelder vollständig aus.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }
    if (!privacyAccepted) {
      setError('Bitte bestätigen Sie die Kenntnisnahme unserer Datenschutzerklärung.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="pb-20">
      <SEOHead
        title="Kontakt & Kostenlose Tarifhilfe | TarifPilot"
        description="Haben Sie Fragen zu einem Mobilfunk-, SIM-Only- oder Glasfaser-Angebot? Kontaktieren Sie das unabhängige Berliner Serviceteam von TarifPilot."
      />

      {/* Header */}
      <section className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-300">
            Kundenservice &amp; Redaktion
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
            Kontaktieren Sie das TarifPilot-Team
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Sie haben eine Frage zur Effektivpreis-Berechnung, zur Rufnummernmitnahme oder möchten einen Preisfehler melden? Wir antworten werktags in der Regel innerhalb von 4 Stunden.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
              <h2 className="text-lg font-extrabold text-slate-900">Direkter Draht zu uns</h2>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-slate-400">Telefonische Tarif-Info</div>
                  <div className="text-base font-extrabold text-slate-900 mt-0.5">030 555 789 10</div>
                  <div className="text-xs text-slate-500">Zum normalen Festnetztarif</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-slate-400">E-Mail &amp; Presse</div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                    service@tarifpilot-vergleich.de
                  </div>
                  <div className="text-xs text-slate-500">Antwortzeit Ø unter 4 Std. (Mo–Fr)</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-slate-400">Servicezeiten</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    Montag – Freitag: 09:00 – 18:00 Uhr
                  </div>
                  <div className="text-xs text-slate-500">Ausgenommen gesetzliche Feiertage in Berlin</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-slate-400">Redaktionsanschrift</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    TarifPilot Digital GmbH
                  </div>
                  <div className="text-xs text-slate-600">Friedrichstraße 114a, 10117 Berlin</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-blue-50 border border-blue-200/80 p-6 text-xs sm:text-sm text-slate-700 space-y-2">
              <div className="font-extrabold text-slate-900">
                Wichtiger Hinweis zu bestehenden Verträgen:
              </div>
              <p className="leading-relaxed">
                Für Rechnungsfragen, SIM-Kartensperrungen oder Störungsmeldungen wenden Sie sich bitte direkt an den Kundenservice Ihres jeweiligen Netzanbieters. Alle Hotlines finden Sie gesammelt auf unserer{' '}
                <Link to="/anbieter" className="font-bold text-blue-700 underline">
                  Anbieter-Übersichtsseite
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              {submitted ? (
                <div className="py-10 text-center space-y-4 animate-fade-in">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Vielen Dank für Ihre Nachricht, {name}!
                  </h2>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Wir haben Ihre Anfrage zum Thema <strong>„{topic}“</strong> erhalten und senden eine Bestätigung an <strong>{email}</strong>. Unser Beratungsteam meldet sich zeitnah bei Ihnen.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                      setPrivacyAccepted(false);
                    }}
                    className="inline-flex items-center rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-600"
                  >
                    Weitere Nachricht senden
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Schreiben Sie uns direkt
                  </h2>

                  {error && (
                    <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-bold text-rose-700">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 mb-1.5">
                        Ihr vollständiger Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Max Mustermann"
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 mb-1.5">
                        E-Mail-Adresse *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="max.mustermann@beispiel.de"
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-topic" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Worum geht es?
                    </label>
                    <select
                      id="contact-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none"
                    >
                      <option>Tarifberatung Mobilfunk &amp; SIM-Only</option>
                      <option>Frage zu DSL, Kabel oder Glasfaser-Ausbau</option>
                      <option>Frage zu Cashback oder Wechselbonus</option>
                      <option>Hinweis auf geänderten Tarifpreis / Feedback</option>
                      <option>Presse- &amp; Kooperationsanfrage</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-msg" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Ihre Nachricht *
                    </label>
                    <textarea
                      id="contact-msg"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Beschreiben Sie kurz Ihr Anliegen oder Ihren Wunsch-Tarif..."
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    />
                  </div>

                  <label className="flex cursor-pointer items-start gap-2.5 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                    />
                    <span>
                      Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage gemäß der{' '}
                      <Link to="/datenschutz" className="font-bold text-blue-700 underline">
                        Datenschutzerklärung
                      </Link>{' '}
                      verarbeitet werden. *
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-sm hover:bg-blue-700 transition-colors"
                  >
                    <Send className="h-4 w-4" />
                    <span>Nachricht absenden</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
