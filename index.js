import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const router = express.Router();
const port = process.env.PORT256;

const client = new MongoClient(process.env.DDBB256);

const db = client.db('hamburgueseria');
const ingredientes = db.collection('ingredientes');
const hamburguesas = db.collection('hamburguesas');
const chefs = db.collection('chefs');
const categorias = db.collection('categorias');

const path = {
    ingredientesPath: '/api/ingredientes',
    hamburguesasPath: '/api/hamburguesas',
    chefsPath: '/api/chefs',
    categoriasPath: '/api/categorias'
}

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})

app.use(express.json());

// 1
app.use(path.ingredientesPath, router.get('/ejercicio1', async (req, res)=>{
    try {
        await client.connect();
        const result = await ingredientes.find({stock: {$lt:400}}).toArray();
        res.json(result)
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}));

// 2
app.use(path.hamburguesasPath, router.get('/ejercicio2', async (req, res)=>{
    try {
        await client.connect();
        const result = await hamburguesas.find({categoria: "Vegetariana"}).toArray();
        res.send(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}));

// 3
app.use(path.chefsPath, router.get('/ejercicio3', async (req, res) => {
    try {
        await client.connect();
        const result = await chefs.find({especialidad: "Carnes"}).toArray();
        res.send(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}));

// 4
app.use(path.ingredientesPath, router.get('/ejercicio4', async (req, res) => {
    try {
        await client.connect();
        const result = await ingredientes.updateMany({}, { $mul: { precio: 1.5 }});
        res.send('Precio incrementado por 1.5');
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}));

// 5
app.use(path.hamburguesasPath, router.get('/ejercicio5', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.find({ chef: 'ChefB' }).toArray();
        res.send(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}));

// 6
app.use(path.categoriasPath, router.get('/ejercicio6', async (req, res) => {
    try {
        await client.connect();
        const result = await categorias.find().toArray();
        res.send(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}));

// 7
app.use(path.ingredientesPath, router.get('/ejercicio7', async (req, res) => {
    try {
        await client.connect();
        const result = await ingredientes.deleteMany({stock:0});
        res.send(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}));

// 8
app.use(path.hamburguesasPath, router.get('/ejercicio8', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.updateOne({nombre: "Clásica"}, {$push: {ingredientes: "Lechuga"}});
        res.send(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}));

// 9. Encontrar todas las hamburguesas que contienen “Pan integral” como ingrediente
app.use(path.hamburguesasPath, router.get('/ejercicio9', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.find({ingredientes: "Pan integral"}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}))

// 10. Cambiar la especialidad del “ChefC” a “Cocina Internacional”
app.use(path.chefsPath, router.get('/ejercicio10', async (req, res) => {
    try {
        await client.connect();
        const result = await chefs.updateOne({nombre: "ChefC"}, {$set: {especialidad: "Cocina Internacional"}});
        res.send(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}));

// 11. Encontrar el ingrediente más caro
app.use(path.ingredientesPath, router.get('/ejercicio11', async (req, res) => {
    try {
        await client.connect();
        const result = await ingredientes.find().sort({precio: -1}).limit(1).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }   
}));

// 12. Encontrar las hamburguesas que no contienen “Queso cheddar” como ingrediente
app.use(path.hamburguesasPath, router.get('/ejercicio12', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.find({ingredientes: {$ne: "Queso cheddar"}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}));

// 13. Incrementar el stock de “Pan” en 100 unidades
app.use(path.ingredientesPath, router.get('/ejercicio13', async (req, res) => {
    try {
        await client.connect();
        const result = await ingredientes.updateOne({ nombre: 'Pan' }, { $inc : { stock: 100 } });
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}))

// 14. Encontrar todos los ingredientes que tienen una descripción que contiene la palabra “clásico”
app.use(path.ingredientesPath, router.get('/ejercicio14', async (req, res) => {
    try {
        await client.connect();
        const result = await ingredientes.find({descripcion: {$regex: "clásico"}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }   
}))

// 15. Listar las hamburguesas cuyo precio es menor o igual a $9
app.use(path.hamburguesasPath, router.get('/ejercicio15', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.find({precio: {$lte: 9}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}))

// 16. Contar cuántos chefs hay en la base de datos
app.use(path.chefsPath, router.get('/ejercicio16', async (req, res) => {
    try {
        await client.connect();
        const result = await chefs.countDocuments();
        res.json(`La cantidad de chefs es ${result}`);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}))

// 17. Encontrar todas las categorías que contienen la palabra “gourmet” en su descripción
app.use(path.categoriasPath, router.get('/ejercicio17', async (req, res) => {
    try {
        await client.connect();
        const result = await categorias.find({descripcion: {$regex: "gourmet"}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}))

// 18. Eliminar las hamburguesas que contienen menos de 5 ingredientes
app.use(path.hamburguesasPath, router.get('/ejercicio18', async (req, res) =>{
    try {
        await client.connect();
        const result = await hamburguesas.deleteMany({$expr: {$lt: [{$size: "$ingredientes"}, 5]}});
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}))

// 19. Agregar un nuevo chef a la colección con una especialidad en “Cocina Asiática”
app.use(path.chefsPath, router.get('/ejercicio19', async (req, res) => {
    try {
        await client.connect();
        const result = await chefs.insertOne({
            nombre: "ChefD",
            especialidad: "Cocina Asiática"
        });
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}))

// 20. Listar las hamburguesas en orden ascendente según su precio
app.use(path.hamburguesasPath, router.get('/ejercicio20', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.find().sort({precio: 1}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}))

// 21. Encontrar todos los ingredientes cuyo precio sea entre $2 y $5
app.use(path.ingredientesPath, router.get('/ejercicio21', async (req, res) => {
    try {
        await client.connect();
        const result = await ingredientes.find({precio: {$gte: 2, $lte: 5}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}))

// 22. Actualizar la descripción del “Pan” a “Pan fresco y crujiente”
app.use(path.ingredientesPath, router.get('/ejercicio22', async (req, res) => {
    try {
        await client.connect();
        const result = await ingredientes.updateOne({nombre: "Pan"},{$set: {descripcion: 'Pan fresco y crujiente'}});
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}))

// 23. Encontrar todas las hamburguesas que contienen “Tomate” o “Lechuga” como ingredientes
app.use(path.hamburguesasPath, router.get('/ejercicio23', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.find({$or : [{ingredientes: 'Tomate'}, {ingredientes: 'Lechuga'}]}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}))

//24. Listar todos los chefs excepto “ChefA”
app.use(path.chefsPath, router.get('/ejercicio24', async (req, res) => {
    try {
        await client.connect();
        const result = await chefs.find({nombre: {$ne: 'ChefA'}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}))

// 25. Incrementar en $2 el precio de todas las hamburguesas de la categoría “Gourmet”
app.use(path.hamburguesasPath, router.get('/ejercicio25', async  (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.updateMany({categoria: 'Gourmet'}, {$inc: {precio: 2}});
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}))

// 26. Listar todos los ingredientes en orden alfabético
app.use(path.ingredientesPath, router.get('/ejercicio26', async (req, res) => {
    try {
        await client.connect();
        const result = await ingredientes.find().sort({nombre: 1}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}))

// 27. Encontrar la hamburguesa más cara
app.use(path.hamburguesasPath, router.get('/ejercicio27', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.find().sort({precio: -1}).limit(1).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}))

// 28. Agregar “Pepinillos” a todas las hamburguesas de la categoría “Clásica”
app.use(path.hamburguesasPath, router.get('/ejercicio28', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.updateMany({categoria: 'Clásica'}, {$push: {ingredientes: 'Pepinillos'}});
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}))

// 29. Eliminar todos los chefs que tienen una especialidad en “Cocina Vegetariana”
app.use(path.chefsPath, router.get('/ejercicio29', async (req, res) => {
    try {
        await client.connect();
        const result = await chefs.deleteMany({especialidad: 'Cocina Vegetariana'});
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}))

// 30. Encontrar todas las hamburguesas que contienen exactamente 7 ingredientes
app.use(path.hamburguesasPath, router.get('/ejercicio30', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.find({ingredientes: {$size: 7}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}))

// 31. Encontrar la hamburguesa más cara que fue preparada por un chef especializado en “Gourmet”
app.use(path.chefsPath, router.get('/ejercicio31', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.find();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}))