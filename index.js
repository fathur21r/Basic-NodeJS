const expr = require("express");
const bodyParser = require("body-parser");
const mongoDb = require("mongodb");
const assert = require("assert");

const app = expr(),
    dbUrl = "mongodb://localhost:27017",
    dbName = "School",
    dbClient = mongoDb.MongoClient,
    ObjId = mongoDb.ObjectID;

let dbo = null;
dbClient.connect(dbUrl, (err, db) => {
    if (err) {
        console.log(err);
        throw err;
    }
    dbo = db.db(dbName);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", function(req, res) {
    res.send("Return");
});

app.get("/Student", (request, response) => {
    dbo.collection("Student").find().toArray((error, result) => {
        if (error) {
            response.status(500).json(error);
        }
        response.status(500).json(result);
    });
});

app.get("/Student/:id", (request, response) => {
    let id = new ObjId(request.params.id);
    dbo.collection("Student").findOne({ "_id": id }, (error, result) => {
        if (error) {
            response.status(500).json(error);
        }
        response.status(200).json(result);
    })
});

app.post("/Student", (request, response) => {
    let nama = request.body.nama;
    let alamat = request.body.alamat;
    dbo.collection("Student").insertOne({
        Nama: nama,
        Alamat: alamat
    }, (error, result) => {
        if (error) {
            response.status(500).json(error);
        }
        response.status(200).json(result);
    })
});

app.delete("/Student/:id", (request, response) => {
    let id = new ObjId(request.params.id);
    dbo.collection("Student").deleteOne({
        _id: id
    }, (error, result) => {
        if (error) {
            response.status(500).json(error);
        }
        response.status(200).json(result);
    })
});

app.put("/Student/:id", (req, res) => {
    let id = new ObjId(req.params.id);
    let nama = req.body.nama;
    let alamat = req.body.alamat;

    dbo.collection("Student").updateOne({
        _id: id
    }, {
        $set: {
            Nama: nama,
            Alamat: alamat
        }
    }, (error, result) => {
        if (error) {
            res.status(500).json(error);
        }
        res.status(200).json(result);
    })
});

app.listen("7000");