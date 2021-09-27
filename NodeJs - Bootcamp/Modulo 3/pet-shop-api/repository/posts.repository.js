import { getClient, ObjectId } from './mongo.db.js';

async function createPost(post) {
  const client = getClient();
  try {
    await client.connect();
    await client.db('pet-shop').collection('posts').insertOne(post);
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

async function getAllPosts() {
  const client = getClient();
  try {
    await client.connect();
    return await client.db('pet-shop').collection('posts').find({}).toArray();
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}
async function getPost(id) {
  const client = getClient();
  try {
    await client.connect();
    return await client
      .db('pet-shop')
      .collection('posts')
      .find({ _id: ObjectId(id) });
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

export default { createPost, getAllPosts, getPost };
