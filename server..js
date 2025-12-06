const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Origin ,Accept, X-Requested-With, Content-Type");
    next();
});

const MongoClient = require('mongodb').MongoClient;
let db;


MongoClient.connect(
    'mongodb+srv://rouge1:qwerty123@cluster0.tj6jqur.mongodb.net/',
    (err, client) => {
        if (err) {
            console.log("MongoDB connection error:", err);
            return;
        }

        db = client.db("AfterSchool");
        console.log("Connected to MongoDB");
    }
);



app.get('/', (req, res) => {
    res.send("Backend API running — try /collection/lessons");
});



app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName);
    next();
});



app.get('/collection/:collectionName', (req, res) => {
    req.collection.find({}).toArray((err, results) => {
        if (err) return next(err);
        res.send(results);
    });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server running on port", port);
});
