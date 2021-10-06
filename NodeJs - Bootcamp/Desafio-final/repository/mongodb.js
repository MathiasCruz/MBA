const mongodb = require('mongodb')

function getClient() {
  const uri =
    "mongodb+srv://mathias:Spectre360@cluster0.sprne.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  return new mongodb.MongoClient(uri);
}
module.exports = { getClient };
