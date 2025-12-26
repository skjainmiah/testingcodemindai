import { ItemService } from '../../../src/services/itemService';
import { CreateItemDto } from '../../../src/types/item';

describe('ItemService', () => {
  let itemService: ItemService;

  beforeEach(() => {
    itemService = new ItemService();
  });

  describe('createItem', () => {
    it('should create a new item', async () => {
      const itemData: CreateItemDto = {
        name: 'Test Item',
        description: 'Test Description',
        price: 99.99,
        quantity: 10,
      };

      const item = await itemService.createItem(itemData);

      expect(item).toMatchObject(itemData);
      expect(item.id).toBeDefined();
      expect(item.createdAt).toBeInstanceOf(Date);
      expect(item.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('getAllItems', () => {
    it('should return all items', async () => {
      const itemData1: CreateItemDto = {
        name: 'Item 1',
        description: 'Description 1',
        price: 10.00,
        quantity: 5,
      };

      const itemData2: CreateItemDto = {
        name: 'Item 2',
        description: 'Description 2',
        price: 20.00,
        quantity: 3,
      };

      await itemService.createItem(itemData1);
      await itemService.createItem(itemData2);

      const items = await itemService.getAllItems();

      expect(items).toHaveLength(2);
    });
  });

  describe('getItemById', () => {
    it('should return item by id', async () => {
      const itemData: CreateItemDto = {
        name: 'Test Item',
        description: 'Test Description',
        price: 99.99,
        quantity: 10,
      };

      const createdItem = await itemService.createItem(itemData);
      const foundItem = await itemService.getItemById(createdItem.id);

      expect(foundItem).toEqual(createdItem);
    });

    it('should return undefined for non-existent item', async () => {
      const item = await itemService.getItemById('non-existent-id');
      expect(item).toBeUndefined();
    });
  });

  describe('updateItem', () => {
    it('should update an existing item', async () => {
      const itemData: CreateItemDto = {
        name: 'Original Name',
        description: 'Original Description',
        price: 50.00,
        quantity: 5,
      };

      const createdItem = await itemService.createItem(itemData);

      const updateData: CreateItemDto = {
        name: 'Updated Name',
        description: 'Updated Description',
        price: 75.00,
        quantity: 8,
      };

      const updatedItem = await itemService.updateItem(createdItem.id, updateData);

      expect(updatedItem).toMatchObject(updateData);
      expect(updatedItem?.id).toBe(createdItem.id);
      expect(updatedItem?.updatedAt).not.toBe(createdItem.updatedAt);
    });

    it('should return undefined when updating non-existent item', async () => {
      const updateData: CreateItemDto = {
        name: 'Updated Name',
        description: 'Updated Description',
        price: 75.00,
        quantity: 8,
      };

      const result = await itemService.updateItem('non-existent-id', updateData);
      expect(result).toBeUndefined();
    });
  });

  describe('deleteItem', () => {
    it('should delete an existing item', async () => {
      const itemData: CreateItemDto = {
        name: 'Test Item',
        description: 'Test Description',
        price: 99.99,
        quantity: 10,
      };

      const createdItem = await itemService.createItem(itemData);
      const deleteResult = await itemService.deleteItem(createdItem.id);

      expect(deleteResult).toBe(true);

      const foundItem = await itemService.getItemById(createdItem.id);
      expect(foundItem).toBeUndefined();
    });

    it('should return false when deleting non-existent item', async () => {
      const result = await itemService.deleteItem('non-existent-id');
      expect(result).toBe(false);
    });
  });
});