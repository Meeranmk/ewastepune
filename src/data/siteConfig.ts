export const SITE_CONFIG = {
  name: "E-Waste Center Pune",
  domain: "ewastecenterpune.online",
  phone: "93590 29457",
  formattedPhone: "+91 93590 29457",
  whatsappNumber: "919359029457",
  email: "contact@ewastecenterpune.online",
  address: {
    street: "Survey No. 89, Samarth Nagar Road, Hingane Mala, Ramtekadi",
    locality: "Hadapsar",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411013",
    full: "Survey No. 89, Samarth Nagar, Road, Hingane Mala, Ramtekadi, Hadapsar, Pune, Maharashtra 411013"
  },
  geo: {
    latitude: 18.5089,
    longitude: 73.9260
  },
  hours: {
    weekdays: "Monday – Saturday: 9:00 AM – 8:00 PM",
    sunday: "Sunday: 10:00 AM – 4:00 PM (Emergency & Scheduled Pickups)"
  },
  turnaroundTime: "Same Day or 24-48 Hours Across Pune",
  tagline: "Responsible E-Waste Recycling & Certified Scrap Buyers in Pune",
  mission: "Safeguarding Pune's environment through scientific electronic waste recycling, transparent scrap valuation, and certified doorstep collection.",
  trustPillars: [
    { label: "Doorstep Pickup", desc: "Free collection for bulk & residential units" },
    { label: "Instant Payment", desc: "On-the-spot UPI or cash per current scrap market rates" },
    { label: "Data Destruction", desc: "100% secure data sanitization for storage media" },
    { label: "Pune-Wide Coverage", desc: "Hadapsar, Hinjewadi, Kharadi, Kothrud, Baner & all areas" }
  ]
};

export const getWhatsAppLink = (customText?: string) => {
  const defaultText = "Hello E-Waste Center Pune! I would like to schedule an e-waste pickup / get a scrap quote.";
  const encoded = encodeURIComponent(customText || defaultText);
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encoded}`;
};
