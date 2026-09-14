import { AcceptedItemCategory } from "../types";

export const ACCEPTED_ITEMS_DATA: AcceptedItemCategory[] = [
  {
    id: "laptops",
    slug: "laptops",
    name: "Laptops & Notebooks",
    iconName: "Laptop",
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    description: "All brands of working, non-working, broken, cracked-screen, and ancient laptops.",
    items: [
      "Dell Latitude, Inspiron, XPS",
      "Lenovo ThinkPad, IdeaPad, Legion",
      "HP EliteBook, ProBook, Pavilion",
      "Apple MacBooks (Pro, Air, Intel/M-series)",
      "Asus, Acer, Toshiba, Sony VAIO",
      "Laptop chargers, docking stations, and spare batteries"
    ],
    acceptedCriteria: "Accepted in any condition (intact, broken screens, water damaged, missing parts).",
    notAccepted: ["Counterfeit non-electronic plastic toys"],
    popularInPune: true,
    environmentalImpact: "Recovers lithium, cobalt from batteries, and high-purity copper and gold from daughterboards."
  },
  {
    id: "computers",
    slug: "computers",
    name: "Desktop Computers & Towers",
    iconName: "Monitor",
    imageUrl: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80",
    description: "Complete CPU towers, all-in-one PCs, mini-PCs, and custom assembled cabinets.",
    items: [
      "Branded towers (Dell OptiPlex, HP ProDesk, Lenovo ThinkCentre)",
      "Custom assembled gaming cabinets & workstations",
      "All-in-One desktops (Apple iMac, HP Pavilion AIO)",
      "Server workstations and CAD terminals",
      "Defective & dead computer chassis with internal components"
    ],
    acceptedCriteria: "Accepted with or without hard drives, with cables or standalone cabinets.",
    notAccepted: ["Empty wooden speaker boxes without electronics"],
    popularInPune: true,
    environmentalImpact: "Diverts toxic flame retardants, lead soldering, and heavy metals away from Pune rivers."
  },
  {
    id: "servers",
    slug: "servers",
    name: "Servers & Datacenter Gear",
    iconName: "Server",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description: "Enterprise 1U/2U/4U rack servers, blade systems, server chassis, and storage arrays.",
    items: [
      "Dell PowerEdge, HPE ProLiant, Cisco UCS servers",
      "SAN / NAS storage controllers & expansion shelves",
      "Server motherboards with dual Intel Xeon / AMD Epyc sockets",
      "Hot-swap redundant power supplies (SMPS)",
      "Server SAS drives, backplanes, and rack rails"
    ],
    acceptedCriteria: "All generations accepted. De-installation assistance available in Pune IT Parks.",
    notAccepted: ["Biomedical laboratory samples inside cooling equipment"],
    popularInPune: true,
    environmentalImpact: "High concentration of industrial gold pins, palladium, and heavy-gauge copper wiring."
  },
  {
    id: "printers",
    slug: "printers",
    name: "Printers, Scanners & Plotters",
    iconName: "Printer",
    imageUrl: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80",
    description: "LaserJet, inkjet, dot matrix, thermal, multi-function copiers, and architectural plotters.",
    items: [
      "HP LaserJet, Canon imageRUNNER, Epson EcoTank",
      "Office multi-function heavy-duty copiers (Xerox, Ricoh)",
      "Flatbed document scanners & barcode scanners",
      "Billing thermal POS printers",
      "Industrial wide-format plotters"
    ],
    acceptedCriteria: "Accepted regardless of toner leakage or broken paper trays.",
    notAccepted: ["Used dry printer paper or shredded cardboard"],
    popularInPune: true,
    environmentalImpact: "Recovers high-impact polystyrene plastic, copper stepper motors, and logic cards."
  },
  {
    id: "monitors-tvs",
    slug: "monitors-tvs",
    name: "Monitors & Television Screens",
    iconName: "Tv",
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    description: "Computer monitors (LED, LCD, Curved, CRT) and household LED/Smart televisions.",
    items: [
      "22\" to 34\" computer LED / IPS / Gaming monitors",
      "Smart LED / OLED televisions (Sony, Samsung, LG, Mi, Vu)",
      "Legacy LCD and heavy CRT glass cathode-ray screens",
      "Wall mounting arms, HDMI display switches, and display adapters"
    ],
    acceptedCriteria: "Accepted with cracked glass, display lines, or dead backlight.",
    notAccepted: ["Bare shattered glass shards without frame"],
    popularInPune: true,
    environmentalImpact: "Safely traps mercury backlights (in older CCFL LCDs) and lead in CRT funnel glass."
  },
  {
    id: "mobile-phones",
    slug: "mobile-phones",
    name: "Mobile Phones & Tablets",
    iconName: "Smartphone",
    imageUrl: "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80",
    description: "Old smartphones, iPhones, Androids, keypad feature phones, iPads, and Android tablets.",
    items: [
      "Android smartphones (Samsung, OnePlus, Xiaomi, Vivo, Oppo, Realme)",
      "Apple iPhones and iPads (all generations)",
      "Old keypad feature phones (Nokia, Samsung Guru, Micromax)",
      "4G/5G mobile motherboards and dead handset bodies",
      "Swollen phone batteries and replacement charging cables"
    ],
    acceptedCriteria: "Accepted locked, cracked, water-damaged, or completely dead.",
    notAccepted: ["Non-electronic silicone cases without phone"],
    popularInPune: true,
    environmentalImpact: "Gold, silver, tantalum, and lithium recovery without open-air acid burning."
  },
  {
    id: "networking-equipment",
    slug: "networking-equipment",
    name: "Routers & Networking Hardware",
    iconName: "Network",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    description: "Office network racks, managed switches, enterprise access points, modems, and PBX telecom systems.",
    items: [
      "Cisco Catalyst switches, Juniper, TP-Link, D-Link",
      "Dual-band Wi-Fi routers and fiber optic GPON terminals",
      "Network server racks, patch panels, and Keystone modules",
      "Telecom EPABX systems and VoIP desk phones",
      "Radio transmitters and outdoor microwave antennas"
    ],
    acceptedCriteria: "All industrial and home network devices accepted in any working state.",
    notAccepted: ["Wood panels used for mounting without electronics"],
    popularInPune: true,
    environmentalImpact: "Gold-plated Ethernet contacts, aluminum cooling fins, and copper transformers."
  },
  {
    id: "cables-wires",
    slug: "cables-wires",
    name: "Cables, Wires & Power Cords",
    iconName: "Cable",
    imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80",
    description: "Loose copper cables, networking patch cords, power cords, and industrial wiring harness bundles.",
    items: [
      "CAT5e / CAT6 Ethernet UTP cables (spools or loose)",
      "Computer power cords, SMPS wiring harnesses, VGA/HDMI cables",
      "Copper earthing strips and flexible copper cables",
      "Telephone lines and coaxial television wiring",
      "AC adapter wires and high-voltage industrial leads"
    ],
    acceptedCriteria: "Accepted stripped or with PVC insulation intact; bulk weighed on-site.",
    notAccepted: ["Fiber-optic glass lines without copper conductor"],
    popularInPune: true,
    environmentalImpact: "100% mechanical stripping; avoids toxic PVC burning into Pune air."
  },
  {
    id: "batteries-ups",
    slug: "batteries-ups",
    name: "UPS, Inverters & Batteries",
    iconName: "BatteryCharging",
    imageUrl: "/images/ups-batteries.jpg",
    description: "Office UPS units, home inverter systems, lead-acid batteries, and high-capacity battery banks.",
    items: [
      "APC, Microtek, Luminous, Sukam, Emerson inverter units",
      "Tubular lead-acid inverter batteries (100Ah, 150Ah, 200Ah)",
      "SMF (Sealed Maintenance Free) 12V UPS batteries (7Ah to 65Ah)",
      "Lithium-ion / LiFePO4 battery modules and e-bike packs",
      "Large industrial copper-wound isolation transformers"
    ],
    acceptedCriteria: "Accepted sealed or used; leak-proof handling containers provided.",
    notAccepted: ["Cracked leaking acid containers without prior notification"],
    popularInPune: true,
    environmentalImpact: "Prevents toxic battery acid from seeping into Pune groundwater."
  },
  {
    id: "pc-components",
    slug: "pc-components",
    name: "PC Components & Circuit Boards",
    iconName: "Cpu",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    description: "Motherboards, processors, graphics cards, RAM sticks, power supply units, and expansion cards.",
    items: [
      "Intel / AMD CPUs (ceramic, fiber, gold-cap processors)",
      "Computer & server motherboards (green, blue, yellow board grades)",
      "NVIDIA / AMD graphic display cards (GPUs)",
      "DDR2, DDR3, DDR4, DDR5 RAM sticks",
      "Hard disk drive logic boards and SMPS power boxes"
    ],
    acceptedCriteria: "Accepted individual or in bulk cartons from repair shops and IT teams.",
    notAccepted: ["Plain plastic casings without any board attached"],
    popularInPune: true,
    environmentalImpact: "Highest recovery rate of gold, platinum, and silver through hydrometallurgy."
  }
];
