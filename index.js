const expr = require("express");
const bodyParser = require("body-parser");

const app = expr();

app.use(bodyParser.urlencoded({ extended: false }))
app.get("/", function(req, res) {
    res.send("Return");
});

app.get("/std", (request, response) => {
    response.end("Student");
});

app.get("/std/:nama", (request, response) => {
    let nama = request.params.nama;
    response.end("Student Name : " + nama);
});

app.post('/siswa', (request, response) => {
    let nama = request.body.nama;
    let alamat = request.body.alamat;
    response.end("Student Name : " + nama + '\r\nAlamat : ' + alamat);
});

app.delete("/std/:nama", (request, response) => {
    let nama = request.params.nama;
    response.end("Student Name : " + nama);
});

app.put('/siswa/:id', (req, res) => {
    let id = req.params.id;
    let nama = req.body.nama;
    let alamat = req.body.alamat;
    res.end("Update Data For\r\nId : " + id + "\r\nStudent Name : " + nama + '\r\nAlamat : ' + alamat);
});

app.listen("7000");