import { pool } from '../database/connections.js';
import { todoModels } from '../models/todo.models.js';

const getAllPosts = async (req, res) => {
  const { limit } = req.query;
  try {
    const response = await todoModels.findAll(limit);
    return res.status(200).json({ ok: true, response });
  } catch (queryError) {
    console.error(`The was an error doing query to bd: ${queryError}`);
  }
};

const getTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await todoModels.findById(id);
    res.status(200).json({ ok: true, response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

const createTodo = async (req, res) => {
  const { title, img, description, likes } = req.body;
  try {
    await todoModels.create(title, img, description, likes);
    res.status(200).json({
      ok: true,
      postCreated: {
        title,
        img,
        description,
        likes,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, img, description, likes } = req.body;

  try {
    const resposne = await todoModels.update(
      id,
      title,
      img,
      description,
      likes
    );
    res.status(200).json({
      ok: true,
      resposne,
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await todoModels.remove(id);
    res.status(200).json({
      ok: true,
      deletedPost: response,
    });
  } catch (error) {
    console.error(error);
  }
};

export const todoController = {
  getAllPosts,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
