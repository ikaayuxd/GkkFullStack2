import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_user',
  password: 'your_password',
  database: 'gkkweb'
});

db.connect(err => {
  if (err) console.error('Database connection failed:', err);
  else console.log('Connected to MySQL database');
});

// API Endpoints
app.get('/api/products/:category', (req, res) => {
  db.query('SELECT * FROM products WHERE category = ?', [req.params.category], (err, result) => {
    if (err) res.status(500).send(err);
    else res.send(result);
  });
});

app.post('/api/products', (req, res) => {
  const { name, category, price } = req.body;
  db.query('INSERT INTO products (category, name, price) VALUES (?, ?, ?)', [category, name, price], err => {
    if (err) res.status(500).send(err);
    else res.send({ message: 'Product added successfully' });
  });
});

app.delete('/api/products/:id', (req, res) => {
  db.query('DELETE FROM products WHERE id = ?', [req.params.id], err => {
    if (err) res.status(500).send(err);
    else res.send({ message: 'Product deleted successfully' });
  });
});

// Default Route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Launch
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
