import { postsModels } from '../models/posts.models.js';
import { handleErrors } from '../database/errors.js';

const getAllPosts = async (req, res) => {
  const { limit } = req.query;
  try {
    const response = await postsModels.findAll(limit);
    return res.status(200).json({ ok: true, response });
  } catch (queryError) {
    console.error(`The was an error doing query to bd: ${queryError}`);
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await postsModels.findById(id);
    res.status(200).json({ ok: true, response });
  } catch (error) {
    console.error(error);
    const { status, msg } = handleErrors(error.code);
    return res.status(status).json({
      ok: false,
      msg,
    });
  }
};

const createPost = async (req, res) => {
  const { title, img, description, likes } = req.body;
  try {
    await postsModels.create(title, img, description, likes);
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
    const { status, msg } = handleErrors(error.code);
    return res.status(status).json({
      ok: false,
      msg,
    });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, img, description, likes } = req.body;

  try {
    const resposne = await postsModels.update(
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
    const { status, msg } = handleErrors(error.code);
    return res.status(status).json({
      ok: false,
      msg,
    });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await postsModels.remove(id);
    res.status(200).json({
      ok: true,
      deletedPost: response,
    });
  } catch (error) {
    console.error(error);
    const { status, msg } = handleErrors(error.code);
    return res.status(status).json({
      ok: false,
      msg,
    });
  }
};

export const postController = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
