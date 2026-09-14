export interface EstimatorDevice {
  id: string;
  name: string;
  category: string;
  unit: string;
  avgRate: number; // in INR
  icon: string;
  note: string;
}

export const ESTIMATOR_DEVICES: EstimatorDevice[] = [
  {
    id: "laptop",
    name: "Old / Scrap Laptop",
    category: "Computers",
    unit: "unit",
    avgRate: 650,
    icon: "Laptop",
    note: "Higher quote if working or Core i3/i5/i7"
  },
  {
    id: "desktop-cpu",
    name: "Desktop CPU Cabinet",
    category: "Computers",
    unit: "unit",
    avgRate: 500,
    icon: "Monitor",
    note: "Evaluated with motherboard, SMPS, RAM"
  },
  {
    id: "monitor",
    name: "LCD / LED Monitor",
    category: "Displays",
    unit: "unit",
    avgRate: 300,
    icon: "Tv",
    note: "Screens evaluated with intact chassis"
  },
  {
    id: "server",
    name: "Rack / Tower Server",
    category: "Enterprise",
    unit: "unit",
    avgRate: 2800,
    icon: "Server",
    note: "Dual socket enterprise server estimate"
  },
  {
    id: "printer",
    name: "Office / Home Printer",
    category: "Peripherals",
    unit: "unit",
    avgRate: 250,
    icon: "Printer",
    note: "Heavy office copiers valued higher on motor yield"
  },
  {
    id: "inverter-battery",
    name: "Inverter / Lead-Acid Battery",
    category: "Power",
    unit: "unit",
    avgRate: 1400,
    icon: "BatteryCharging",
    note: "Lead recovery value based on Ah rating"
  },
  {
    id: "ups",
    name: "Desktop UPS Unit",
    category: "Power",
    unit: "unit",
    avgRate: 400,
    icon: "Zap",
    note: "Internal transformer & battery accounted"
  },
  {
    id: "copper-cables",
    name: "Copper Wires & Cables",
    category: "Wiring",
    unit: "KG",
    avgRate: 240,
    icon: "Cable",
    note: "On-site digital weighing by our van team"
  },
  {
    id: "motherboard",
    name: "Scrap Circuit Boards / Motherboards",
    category: "Components",
    unit: "KG",
    avgRate: 350,
    icon: "Cpu",
    note: "Grade A/B PCB yield rate"
  },
  {
    id: "mobile-phone",
    name: "Dead Smartphone / Tablet",
    category: "Mobiles",
    unit: "unit",
    avgRate: 120,
    icon: "Smartphone",
    note: "Lithium battery & display recovery"
  }
];

export interface ScrapPriceIndexItem {
  id: string;
  itemName: string;
  category: string;
  priceMin: number;
  priceMax: number;
  unit: string;
}

export const SCRAP_PRICING_DATA: ScrapPriceIndexItem[] = [
  { id: '1', itemName: 'Laptops (Scrap / Non-working)', category: 'Laptops', priceMin: 400, priceMax: 1200, unit: 'unit' },
  { id: '2', itemName: 'Laptops (Working / Semi-working)', category: 'Laptops', priceMin: 1500, priceMax: 6500, unit: 'unit' },
  { id: '3', itemName: 'Desktop CPU Cabinet (Complete)', category: 'Computers', priceMin: 350, priceMax: 1400, unit: 'unit' },
  { id: '4', itemName: 'LCD / LED Monitors', category: 'Displays', priceMin: 200, priceMax: 1200, unit: 'unit' },
  { id: '5', itemName: 'CRT Monitors / Old TVs', category: 'Displays', priceMin: 100, priceMax: 300, unit: 'unit' },
  { id: '6', itemName: 'Inverter & Car Batteries', category: 'Batteries', priceMin: 75, priceMax: 95, unit: 'kg' },
  { id: '7', itemName: 'UPS Units (Home / Small Office)', category: 'Power', priceMin: 250, priceMax: 800, unit: 'unit' },
  { id: '8', itemName: 'Heavy Enterprise UPS Systems', category: 'Power', priceMin: 45, priceMax: 65, unit: 'kg' },
  { id: '9', itemName: 'Server Racks / Blade Servers', category: 'Datacenter', priceMin: 1800, priceMax: 9000, unit: 'unit' },
  { id: '10', itemName: 'Copper Wires & Telecom Cables', category: 'Cables', priceMin: 220, priceMax: 360, unit: 'kg' },
  { id: '11', itemName: 'Computer Motherboards (Green/Blue)', category: 'PCBs', priceMin: 280, priceMax: 450, unit: 'kg' },
  { id: '12', itemName: 'Printers & Photocopiers', category: 'Peripherals', priceMin: 150, priceMax: 1200, unit: 'unit' },
  { id: '13', itemName: 'Hard Drives (SATA / SAS)', category: 'Storage', priceMin: 50, priceMax: 200, unit: 'unit' },
  { id: '14', itemName: 'Mobile Phones & Tablets', category: 'Mobiles', priceMin: 50, priceMax: 600, unit: 'unit' }
];
