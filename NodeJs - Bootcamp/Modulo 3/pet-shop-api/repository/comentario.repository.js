import { getClient } from './mongo.db.js';
import PostRepository from './posts.repository.js';

async function createComentario(id, comments) {
  const client = getClient();
  try {
    await client.connect();
    let post = await PostRepository.getPost(id);
    post.comentarios.push(comments);
    await client
      .db('pet-shop')
      .collection('posts')
      .updateOne({ _id: new client.ObjectId(id) });
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}
export default { createComentario };
