import { ServiceItem } from "../types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "e-waste-collection",
    slug: "e-waste-collection",
    name: "E-Waste Collection & Doorstep Pickup",
    title: "Doorstep E-Waste Collection in Pune",
    tagline: "Convenient, scheduled electronic scrap collection right from your doorstep anywhere in Pune.",
    shortDescription: "Hassle-free doorstep pickup of old computers, appliances, and office hardware with digital receipt.",
    fullDescription: "Our specialized logistics team operates daily collection routes across Hadapsar, Kothrud, Hinjewadi, Kharadi, and the greater Pune metropolitan area. Whether you are an individual cleaning out outdated gadgets or an office executing an IT upgrade, our team brings certified digital scales and transport vehicles directly to your premises.",
    iconName: "Truck",
    category: "core",
    acceptedMaterials: [
      "Desktop Computers & Towers",
      "Laptops",
      "CRT & LED Monitors",
      "Printers & Scanners",
      "Home Electronics & Microwaves",
      "UPS Units & Batteries"
    ],
    benefits: [
      "No heavy lifting or transport hassles for you",
      "Digital weighing scales on-site for transparent accountability",
      "Flexible weekend and after-hours pickup slots",
      "Instant e-waste handover manifest for tracking"
    ],
    processSteps: [
      "Submit pickup request online or call 93590 29457",
      "Coordination call to confirm quantity & preferred pickup slot",
      "Collection van arrives at your Pune address with digital scales",
      "On-the-spot payment and issuance of collection receipt"
    ],
    idealFor: [
      "Residential households & housing societies",
      "Small-to-medium offices & co-working spaces",
      "Retail shops & local institutions"
    ],
    faqs: [
      {
        question: "Is doorstep pickup free in Pune?",
        answer: "Yes, we offer free doorstep collection for qualifying quantities across Pune. For single small items, we bundle pickups with neighboring routes."
      },
      {
        question: "What notice period is required for collection?",
        answer: "We typically execute pickups within 24 to 48 hours. Same-day emergency pickups are available in Hadapsar, Magarpatta, and nearby eastern corridors."
      }
    ]
  },
  {
    id: "e-waste-buying",
    slug: "e-waste-buying",
    name: "E-Waste & Electronic Scrap Buying",
    title: "Top-Rate Electronic Scrap Buyers in Pune",
    tagline: "Turn obsolete electronics, motherboards, copper wires, and scrap into immediate cash or UPI payment.",
    shortDescription: "Competitive market scrap rates for dead laptops, PCs, copper cables, industrial boards, and components.",
    fullDescription: "We are authorized electronic scrap buyers in Pune offering transparent, market-linked scrap valuation. Rather than letting obsolete electronics degrade in storage or dumping them in municipal landfills, we extract residual value from ferrous metals, precious non-ferrous metals, and reusable silicon components.",
    iconName: "Banknote",
    category: "core",
    acceptedMaterials: [
      "Dead & non-working Laptops",
      "Motherboards, RAM & Graphic Cards",
      "Copper wiring & power cords",
      "Lithium-ion & Lead-acid batteries",
      "Aluminum heatsinks & power supply units",
      "Telecom & Networking chassis"
    ],
    benefits: [
      "Market-competitive valuation per unit or per kilogram",
      "Immediate on-the-spot payment via UPI, Cash, or NEFT",
      "Bulk price premiums for IT firms and scrap contractors",
      "Zero hidden deduction fees"
    ],
    processSteps: [
      "Share item pictures or list via WhatsApp (93590 29457)",
      "Receive indicative scrap quotation based on current metal prices",
      "Material inspection & exact weight verification at pickup",
      "Immediate electronic transfer before dispatch"
    ],
    idealFor: [
      "IT repair shops & technicians with accumulated parts",
      "Businesses decommissioning hardware",
      "Residents wanting fair value for dead electronics"
    ],
    faqs: [
      {
        question: "How do you calculate the scrap price?",
        answer: "Rates depend on device type, weight, motherboard grading (high/medium/low yield), and copper content, referenced against Pune scrap indexes."
      }
    ]
  },
  {
    id: "e-waste-recycling",
    slug: "e-waste-recycling",
    name: "Scientific E-Waste Recycling",
    title: "Eco-Friendly E-Waste Recycling in Pune",
    tagline: "Zero-landfill, pollution-free recycling adhering to Maharashtra Pollution Control Board (MPCB) guidelines.",
    shortDescription: "Safe disassembly, precious metal recovery, and hazardous toxin containment with zero landfill dumping.",
    fullDescription: "Improper disposal of electronics introduces heavy metals like lead, mercury, cadmium, and brominated flame retardants into Pune's soil and water table. Our scientific recycling methodology separates recyclable plastics and metals while neutralizing hazardous fractions in sealed, compliant environments.",
    iconName: "Recycle",
    category: "core",
    acceptedMaterials: [
      "All electronic circuit boards (PCBs)",
      "Cathode ray tubes (CRTs) & LCD panels",
      "Lithium-ion and lead-acid battery packs",
      "Plastic device enclosures & frames",
      "Transformers & motor assemblies"
    ],
    benefits: [
      "Prevents heavy metal contamination in Pune's environment",
      "Recovers secondary raw materials (gold, silver, copper, aluminum)",
      "Reduces carbon footprint compared to virgin mineral mining",
      "Compliant with Government E-Waste Management Rules 2022"
    ],
    processSteps: [
      "Manual sorting into hazardous and non-hazardous fractions",
      "Depollution (removal of batteries, capacitors, mercury lamps)",
      "Mechanical shredding and magnetic/eddy-current separation",
      "Refining of recovered metals into industrial-grade ingots"
    ],
    idealFor: [
      "Environmentally conscious citizens",
      "Companies with ESG (Environmental, Social, Governance) mandates",
      "Schools, universities, and hospitals"
    ],
    faqs: [
      {
        question: "Do you supply Green Recycling Certificates?",
        answer: "Yes, we provide documented Green Recycling Certificates detailing weight recovered and greenhouse gases averted for corporate accounting."
      }
    ]
  },
  {
    id: "it-asset-disposal",
    slug: "it-asset-disposal",
    name: "IT Asset Disposition (ITAD)",
    title: "Corporate IT Asset Disposal & Value Recovery",
    tagline: "End-to-end IT lifecycle decommissioning, asset auditing, remarketing, and compliant disposal for enterprises.",
    shortDescription: "Complete enterprise ITAD solutions: serial number audit, valuation, de-installation, and remarketing.",
    fullDescription: "Managing IT asset turnover requires strict chain-of-custody tracking, asset tagging, and maximum salvage recovery. We partner with technology enterprises across Hinjewadi, Kharadi, Magarpatta, and Viman Nagar to retire servers, blade chassis, enterprise workstations, and telecom nodes smoothly.",
    iconName: "Server",
    category: "compliance",
    acceptedMaterials: [
      "Rack and blade servers (Dell, HP, Cisco, Lenovo)",
      "Enterprise SAN / NAS storage systems",
      "Core switches, routers, firewalls",
      "Employee laptops and dual-monitor fleet setups",
      "Modular UPS and datacenter cooling hardware"
    ],
    benefits: [
      "Detailed serial-level asset audit manifests",
      "Maximum value recovery through remarketing & component salvage",
      "De-installation services by trained hardware technicians",
      "Protected chain of custody with tamper-evident sealing"
    ],
    processSteps: [
      "On-site inventory audit and asset tagging verification",
      "Hardware health grading & fair market valuation proposal",
      "Secure packing and bonded logistics transfer",
      "Comprehensive ITAD audit report and financial reconciliation"
    ],
    idealFor: [
      "Software development centers in Pune IT parks",
      "Financial institutions, BPOs & call centers",
      "Colocation datacenters and telecom providers"
    ],
    faqs: [
      {
        question: "Can you handle datacenters in Hinjewadi or Magarpatta?",
        answer: "Yes, our team is equipped with server lifting gear, ESD packaging, and secure vehicles specifically for Pune datacenter corridors."
      }
    ]
  },
  {
    id: "data-destruction",
    slug: "data-destruction",
    name: "Secure Data Destruction & Sanitization",
    title: "Certified Data Destruction for Hard Drives & SSDs",
    tagline: "Guaranteed eradication of confidential enterprise and personal data using degaussing and physical shredding.",
    shortDescription: "Permanent, irrecoverable physical shredding and degaussing with serialized Destruction Certificates.",
    fullDescription: "Formatting or factory-resetting a drive does not prevent forensic data recovery. For banking records, patient files, intellectual property, and personal records, we deploy NIST 800-88 compliant degaussing (magnetic wiping) followed by hydraulic physical shredding that renders storage platters into unrecognizable granules.",
    iconName: "ShieldAlert",
    category: "specialized",
    acceptedMaterials: [
      "SATA and SAS Magnetic Hard Disk Drives (HDDs)",
      "Solid State Drives (SSDs & NVMe)",
      "Backup magnetic tapes & LTO cartridges",
      "Flash memory, thumb drives, and micro-SD cards",
      "Smartphones, tablets, and encrypted storage media"
    ],
    benefits: [
      "100% forensic irrecoverability guaranteed",
      "On-site mobile destruction or CCTV-monitored facility shredding",
      "Serialized Certificate of Data Destruction issued for audit compliance",
      "Meets ISO 27001, GDPR, and Indian DPDP Act standards"
    ],
    processSteps: [
      "Drive serial numbers scanned into audit tracking log",
      "Magnetic degaussing to wipe magnetic domains (for HDDs)",
      "Cross-cut physical shredding through industrial blades",
      "Signed Certificate of Destruction provided with video proof option"
    ],
    idealFor: [
      "Banks, fintech, and insurance firms",
      "Legal practices & healthcare clinics",
      "Corporations decommissioning employee laptops"
    ],
    faqs: [
      {
        question: "Can you shred hard drives at our Pune office premises?",
        answer: "Yes, we provide on-site mobile shredding witnessed by your security personnel, as well as off-site CCTV-recorded processing."
      }
    ]
  },
  {
    id: "corporate-e-waste-management",
    slug: "corporate-e-waste-management",
    name: "Corporate E-Waste Management & EPR Support",
    title: "End-to-End Corporate E-Waste Solutions in Pune",
    tagline: "Tailored recycling contracts, compliance documentation, and ESG reporting for companies in Pune.",
    shortDescription: "Bulk collection contracts, Form-6 manifests, Extended Producer Responsibility (EPR) assistance.",
    fullDescription: "Corporate compliance in India requires adherence to strict pollution board guidelines, Form-6 tracking, and legal documentation. We provide annual maintenance collection contracts (AMCs), customized collection bins, and comprehensive paperwork required by internal and external environmental auditors.",
    iconName: "Building2",
    category: "compliance",
    acceptedMaterials: [
      "Quarterly office electronics scrap clearances",
      "Manufacturing reject PCBs and component spools",
      "Bulk lighting fixtures and ballast units",
      "Defective warranty return electronics",
      "Decommissioned laboratory & testing equipment"
    ],
    benefits: [
      "Form-6 hazardous waste manifest documentation",
      "Customized indoor collection bins placed at corporate campuses",
      "Scheduled quarterly or bi-annual clearances",
      "Clear ESG sustainability metrics for corporate disclosures"
    ],
    processSteps: [
      "Site inspection and waste stream assessment",
      "Service Level Agreement (SLA) & pricing structure finalization",
      "Dedicated account manager and scheduled collection intervals",
      "Form-6 manifest issuance & compliance filing support"
    ],
    idealFor: [
      "Enterprises in Hinjewadi, Kharadi, Chakan, Talwade, and Magarpatta",
      "Educational campuses and universities",
      "Large hospital chains and manufacturing facilities"
    ],
    faqs: [
      {
        question: "Do you assist with EPR (Extended Producer Responsibility)?",
        answer: "Yes, we assist electronics brands, importers, and manufacturers in fulfilling their annual recycling obligations under Indian EPR guidelines."
      }
    ]
  }
];
