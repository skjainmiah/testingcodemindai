import { Item, CreateItemDto } from '../types/item';

export class ItemService {
  private items: Map<string, Item> = new Map();

  async getAllItems(): Promise<Item[]> {
    return Array.from(this.items.values());
  }

  async getItemById(id: string): Promise<Item | undefined> {
    return this.items.get(id);
  }

  async createItem(data: CreateItemDto): Promise<Item> {
    const item: Item = {
      id: this.generateId(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.items.set(item.id, item);
    return item;
  }

  async updateItem(id: string, data: CreateItemDto): Promise<Item | undefined> {
    const existing = this.items.get(id);
    if (!existing) {
      return undefined;
    }

    const updated: Item = {
      ...existing,
      ...data,
      updatedAt: new Date(),
    };

    this.items.set(id, updated);
    return updated;
  }

  async deleteItem(id: string): Promise<boolean> {
    return this.items.delete(id);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}