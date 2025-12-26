import { Request, Response, NextFunction } from 'express';
import { ItemService } from '../services/itemService';
import { logger } from '../utils/logger';

const itemService = new ItemService();

export const getItems = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const items = await itemService.getAllItems();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const getItemById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await itemService.getItemById(id);
    
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const item = await itemService.createItem(req.body);
    logger.info(`Created new item: ${item.id}`);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await itemService.updateItem(id, req.body);
    
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    
    logger.info(`Updated item: ${id}`);
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await itemService.deleteItem(id);
    
    if (!deleted) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    
    logger.info(`Deleted item: ${id}`);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};