const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.port || 5000;
const ObjectId = require('mongodb').ObjectId;
// dip02
// 0E5foaEr3ZV8VN5B

const uri = "mongodb+srv://dip02:0E5foaEr3ZV8VN5B@cluster0.evf1u.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });

app.use(cors())
app.use(express.json())

async function run() {
    try {
        await client.connect()
        const webCollection = client.db('project').collection('website')

        app.get('/web', async (req, res) => {
            const query = {};
            const website = await webCollection.find(query).toArray();
            res.send(website)
        })
        app.get('/web/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const site = await webCollection.findOne(query)
            res.send(site)
        })

    }
    finally {

    }
}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('DB connected')
})

app.listen(port, () => {
    console.log(`Example app listening on port `, port)
})