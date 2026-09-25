import { Info } from "lucide-react";

const steps = [
  { title: "Send the request", text: "Use one of the online forms, or call the pharmacy." },
  { title: "Our pharmacy team reviews the information", text: "We check the details and contact you if anything else is needed." },
  { title: "Receive confirmation", text: "We let you know when it's ready for pickup, or for delivery where available." },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="py-16 md:py-20">
      <div className="container-page">
        <h2 id="how-heading" className="text-3xl md:text-4xl">
          How requests work
        </h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex gap-4 md:flex-col">
              <span
                aria-hidden
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-navy text-xl font-bold text-white"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-xl">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-1 text-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-10 flex max-w-3xl items-start gap-3 rounded-card border-l-4 border-green bg-green-50 p-5">
          <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-green-strong" />
          Online requests help our team prepare the information. A pharmacist may contact you if more details are needed.
        </p>
      </div>
    </section>
  );
}
