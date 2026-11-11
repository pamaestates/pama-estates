"use client"

import { FormEvent, useState } from "react"
import { usePathname } from "next/navigation"
import { POLISH_WHATSAPP_NUMBER } from "@/lib/pl-whatsapp"

type FormKind = "buyer" | "owner"
type Field = { id: string; label: string; options?: readonly string[]; required?: boolean; placeholder?: string }
const ownerFields: Field[] = [
  { id: "role", label: "Twoja rola", options: ["Właściciel", "Przedstawiciel właściciela"] },
  { id: "intent", label: "Cel", options: ["Sprzedaż", "Wynajem", "Rozważam możliwości"], required: true },
  { id: "propertyType", label: "Rodzaj nieruchomości", options: ["Apartament", "Willa", "Penthouse", "Dom szeregowy", "Działka", "Całe piętro", "Budynek", "Inne"], required: true },
  { id: "community", label: "Lokalizacja / osiedle", required: true, placeholder: "Palm Jumeirah, The Springs..." },
  { id: "project", label: "Budynek lub projekt", placeholder: "Opcjonalnie" },
  { id: "unit", label: "Numer lokalu lub willi", placeholder: "Opcjonalnie — nie podawaj danych poufnych" },
  { id: "bedrooms", label: "Liczba sypialni", options: ["Studio", "1", "2", "3", "4", "5", "6+", "Nie dotyczy"] },
  { id: "occupancy", label: "Status nieruchomości", options: ["Pusta", "Zamieszkana przez właściciela", "Wynajęta", "W budowie"] },
  { id: "condition", label: "Stan nieruchomości", options: ["Oryginalny", "Dobry", "Po modernizacji", "Po remoncie", "Nowa", "W budowie"] },
  { id: "price", label: "Oczekiwana cena (AED)", placeholder: "Opcjonalnie" },
  { id: "rent", label: "Obecny czynsz roczny (AED)", placeholder: "Opcjonalnie" },
  { id: "timeline", label: "Planowany termin", options: ["Jak najszybciej", "1–3 miesiące", "3–6 miesięcy", "Później", "Rozpoznaję rynek"] },
  { id: "preferredContact", label: "Preferowany kontakt", options: ["WhatsApp", "E-mail", "Telefon"] },
  { id: "marketing", label: "Preferowany sposób prezentacji", options: ["Publiczne ogłoszenie", "Dyskretna oferta", "Chcę omówić możliwości"] },
]
const buyerFields: Field[] = [
  { id: "profile", label: "Profil klienta", options: ["Kupujący — inwestor", "Kupujący — na własne potrzeby", "Pośrednik / partner"] },
  { id: "community", label: "Preferowana lokalizacja", placeholder: "Palm Jumeirah, Dubai Marina..." },
  { id: "budget", label: "Budżet (AED)", placeholder: "np. 3–5 mln AED" },
  { id: "requirements", label: "Wymagania", placeholder: "Rodzaj nieruchomości, metraż, termin..." },
  { id: "preferredContact", label: "Preferowany kontakt", options: ["WhatsApp", "E-mail", "Telefon"] },
]
const inputClass = "mt-2 w-full rounded-md border border-white/15 bg-[#0D1119] p-3 text-white placeholder:text-[#8992A0] focus:border-[#D4AF37] focus:outline-none"

export default function PolishInquiryForm({ kind }: { kind: FormKind }) {
  const pathname = usePathname()
  const [values, setValues] = useState<Record<string, string>>({})
  const [error, setError] = useState("")
  const fields = kind === "owner" ? ownerFields : buyerFields
  const update = (id: string, value: string) => setValues(old => ({ ...old, [id]: value }))

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!values.fullName?.trim() || (!values.email?.trim() && !values.whatsapp?.trim())) {
      setError("Podaj imię i nazwisko oraz co najmniej jeden sposób kontaktu.")
      return
    }
    if (kind === "owner" && (!values.intent || !values.propertyType || !values.community?.trim())) {
      setError("Podaj cel, rodzaj nieruchomości i lokalizację.")
      return
    }
    setError("")
    const source = pathname === "/pl" || pathname.startsWith("/pl/")
      ? pathname : "/pl"
    const message = [
      "Dzień dobry, przesyłam zapytanie z polskiej strony PAMA Estates.",
      `Źródło: https://www.pamaestates.com${source}`,
      `Rodzaj zapytania: ${kind === "owner" ? "Ocena nieruchomości — właściciel" : "Poszukiwanie nieruchomości — kupujący"}`,
      ...fields.map(field => `${field.label}: ${values[field.id] || "—"}`),
      `Imię i nazwisko: ${values.fullName}`,
      `WhatsApp: ${values.whatsapp || "—"}`,
      `E-mail: ${values.email || "—"}`,
      `Dodatkowe informacje: ${values.notes || "—"}`,
    ].join("\n")
    // Preview safety: no API request or operational lead write. User explicitly opens WhatsApp.
    window.location.assign(`https://wa.me/${POLISH_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`)
  }

  return <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">{kind === "owner" ? "Dla właścicieli" : "Prywatne doradztwo"}</p>
      <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">{kind === "owner" ? "Opowiedz nam o swojej nieruchomości" : "Powiedz nam, czego szukasz"}</h2>
      <p className="mt-5 leading-8 text-[#C9CDD4]">{kind === "owner"
        ? "Prześlij podstawowe informacje o nieruchomości. Porozmawiamy o jej pozycji na rynku i możliwej strategii sprzedaży lub wynajmu."
        : "Opisz swoje oczekiwania, preferowaną lokalizację i budżet. Zaczniemy od ofert pasujących do Twoich celów."}</p>
      <p className="mt-6 text-sm leading-7 text-[#929BA9]">Nie przesyłaj na tym etapie paszportów, aktów własności ani innych poufnych dokumentów. Wypełnienie formularza nie jest automatyczną wyceną ani gwarancją oferty.</p>
    </div>
    <form onSubmit={submit} className="rounded-lg border border-white/10 bg-white/5 p-6 md:p-9">
      <p className="text-xs uppercase tracking-[0.24em] text-[#D4AF37]">{kind === "owner" ? "Zapytanie właściciela" : "Zapytanie kupującego"}</p>
      <h3 className="mt-3 font-serif text-2xl">{kind === "owner" ? "Informacje o nieruchomości" : "Twoje kryteria poszukiwania"}</h3>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {fields.map(field => <label key={field.id} className="text-sm text-[#D7DBE2]">{field.label}{field.required ? " *" : ""}
          {field.options
            ? <select required={field.required} value={values[field.id] || ""} onChange={e => update(field.id, e.target.value)} className={inputClass}>
                <option value="">Wybierz</option>{field.options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            : <input required={field.required} value={values[field.id] || ""} onChange={e => update(field.id, e.target.value)} placeholder={field.placeholder} className={inputClass} />}
        </label>)}
        <label className="text-sm text-[#D7DBE2]">Imię i nazwisko *<input autoComplete="name" required value={values.fullName || ""} onChange={e => update("fullName",e.target.value)} className={inputClass}/></label>
        <label className="text-sm text-[#D7DBE2]">Numer WhatsApp<input type="tel" autoComplete="tel" value={values.whatsapp || ""} onChange={e => update("whatsapp",e.target.value)} placeholder="+48 / +971..." className={inputClass}/></label>
        <label className="text-sm text-[#D7DBE2]">Adres e-mail<input type="email" autoComplete="email" value={values.email || ""} onChange={e => update("email",e.target.value)} className={inputClass}/></label>
      </div>
      <p className="mt-3 text-xs text-[#929BA9]">Wystarczy jeden sposób kontaktu: WhatsApp albo e-mail.</p>
      <label className="mt-5 block text-sm text-[#D7DBE2]">Dodatkowe informacje<textarea rows={4} value={values.notes || ""} onChange={e => update("notes",e.target.value)} className={inputClass}/></label>
      {error && <p role="alert" className="mt-5 text-sm text-[#F7B9AC]">{error}</p>}
      <button type="submit" className="mt-6 w-full rounded bg-[#D4AF37] px-6 py-4 font-semibold text-[#0B0E15]">Prześlij zapytanie przez WhatsApp</button>
      <p className="mt-3 text-xs leading-6 text-[#929BA9]">W podglądzie wiadomość zostanie przygotowana w WhatsApp. Formularz nie zapisuje danych w systemie PAMA Core. Wysłanie wiadomości wymaga potwierdzenia w WhatsApp.</p>
    </form>
  </div>
}
