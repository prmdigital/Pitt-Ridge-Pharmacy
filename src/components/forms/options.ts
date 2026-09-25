export const fulfilmentOptions = [
  { value: "pickup" as const, label: "Pickup at the pharmacy" },
  { value: "delivery" as const, label: "Delivery", hint: "Where available. We'll confirm if we deliver to your address." },
];

export const contactOptions = [
  { value: "phone" as const, label: "Phone" },
  { value: "email" as const, label: "Email" },
];

export type Fulfilment = "pickup" | "delivery" | "";
export type ContactMethod = "phone" | "email" | "";
