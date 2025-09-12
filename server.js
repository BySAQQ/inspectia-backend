const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());


let inspecciones = [];
let usuarios = [{ username: "admin", password: "1234" }];

// 🔑 Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = usuarios.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.json({ success: true, token: "fake-jwt-token" });
  } else {
    res.status(401).json({ success: false, message: "Credenciales inválidas" });
  }
});


app.post("/inspecciones", (req, res) => {
  const { nombreSoftware, descripcion } = req.body;

  const nuevaInspeccion = {
    id: inspecciones.length + 1,
    nombreSoftware,
    descripcion,
    resultado: "Auditoría exitosa ✅", // Mock IA
    fecha: new Date().toISOString(),
  };

  inspecciones.push(nuevaInspeccion);
  res.json(nuevaInspeccion);
});


app.get("/inspecciones", (req, res) => {
  res.json(inspecciones);
});

// Servidor
app.listen(PORT, () => {
  console.log(`✅ Backend escuchando en http://localhost:${PORT}`);
});
