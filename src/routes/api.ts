import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { createItemSchema } from '../schemas/itemSchema';
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/itemController';

export const apiRouter = Router();

apiRouter.get('/items', getItems);
apiRouter.get('/items/:id', getItemById);
apiRouter.post('/items', validateRequest(createItemSchema), createItem);
apiRouter.put('/items/:id', validateRequest(createItemSchema), updateItem);
apiRouter.delete('/items/:id', deleteItem);