# 🌾 GKKWEB Full Stack System

A unified agricultural product management web application built using Node.js, Express, and MySQL.

## Setup
1. Create database `gkkweb` in MySQL.
2. Create table:
   CREATE TABLE products (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100),
     category VARCHAR(50),
     price DECIMAL(10,2)
   );
3. Update `config/db.config.js` with your credentials.
4. Run:
   npm install
   npm start

Frontend: http://localhost:3000  
Admin panel: http://localhost:3000/adminkg.html
