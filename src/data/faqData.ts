export interface FAQItem {
  id: string;
  category: 'General' | 'Pickup & Payment' | 'Corporate & Data' | 'Locations';
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "What types of electronic waste do you collect in Pune?",
    answer: "We collect nearly all consumer and enterprise electronics: desktop computers, laptops, servers, LCD/LED monitors, printers, mobile phones, networking gear (routers/switches), copper wiring, power supplies, inverter batteries, motherboards, and general electronic scrap."
  },
  {
    id: "faq-2",
    category: "Pickup & Payment",
    question: "Do you offer doorstep pickup across all areas of Pune?",
    answer: "Yes, our collection vehicles operate daily across Hadapsar, Magarpatta, Kothrud, Hinjewadi, Kharadi, Viman Nagar, Baner, Aundh, Wakad, Katraj, Swargate, PCMC, and all surrounding Pune suburbs. Pickup is free for qualifying quantities."
  },
  {
    id: "faq-3",
    category: "Pickup & Payment",
    question: "How do you pay for electronic scrap?",
    answer: "We carry certified digital scales directly to your premises. Material is weighed and inspected on-site, and you receive an immediate payment via UPI (Google Pay, PhonePe, Paytm), instant IMPS bank transfer, or cash on the spot before we load the items."
  },
  {
    id: "faq-4",
    category: "Corporate & Data",
    question: "How is confidential data on hard drives and laptops handled?",
    answer: "For data-bearing media (HDDs, SSDs, flash storage), we offer NIST 800-88 compliant magnetic degaussing and hydraulic physical shredding. We record individual drive serial numbers and issue an official Certificate of Data Destruction for corporate audit compliance."
  },
  {
    id: "faq-5",
    category: "Corporate & Data",
    question: "Do you issue legal E-Waste Recycling Certificates and Form-6 manifests?",
    answer: "Yes, for corporate clients, IT companies, and institutions, we provide complete compliance documentation, including Green Recycling Certificates and MPCB Form-6 manifests detailing the weight of scrap diverted from landfills."
  },
  {
    id: "faq-6",
    category: "Pickup & Payment",
    question: "Can I sell a single dead laptop or old computer?",
    answer: "Yes! Individual residents can sell single laptops or desktop towers. You can request a pickup online, bring it to our Hadapsar facility (Survey No. 89, Hingane Mala, Ramtekadi), or we can schedule a pickup when our collection van is in your locality."
  },
  {
    id: "faq-7",
    category: "Locations",
    question: "Where is your main facility located in Pune?",
    answer: "Our central facility is at Survey No. 89, Samarth Nagar Road, Hingane Mala, Ramtekadi, Hadapsar, Pune, Maharashtra 411013. You are welcome to visit during working hours (Monday to Saturday: 9 AM to 8 PM) or call us at 93590 29457."
  },
  {
    id: "faq-8",
    category: "General",
    question: "What happens to the e-waste after you collect it?",
    answer: "Collected e-waste is sorted into reusable units and non-working scrap. Working components are salvaged, while broken electronics are scientifically disassembled to safely recover copper, aluminum, iron, and precious metals while neutralizing hazardous components like mercury and lead."
  }
];
