import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import { todoController } from './controller/todo.controller.js';

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('http://localhost:5173');
});

app.get('/posts', todoController.getAllPosts);
app.get('/posts/:id', todoController.getTodo);
app.post('/posts', todoController.createTodo);
app.put('/posts/:id', todoController.updateTodo);
app.delete('/posts/:id', todoController.deleteTodo);

app.listen(PORT, console.log(`Server running on port: ${PORT}`));
