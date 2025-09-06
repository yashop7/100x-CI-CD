import express from 'express';
import { client } from '@repo/db/client';


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from the HTTP server!');
});

app.get('/signup', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }
  const user = await client.user.create({
    data: {
      username,
      password,
    },
  });

  res.json({
    id: user.id,
    message: 'User created successfully'
  });
});

app.listen(PORT, () => {
  console.log(`HTTP server is running on http://localhost:${PORT}`);
});