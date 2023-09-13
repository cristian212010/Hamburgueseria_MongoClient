import express from 'express';
import { MongoClient } from 'mongodb';
import { Router } from 'express';

const app = express();
const port = 3000;

const client = new MongoClient('mongodb+srv://cristian:12345@hamburgueseriacluster0.sj6qm3w.mongodb.net/');
const db = client.db('hamburgueseria');

const path = {
    ingredientesPath: '/api/ingredientes',
    hamburguesasPath: '/api/hamburguesas'
}

async function connectdb() {
    try {
        await client.connect();
        console.log('db online');
    } catch (error) {
        console.log(error);
    }
}

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})

connectdb();

const router = Router();

app.use(express.json());

// 1
app.use(path.ingredientesPath, router.get('/all', async (req, res)=>{
    try {
        const collection = db.collection('ingredientes');
        const result = await collection.find({stock: {$lt:400}}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

// 2
app.use(path.hamburguesasPath, router.get('/vegetarianas', async (req, res)=>{
    try {
        const collection = db.collection('hamburguesas');
        const result = await collection.find({categoria: "Vegetariana"}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));