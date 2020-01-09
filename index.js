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
  dbo
    .collection("Student").find().toArray((error, result) => {
      if (error) {
        response.status(500).json(error);
      }
      response.status(500).json(result);
    });
});

app.get("/std/:nama", (request, response) => {
  let nama = request.params.nama;
  response.end("Student Name : " + nama);
});

app.post("/siswa", (request, response) => {
  let nama = request.body.nama;
  let alamat = request.body.alamat;
  response.end("Student Name : " + nama + "\r\nAlamat : " + alamat);
});

app.delete("/std/:nama", (request, response) => {
  let nama = request.params.nama;
  response.end("Student Name : " + nama);
});

app.put("/siswa/:id", (req, res) => {
  let id = req.params.id;
  let nama = req.body.nama;
  let alamat = req.body.alamat;
  res.end(
    "Update Data For\r\nId : " +
      id +
      "\r\nStudent Name : " +
      nama +
      "\r\nAlamat : " +
      alamat
  );
});

app.listen("7000");
