import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const client = new MongoClient(process.env.DDBB256);

const db = client.db('hamburgueseria');
const ingredientes = db.collection('ingredientes');
const hamburguesas = db.collection('hamburguesas');
const chefs = db.collection('chefs');
const categorias = db.collection('categorias');

// 1. Encontrar todos los ingredientes con stock menor a 400.
router.get('/ejercicio1', async (req, res)=>{
    try {
        await client.connect();
        const result = await ingredientes.find({stock: {$lt:400}}).toArray();
        res.json(result)
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 2. Encontrar todas las hamburguesas de la categoría “Vegetariana”
router.get('/ejercicio2', async (req, res)=>{
    try {
        await client.connect();
        const result = await hamburguesas.find({categoria: "Vegetariana"}).toArray();
        res.send(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 3. Encontrar todos los chefs que se especializan en “Carnes”
router.get('/ejercicio3', async (req, res) => {
    try {
        await client.connect();
        const result = await chefs.find({especialidad: "Carnes"}).toArray();
        res.send(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 4. Aumentar en 1.5 el precio de todos los ingredientes
router.get('/ejercicio4', async (req, res) => {
    try {
        await client.connect();
        const result = await ingredientes.updateMany({}, { $mul: { precio: 1.5 }});
        res.send('Precio incrementado por 1.5');
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 5. Encontrar todas las hamburguesas preparadas por “ChefB”
router.get('/ejercicio5', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.find({ chef: 'ChefB' }).toArray();
        res.send(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 6. Encontrar el nombre y la descripción de todas las categorías
router.get('/ejercicio6', async (req, res) => {
    try {
        await client.connect();
        const result = await categorias.find().toArray();
        res.send(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 7. Eliminar todos los ingredientes que tengan un stock de 0
router.get('/ejercicio7', async (req, res) => {
    try {
        await client.connect();
        const result = await ingredientes.deleteMany({stock:0});
        res.send(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 8. Agregar un nuevo ingrediente a la hamburguesa “Clásica”
router.get('/ejercicio8', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.updateOne({nombre: "Clásica"}, {$push: {ingredientes: "Lechuga"}});
        res.send(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 9. Encontrar todas las hamburguesas que contienen “Pan integral” como ingrediente
router.get('/ejercicio9', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.find({ingredientes: "Pan integral"}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 10. Cambiar la especialidad del “ChefC” a “Cocina Internacional”
router.get('/ejercicio10', async (req, res) => {
    try {
        await client.connect();
        const result = await chefs.updateOne({nombre: "ChefC"}, {$set: {especialidad: "Cocina Internacional"}});
        res.send(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 11. Encontrar el ingrediente más caro
router.get('/ejercicio11', async (req, res) => {
    try {
        await client.connect();
        const result = await ingredientes.find().sort({precio: -1}).limit(1).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }   
});

// 12. Encontrar las hamburguesas que no contienen “Queso cheddar” como ingrediente
router.get('/ejercicio12', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.find({ingredientes: {$ne: "Queso cheddar"}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 13. Incrementar el stock de “Pan” en 100 unidades
router.get('/ejercicio13', async (req, res) => {
    try {
        await client.connect();
        const result = await ingredientes.updateOne({ nombre: 'Pan' }, { $inc : { stock: 100 } });
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 14. Encontrar todos los ingredientes que tienen una descripción que contiene la palabra “clásico”
router.get('/ejercicio14', async (req, res) => {
    try {
        await client.connect();
        const result = await ingredientes.find({descripcion: {$regex: "clásico"}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }   
});

// 15. Listar las hamburguesas cuyo precio es menor o igual a $9
router.get('/ejercicio15', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.find({precio: {$lte: 9}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 16. Contar cuántos chefs hay en la base de datos
router.get('/ejercicio16', async (req, res) => {
    try {
        await client.connect();
        const result = await chefs.countDocuments();
        res.json(`La cantidad de chefs es ${result}`);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 17. Encontrar todas las categorías que contienen la palabra “gourmet” en su descripción
router.get('/ejercicio17', async (req, res) => {
    try {
        await client.connect();
        const result = await categorias.find({descripcion: {$regex: "gourmet"}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 18. Eliminar las hamburguesas que contienen menos de 5 ingredientes
router.get('/ejercicio18', async (req, res) =>{
    try {
        await client.connect();
        const result = await hamburguesas.deleteMany({$expr: {$lt: [{$size: "$ingredientes"}, 5]}});
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 19. Agregar un nuevo chef a la colección con una especialidad en “Cocina Asiática”
router.get('/ejercicio19', async (req, res) => {
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
});

// 20. Listar las hamburguesas en orden ascendente según su precio
router.get('/ejercicio20', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.find().sort({precio: 1}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 21. Encontrar todos los ingredientes cuyo precio sea entre $2 y $5
router.get('/ejercicio21', async (req, res) => {
    try {
        await client.connect();
        const result = await ingredientes.find({precio: {$gte: 2, $lte: 5}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 22. Actualizar la descripción del “Pan” a “Pan fresco y crujiente”
router.get('/ejercicio22', async (req, res) => {
    try {
        await client.connect();
        const result = await ingredientes.updateOne({nombre: "Pan"},{$set: {descripcion: 'Pan fresco y crujiente'}});
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 23. Encontrar todas las hamburguesas que contienen “Tomate” o “Lechuga” como ingredientes
router.get('/ejercicio23', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.find({$or : [{ingredientes: 'Tomate'}, {ingredientes: 'Lechuga'}]}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

//24. Listar todos los chefs excepto “ChefA”
router.get('/ejercicio24', async (req, res) => {
    try {
        await client.connect();
        const result = await chefs.find({nombre: {$ne: 'ChefA'}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 25. Incrementar en $2 el precio de todas las hamburguesas de la categoría “Gourmet”
router.get('/ejercicio25', async  (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.updateMany({categoria: 'Gourmet'}, {$inc: {precio: 2}});
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 26. Listar todos los ingredientes en orden alfabético
router.get('/ejercicio26', async (req, res) => {
    try {
        await client.connect();
        const result = await ingredientes.find().sort({nombre: 1}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 27. Encontrar la hamburguesa más cara
router.get('/ejercicio27', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.find().sort({precio: -1}).limit(1).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 28. Agregar “Pepinillos” a todas las hamburguesas de la categoría “Clásica”
router.get('/ejercicio28', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.updateMany({categoria: 'Clásica'}, {$push: {ingredientes: 'Pepinillos'}});
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 29. Eliminar todos los chefs que tienen una especialidad en “Cocina Vegetariana”
router.get('/ejercicio29', async (req, res) => {
    try {
        await client.connect();
        const result = await chefs.deleteMany({especialidad: 'Cocina Vegetariana'});
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 30. Encontrar todas las hamburguesas que contienen exactamente 7 ingredientes
router.get('/ejercicio30', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.find({ingredientes: {$size: 7}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 31. Encontrar la hamburguesa más cara que fue preparada por un chef especializado en “Gourmet”
router.get('/ejercicio31', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.aggregate([
            { $match: { chef: 'ChefC', categoria: 'Gourmet' } },
            { $sort: { precio: -1 } },
            { $limit: 1 }
        ]).toArray();
        res.json(result[0]);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 32. Listar todos los ingredientes junto con el número de hamburguesas que los contienen
router.get('/ejercicio32', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.aggregate([
            { $unwind: '$ingredientes' },
            { $group: { _id: '$ingredientes', count: { $sum: 1 } } }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 33. Listar los chefs junto con el número de hamburguesas que han preparado
router.get('/ejercicio33', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.aggregate([{$group: {_id: "$chef", cantidad: {$sum: 1}}}]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 34. Encuentra la categoría con la mayor cantidad de hamburguesas
router.get('/ejercicio34', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.aggregate([{$group: {_id: "$categoria", cantidad: {$sum: 1}}}]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 35. Listar todos los chefs y el costo total de ingredientes de todas las hamburguesas que han preparado
router.get('/ejercicio35', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.aggregate([
            { $unwind: '$ingredientes' },
            { $lookup: { from: 'ingredientes', localField: 'ingredientes', foreignField: 'nombre', as: 'ingredientesData' } },
            {
                $group: {
                    _id: '$chef',
                    costoTotal: { $sum: { $sum: '$ingredientesData.precio' } }
                }
            }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 36. Encontrar todos los ingredientes que no están en ninguna hamburguesa
router.get('/ejercicio36', async (req, res) => {
    try {
        await client.connect();
        const hamburguesasIng = await hamburguesas.distinct('ingredientes');
        const result = await ingredientes.find({ nombre: { $nin: hamburguesasIng } }).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 37. Listar todas las hamburguesas con su descripción de categoría
router.get('/ejercicio37', async (req, res) => {
    try {
        try {
            await client.connect();
        const result = await hamburguesas.aggregate([
            { $lookup: { from: 'categorias', localField: 'categoria', foreignField: 'nombre', as: 'categoriasData' } },
            {
                $project: {
                    _id: 0,
                    categoria: '$categoriasData.nombre',
                    descripcion: '$descripcion'
                }
            }
        ]).toArray();
        res.json(result);
        client.close();
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 38. Encuentra el chef que ha preparado hamburguesas con el mayor número de ingredientes en total
router.get('/ejercicio38', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.aggregate([
            { $unwind: '$ingredientes' },
            { $group: { _id: '$chef', ingredientesCount: { $sum: 1 } } },
            { $sort: { ingredientesCount: -1 } },
            { $limit: 1 }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 39. Encontrar el precio promedio de las hamburguesas en cada categoría
router.get('/ejercicio39', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesas.aggregate([
            { $group: { _id: '$categoria', precio: { $avg: '$precio' } } }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// 40. Listar los chefs y la hamburguesa más cara que han preparado
router.get('/ejercicio40', async (req, res) => {
    try {
        client.connect();
        const result = await hamburguesas.aggregate([
            { $group: { _id: '$chef', hamburguesaCara: { $max: '$precio' } } },
            { $lookup: { from: 'chefs', localField: '_id', foreignField: 'nombre', as: 'chefData' } },
            { $project: { _id: 0, 'chefData.nombre': 1, hamburguesaCara: 1 } }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

export default router;