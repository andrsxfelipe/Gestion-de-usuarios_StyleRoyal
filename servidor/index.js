import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'idQ6kwx+',
    database: 'SR_Database1'
});

connection.connect(err => {
    if (err) {
        console.error('Hubo un error al conectarse con Mysql: ',err.message);
    } else {
        console.log('Conexion exitosa a Mysql')
    }
});

// Ruta get

app.get('/costumers', (req, res) => {
    connection.query('SELECT * FROM sr_costumers',(err,results) => {
        if (err) return res.status(500).json({error: err.message});
        res.json(results);
    });
});

app.get('/costumers/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM sr_costumers WHERE id_costumer = ?', [id], (err, results) => {
        if (err) return res.status(500).json({error: err.message});
        if (results.length === 0) return res.status(404).json({message: 'Usuario no encontrado'});
        res.json(results[0]);
    });
});

app.put('/costumers/:id', (req, res) => {
    const { id } = req.params;
    const { name, phone, address, status, note, city, main_language } = req.body;
    connection.query('UPDATE sr_costumers SET name = ?, phone = ?, address = ?, status = ?, note = ?, city = ?, main_language = ? WHERE id_costumer = ?', 
    [name, phone, address, status, note, city, main_language, id], (err) => {
        if (err) return res.status(500).json({error: err.message});
        res.json({message: 'Usuario actualizado correctamente'});
    });
});

app.post('/costumers', (req, res) => {
    const { name, phone, address, status, note, city, main_language } = req.body;
    connection.query('INSERT INTO sr_costumers (name, phone, address, status, note, city, main_language) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [name, phone, address, status, note, city, main_language], (err, results) => {
        if (err) return res.status(500).json({error: err.message});
        res.status(201).json({message: 'Usuario creado correctamente', id: results.insertId});
    });
});

app.listen(PORT, () => {console.log(`Servidor corriendo en http://localhost:${PORT}`)});