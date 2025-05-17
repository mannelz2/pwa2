export interface AppDetails {
  name: string;
  developer: string;
  description: string;
  rating: number;
  downloads: string;
  iconUrl: string;
  screenshots: string[];
  category: string[];
  ratingDistribution: {
    stars: number;
    percentage: number;
  }[];
}

declare global {
  interface Window {
    fbq: any;
    OneSignal: any;
  }
}