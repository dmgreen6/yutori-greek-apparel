export interface ProductConfig {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: string[];
  category: 'jacket' | 'hoodie' | 'tshirt' | 'polo' | 'accessory' | 'cardigan';
}

export interface Organization {
  orgId: string;
  name: string;
  shortName: string;
  greekLetters: string;
  founded: number;
  motto: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoUrl: string;
  heroImage: string;
  products: ProductConfig[];
}
