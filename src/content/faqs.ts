import { site } from "@/config/site";

export type Faq = {
  id: string;
  q: string;
  /** Confirmed answer text. */
  a: string;
  /**
   * Information the pharmacy has not confirmed yet. Shown as a visible placeholder.
   * FAQs with `pending` are left out of FAQPage structured data until the answer is complete.
   */
  pending?: string;
};

export const faqs: Faq[] = [
  {
    id: "upload-photo",
    q: "Can I upload a prescription photo?",
    a: "Yes. Use the New Prescription form to upload a clear photo or PDF. We accept JPG, PNG, HEIC and PDF files up to 10 MB.",
  },
  {
    id: "original-prescription",
    q: "Do I need to bring the original prescription?",
    a: "Please bring the original prescription when you come for pickup if the pharmacy requires it. An uploaded photo helps our team prepare, but it may not replace the original.",
    pending: "Which prescriptions require the original at pickup",
  },
  {
    id: "refill",
    q: "How do I request a refill?",
    a: `Use the Refill Request form, or call us at ${site.phone.display}. Include the medication name and your prescription number if you have it.`,
  },
  {
    id: "renewal",
    q: "Can the pharmacy review a renewal request?",
    a: "Yes. Refill requests are reviewed by the pharmacy team. A renewal may require pharmacist assessment or contact with the prescriber.",
  },
  {
    id: "transfer",
    q: "How do I transfer my prescriptions?",
    a: "Fill in the Transfer Prescription form with your current pharmacy's details. Our team will contact the previous pharmacy and let you know if more information is required.",
  },
  {
    id: "delivery",
    q: "Is medication delivery available in my area?",
    a: `Prescription pickup and home delivery are free. Call us at ${site.phone.display} to check whether we deliver to your address.`,
    pending: "Delivery area and delivery days",
  },
  {
    id: "blister-packaging",
    q: "How does blister packaging work?",
    a: "Your medications are sorted into sealed packs by day and time, so it is easier to see which doses to take. Blister packaging is free.",
    pending: "How to sign up, and how often packs are prepared",
  },
  {
    id: "appointments",
    q: "What services require an appointment?",
    a: `Please call us at ${site.phone.display} to ask before you visit.`,
    pending: "List of services that need an appointment, and how to book",
  },
  {
    id: "contact",
    q: "How will the pharmacy contact me?",
    a: "We use the contact method you choose on the form, by phone or by email. A pharmacist may contact you if more details are needed.",
  },
  {
    id: "urgent",
    q: "What should I do if my request is urgent?",
    a: `For a life-threatening emergency, call 911. For an urgent prescription question, call the pharmacy at ${site.phone.display} rather than using an online form. For non-emergency health advice, you can also call HealthLink BC at 8-1-1.`,
  },
];
