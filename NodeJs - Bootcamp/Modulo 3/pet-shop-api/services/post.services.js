import PostRepository from '../repository/posts.repository.js';
import ComentarioRepository from '../repository/comentario.repository.js';
async function createPost(post) {
  try {
    await PostRepository.createPost(post);
  } catch (err) {
    throw err;
  }
}

async function getAllPosts() {
  try {
    return await PostRepository.getAllPosts();
  } catch (err) {
    throw err;
  }
}
async function createComentario(id, comments) {
  try {
    return await ComentarioRepository.createComentario(id, comments);
  } catch (err) {
    throw err;
  }
}
export default { createPost, getAllPosts, createComentario };
