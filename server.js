import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_user',
  password: 'your_password',
  database: 'gkkweb'
});
db.connect(err => {
  if (err) console.error('Database Error: ', err);
  else console.log('MySQL Connected');
});

// API Endpoints
app.get('/api/products/:category', (req, res) => {
  const category = req.params.category;
  db.query('SELECT * FROM products WHERE category = ?', [category], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

app.post('/api/products', (req, res) => {
  const { name, category, price } = req.body;
  db.query('INSERT INTO products (name, category, price) VALUES (?, ?, ?)',
    [name, category, price],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send({ message: 'Product added' });
    });
});

app.delete('/api/products/:id', (req, res) => {
  db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Product deleted' });
  });
});

// Serve main pages
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port', PORT));
