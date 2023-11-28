const mongoose = require('mongoose')

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    mongoose.set('strictQuery',false)
    mongoose.connect(uri)

    const itemSchema = new mongoose.Schema({
        name: String,
        expDate: String,
        image: String,
      })

    const Item = mongoose.model('Item', itemSchema)
    
    const item = new Item({
    name: 'milk',
    expDate: '',
    image: 'milk.svg'
    })

    item.save().then(result => {
    console.log('item saved!')
    mongoose.connection.close()
    })
    /**
    Item.find({}).then(result => {
        result.forEach(item => {
          console.log(item)
        })
        mongoose.connection.close()
      })
    */


  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);