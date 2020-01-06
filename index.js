const expr = require("express");
const app = expr();

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

app.listen("7000");
