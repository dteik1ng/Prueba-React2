const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

const app = express();
const PORT = 5002;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const config = {
  user: 'david',
  password: 'david123456',
  server: 'localhost',
  database: 'BD_formulario',
  port: 1433,
  options: {
    encrypt: false,
  },
};

sql.connect(config)
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });

app.get('/api/empleados', async (req, res) => {
  try {
    const result = await sql.query('SELECT id_empleado, nombre, email, sexo, id_area, boletin, descripcion FROM empleados');
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener la lista de empleados');
  }
});

app.get('/api/empleados/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sql.query`SELECT * FROM empleados WHERE id_empleado = ${id}`;
    res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el empleado');
  }
});

app.post('/api/empleados', async (req, res) => {
  const { nombre, email, sexo, id_area, descripcion, boletin } = req.body;
  try {
    const result = await sql.query(
      `INSERT INTO empleados (nombre, email, sexo, id_area, descripcion, boletin) VALUES 
      ('${nombre}', '${email}', '${sexo}', ${id_area}, '${descripcion}', ${boletin ? 1 : 0})`
    );
    res.json({ message: 'Empleado agregado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar un nuevo empleado');
  }
});

app.put('/api/empleados/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, sexo, id_area, descripcion, boletin } = req.body;
  try {
    await sql.query`
      UPDATE empleados
      SET nombre = ${nombre}, email = ${email}, sexo = ${sexo},
          id_area = ${id_area}, descripcion = ${descripcion}, boletin = ${boletin ? 1 : 0}
      WHERE id_empleado = ${id}
    `;
    res.json({ message: 'Empleado actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar el empleado');
  }
});

app.delete('/api/empleados/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sql.query`DELETE FROM empleados WHERE id_empleado = ${id}`;
    res.json({ message: 'Empleado eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el empleado');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo por el puerto: ${PORT}`);
});
