import postServices from '../services/post.services.js';

async function createPost(req, res, next) {
  try {
    res.end(await postServices.createPost(req.body));
  } catch (err) {
    next(err);
  }
}

async function getAllPosts(req, res, next) {
  try {
    res.send(await postServices.getAllPosts());
  } catch (err) {
    next(err);
  }
}
async function createComentario(req, res, next) {
  try {
    if (!req.body.id || !req.body.comentarios) {
      throw new Error('id do post e comentarios sao obrigatorios');
    }
    res.send(
      await postServices.createComentario(req.body.id, req.body.comentarios)
    );
  } catch (err) {
    next(err);
  }
}
export default { createPost, getAllPosts, createComentario };
