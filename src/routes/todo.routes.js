import Router from 'express';
import { todoController } from '../controller/todo.controller';

const router = Router();

router.get('/posts', todoController.getAllPosts());
router.get('/posts/:id', todoController.getAllPosts());
router.post('/posts', todoController.getAllPosts());
router.put('/posts/:id', todoController.getAllPosts());
router.delete('/posts/:id');
