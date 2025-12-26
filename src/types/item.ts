export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateItemDto {
  name: string;
  description: string;
  price: number;
  quantity: number;
}