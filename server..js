const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Origin ,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
})


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
    res.send("Backend API is running");
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server running on port", port);
});
