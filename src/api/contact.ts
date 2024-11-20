import express from 'express';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const app = express();
const pool = new Pool({
  user: 'neema',
  host: 'localhost',
  database: 'mockusersdb',
  password: 'neema',
  port: 5432,
});

app.use(express.json());

app.post('/api/users', async (req, res) => {
  const { name, email, phone, gender, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, phone, gender, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, phone, gender, hashedPassword]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
});
