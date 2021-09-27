import mongodb from 'mongodb';

function getClient() {
  const uri =
    'mongodb+srv://mathias:Qpabimavf2QV3Mmb@cluster0.o1z0b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  return new mongodb.MongoClient(uri);
}

function ObjectId(id) {
  return new mongodb.ObjectId(id);
}
export { getClient, ObjectId };
