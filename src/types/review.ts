export interface Review {
  id: string;
  rating: number;
  content: string;
  reviewer: {
    id: string;
    name: string;
    profileImage: string;
  };
  project: {
    id: string;
    title: string;
  };
  createdAt: string;
  updatedAt: string;
} 