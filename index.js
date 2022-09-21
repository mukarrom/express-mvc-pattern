// import
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors())
app.use(express.json())

//database connect
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

// routes
async function run(){
    try{
        await client.connect();

        // DB collections
        const toolsCollection = client.db('simpleTools').collection('tools');

        // API
        app.get('/tools', async (req, res)=>{
            const query = {};
            const result = await toolsCollection.find(query).toArray();
            res.send(result)
        })

        app.post('/tools', async (req, res)=>{
            const tools = req.body;
            const result = await toolsCollection.insertOne(tools);
            res.send(result)
        })
    }finally{

    }
}
// call the run function
run().catch(console.dir)

app.get('/', (req, res)=>{
    res.send('Hello World')
})

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`)
})