import { pool } from '../database/connections.js';

const findAll = async limit => {
  if (limit) {
    const query = 'SELECT * FROM posts LIMIT $1';
    const { rows } = await pool.query(query, [limit]);
    return rows;
  }

  const { rows } = await pool.query('SELECT * FROM posts');
  return rows;
};

const findById = async id => {
  const query = 'SELECT * FROM posts WHERE id = $1';
  const { rows } = await pool.query(query, [id]);
  if (rows.length === 0) throw { code: '404' };
  return rows[0];
};

const create = async (title, img, description, likes) => {
  if (!title || !img || !description || !likes) throw { code: '404' };

  const query = 'INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4)';
  const { rows } = await pool.query(query, [title, img, description, likes]);
  return rows;
};

const update = async (id, title, img, description, likes) => {
  const query =
    'UPDATE posts SET title = $1, img = $2, description = $3, likes = $4 WHERE id = $5';
  try {
    const { rowCount } = await pool.query(query, [
      title,
      img,
      description,
      likes,
      id,
    ]);
    if (rowCount === 0) throw { code: '404' };
  } catch (error) {
    console.error(error);
  }
};

const remove = async id => {
  const searchDelete = 'SELECT * FROM posts WHERE id = $1';
  const queryDelete = 'DELETE FROM posts WHERE id = $1';
  try {
    const { rows } = await pool.query(searchDelete, [id]);
    const { rowCount } = await pool.query(queryDelete, [id]);
    if (rowCount === 0)
      throw { code: 404, msg: `Post with id ${id} does not exist.` };
    return rows;
  } catch (error) {
    console.error(error);
  }
};

export const todoModels = {
  findAll,
  findById,
  create,
  update,
  remove,
};
