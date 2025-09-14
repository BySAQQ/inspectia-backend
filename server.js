const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());


let inspecciones = [];
let usuarios = [
  { username: "admin", password: "1234", role: "admin" },
  { username: "user", password: "4567", role: "user" }
];

//Registro
app.post("/register", (req, res) => {
  const { username, password, role } = req.body;
  const userExists = usuarios.some((u) => u.username === username);
  if (userExists) {
    return res.status(400).json({ success: false, message: "Usuario ya existe" });
  }
  const user = { id: Date.now(), username, password, role: role || 'user' };
  usuarios.push(user);

  res.json({ success: true, user, message: "Registro exitoso" });
});

//Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = usuarios.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.json({
      success: true,
      token: "fake-jwt-token" + Date.now(),
      role: user.role
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Credenciales inválidas"
    });
  }
});

app.get("/usuarios", (req, res) => {
  res.json(usuarios.map(u => ({ id: u.id, username: u.username, role: u.role })));
});

app.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;

  const user = users.find(u => u.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ success: false, message: "Usuario no encontrado" });
  }
  user.role = role || user.role;
  res.json({ success: true, user, message: "Perfil actualizado" });
});


app.get("/inspecciones", (req, res) => {
  res.json(inspecciones);
});

app.post("/inspecciones", (req, res) => {
  const { nombreSoftware, descripcion } = req.body;

  const nuevaInspeccion = {
    id: inspecciones.length + 1,
    nombreSoftware,
    descripcion,
    resultado: "Auditoría exitosa", // Mock IA
    fecha: new Date().toISOString(),
  };

  inspecciones.push(nuevaInspeccion);
  res.json(nuevaInspeccion);
});

app.delete('/inspecciones/:id', (req, res) => {
  const { id } = req.params;
  const index = inspecciones.findIndex(i => i.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Inspección no encontrada' });
  }

  inspecciones.splice(index, 1);
  res.json({ message: 'Inspección eliminada correctamente' });
});

// Servidor
app.listen(PORT, () => {
  console.log(`✅ Backend escuchando en http://localhost:${PORT}`);
});

//IA con C#
const axios = require("axios");

app.post("/inspecciones-ia", async (req, res) => {
  try {
    const { nombreSoftware, descripcion } = req.body;

    // Llamada a la API de IA en C#
    const response = await axios.post("http://localhost:5169/analizar", {
      nombreSoftware,
      descripcion,
    });

    const nuevaInspeccion = {
      id: inspecciones.length + 1,
      nombreSoftware,
      descripcion,
      resultado: response.data.resultado, //resultado de la IA
      fecha: new Date().toISOString(),
    };

    inspecciones.push(nuevaInspeccion);
    res.json(nuevaInspeccion);
  } catch (error) {
    console.error("Error al llamar a la API de IA:", error);
    res.status(500).json({ success: false, message: "Error en la auditoría" });
  }
});


