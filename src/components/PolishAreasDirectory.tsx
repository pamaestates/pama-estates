import Link from "next/link"

/** Polish counterpart of the six public community cards on /areas. */
const areas = [
  { title: "Palm Jumeirah", href: "/pl/areas/palm-jumeirah", label: "Prestiż nad morzem", description: "Wille przy plaży, rezydencje premium i apartamenty. Porównaj położenie, prywatność i realną wartość." },
  { title: "Palm Jebel Ali", href: "/pl/areas/palm-jebel-ali", label: "Nowe wybrzeże", description: "Rozwijający się projekt nadmorski, który wymaga analizy harmonogramu, kosztów i długoterminowego ryzyka." },
  { title: "Emirates Living", href: "/pl/areas/emirates-living", label: "Dojrzałe osiedla willowe", description: "Emirates Hills, Meadows, The Lakes i The Springs — osiedla rodzinne o różnych standardach i charakterze." },
  { title: "Dubai Marina", href: "/pl/areas/dubai-marina", label: "Nadmorski styl życia", description: "Apartamenty w wysokich budynkach, marina i aktywny rynek. Wybór budynku ma znaczenie." },
  { title: "Jumeirah Islands", href: "/pl/areas/jumeirah-islands", label: "Prywatność i przestrzeń", description: "Wille, większe działki, zieleń i spokojna okolica. Sprawdź lokalizację domu oraz standard modernizacji." },
  { title: "Jumeirah Park", href: "/pl/areas/jumeirah-park", label: "Wille rodzinne", description: "Praktyczne domy i możliwości modernizacji. Porównaj układy, działki, stan techniczny i ceny." },
] as const

export default function PolishAreasDirectory() {
  return <section aria-labelledby="pl-areas-title" className="mt-14 border-t border-white/10 pt-10">
    <h2 id="pl-areas-title" className="font-serif text-3xl md:text-4xl">Poznaj sześć lokalizacji</h2>
    <p className="mt-4 max-w-3xl leading-7 text-[#C9CDD4]">Wybierz dzielnicę, aby poznać jej charakter i kryteria, na które warto zwrócić uwagę przed zakupem.</p>
    <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {areas.map((area) => <Link key={area.href} href={area.href} className="group rounded border border-white/10 bg-white/[0.04] p-6 transition hover:border-[#D4AF37]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]">
        <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">{area.label}</p>
        <h3 className="mt-4 font-serif text-2xl">{area.title}</h3>
        <p className="mt-4 text-sm leading-7 text-[#C9CDD4]">{area.description}</p>
        <span className="mt-6 inline-block text-sm text-[#D4AF37] group-hover:text-white">Poznaj lokalizację →</span>
      </Link>)}
    </div>
    <div className="mt-10 flex flex-wrap gap-4">
      <Link href="/pl#zapytanie" className="rounded bg-[#D4AF37] px-6 py-3 font-semibold text-[#0B0E15]">Pomóż mi wybrać lokalizację</Link>
      <Link href="/pl/luxury-property-dubai" className="rounded border border-white/20 px-6 py-3">Zobacz nieruchomości premium</Link>
    </div>
  </section>
}
