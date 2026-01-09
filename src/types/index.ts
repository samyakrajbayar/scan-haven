export interface Scan {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: Date;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  coverImage?: string;
  scans: Scan[];
  createdAt: Date;
}
