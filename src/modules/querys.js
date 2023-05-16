import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'root',
  database: 'likeme',
  allowExitOnIdle: true,
});

export const getPosts = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM posts');
    return rows;
  } catch (queryError) {
    console.error(`The was an error doing query to bd: ${queryError}`);
  }
};

export const newPost = async (title, img, description, likes) => {
  try {
    const insertValues = 'INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4)';
    const values = [title, img, description, likes];
    await pool.query(insertValues, values);
    console.log('New post added successfully');
  } catch (postError) {
    console.error(`There was an error posting new post: ${postError}`);
  }
};

export const updatePost = async (id, title, img, description, likes) => {
  const query =
    'UPDATE posts SET title = $1, img = $2, description = $3, likes = $4 WHERE id = $5';

  const values = [title, img, description, likes, id];
  try {
    const { rowCount } = await pool.query(query, values);
    if (rowCount === 0) throw new Error(`Post not found with id: ${id}`);
  } catch (error) {
    throw error;
  }
};

export const deletePost = async id => {
  const query = 'DELETE FROM posts WHERE id = $1';
  const values = [id];
  try {
    const { rowCount } = await pool.query(query, values);
    return rowCount;
  } catch (deleteError) {
    console.error(`There was an error deleting the post: ${deleteError}`);
    throw deleteError;
  }
};
