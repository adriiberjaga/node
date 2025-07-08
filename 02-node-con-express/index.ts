import express from 'express';
import 'dotenv/config' 

console.log(process.env.PORT) 

const app = express();
const port = process.env.PORT || 2222; 
const users = [
  { id: 1, name: 'Ivan', email: 'ivan@example.com' },
  { id: 2, name: 'Andrea', email: 'andrea@example.com' },
];

app.get('/users', (_req, res) => {
  res.send(`Users: ${JSON.stringify(users)}`);
});
app.post('/users',(_req, res) =>{
  const lastId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;

  const newUser = {
  id: lastId + 1,
  name: 'NuevO',           
  email: 'nuevo@example.com'
};

})
app.use(/(.*)/, (req, res) => {
  res.status(404).send({ error: 'Error'})
})
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
