export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  barcode?: string;
  image?: string;
  collected?: boolean;
}

export interface SmartList {
  id: string;
  name: string;
  items: ShoppingItem[];
  createdAt: Date;
  scheduledDelivery?: {
    frequency: "weekly" | "monthly";
    dayOfMonth?: number;
    dayOfWeek?: number;
    time: string;
  };
}

export interface Order {
  id: string;
  items: ShoppingItem[];
  total: number;
  status: "pending" | "delivered" | "cancelled";
  deliveryAddress: string;
  orderDate: Date;
  deliveryDate?: Date;
  receipt: {
    id: string;
    qrCode: string;
    verificationHash: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: string[];
  preferences: {
    notifications: boolean;
    priceAlerts: boolean;
    nearExpiryAlerts: boolean;
  };
}

export interface StoreLocation {
  x: number;
  y: number;
  floor: number;
  section: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  barcode: string;
  image: string;
  stock: number;
  location: StoreLocation;
  nearExpiry?: boolean;
  discount?: number;
  rating: number;
  reviews: number;
}

export interface ShelfData {
  id: string;
  location: StoreLocation;
  products: Product[];
}

export interface NavigationPath {
  from: StoreLocation;
  to: StoreLocation;
  steps: StoreLocation[];
  estimatedTime: number;
}