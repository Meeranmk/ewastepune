export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  address: string;
  area: string;
  eWasteType: string[];
  quantity?: string;
  estimatedValue?: number;
  pickupDate?: string;
  message?: string;
  source?: string;
  landingPage?: string;
  createdAt: string;
  status: 'NEW' | 'CONTACTED' | 'PICKUP_SCHEDULED' | 'COLLECTED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  category: 'core' | 'specialized' | 'compliance';
  acceptedMaterials: string[];
  benefits: string[];
  processSteps: string[];
  idealFor: string[];
  faqs: { question: string; answer: string }[];
}

export interface AcceptedItemCategory {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  imageUrl: string;
  description: string;
  items: string[];
  acceptedCriteria: string;
  notAccepted: string[];
  popularInPune: boolean;
  environmentalImpact: string;
}

export interface PuneLocationArea {
  slug: string;
  name: string;
  marathiName?: string;
  zone: 'East Pune' | 'West Pune' | 'Central Pune' | 'South Pune' | 'North / PCMC';
  landmarks: string[];
  pickupSpeed: string;
  description: string;
  featuredHub?: boolean;
}

export interface ScrapEstimatorItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  scrapRate: number; // in INR
  conditionMultiplier: {
    deadOrScrap: number;
    partiallyWorking: number;
    workingOld: number;
  };
}
