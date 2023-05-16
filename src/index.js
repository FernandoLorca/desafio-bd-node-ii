import express from 'express';
import cors from 'cors';

import { getPosts, newPost, deletePost, updatePost } from './modules/querys.js';

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('http://localhost:5173');
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (invokeFuncError) {
    console.error(
      `There was an error invoking get posts function: ${invokeFuncError}`
    );
    res.status(500).json({
      ok: false,
      error: invokeFuncError,
      msg: 'There was an error invoking get posts function',
    });
  }
});

app.post('/posts', async (req, res) => {
  const { title, img, description, likes } = req.body;

  try {
    await newPost(title, img, description, likes);
    res.status(200).json({
      ok: true,
      msg: 'New post added successfully',
    });
  } catch (invokeFuncError) {
    console.error(
      `There was an error invoking new post function: ${invokeFuncError}`
    );
    res.status(500).json({
      ok: false,
      error: invokeFuncError,
      msg: 'There was an error invoking new post function',
    });
  }
});

app.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, img, description, likes } = req.query;

  try {
    await updatePost(id, title, img, description, likes);
    res.json({
      ok: true,
      msg: 'Post updated successfully',
    });
  } catch (error) {
    console.error(`There was an error updating the post: ${error}`);
    res.status(500).json({
      ok: false,
      error: error.code,
      mag: error.message,
    });
  }
});

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const rowCount = await deletePost(id);

    if (rowCount === 0) {
      console.error(`Post not found`);
      return res.status(400).json({
        ok: false,
        msg: 'Post not found',
      });
    }

    res.status(200).json({
      ok: true,
      msg: 'Deleted post',
    });
  } catch (deleteError) {
    console.error(
      `There was an error invoking function of delete post: ${deleteError}`
    );
    res.send(deleteError);
  }
});

app.listen(PORT, console.log(`Server running on port: ${PORT}`));
