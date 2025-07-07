import express, { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import { z } from 'zod';
import logger from './middlewares/logger.js';
import HTTPError from './models/HTTPError.js';
interface User {
    email: string;
    password: string;
    userName: string;
}
const loginSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email requerido'),
  password: z.string().min(1, 'Password requerido'),
});
const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, 'Username is required')
      .min(3, 'At least 3 characters long')
      .max(20, 'Maximum 20 characters long'),
    email: z
      .string()
      .email('Email is required')
      .min(1, 'Email is required')
      .max(100, 'Maximum 100 characters long'),
    password: z
      .string()
      .min(1, 'Password is required')
      .regex(/^[a-zA-Z0-9]{8,16}$/, 'Password must be 8-16 characters long'),
    confirmPassword: z.string().min(1, 'You need to complete the password'),
  })



const app = express();
app.use(logger)
app.use(express.json())

// ### USUARIOS

// ## GET /users/login

// -Comprueba un usuario por su email y contraseña
// -BODY: email, password
// -HEADER: 'Content-type: application/json
// -POST new user
// -AUTENTICACION: NO


// usuarios harcodeados
const users = [
    {
        email: 'user@example.com',
        password: '12345678k',
        userName: 'megauser3000',
        id: 1
    },
    {
        email: 'admin@example.com',
        password: '12345678k',
        userName: 'admin5000',
        id: 2
    },
    {
        email: 'adri@gmail.com',
        password: '12345678k',
        userName: 'adriiberjaga',
        id: 3
    }
]
// -Registra un nuevo usuario
app.post('/users/register', (req, res) => {
    const newUser = req.body;
    if (users.find(user => user.email === newUser.email)) {
        throw new HTTPError(400, 'Usuario ya existente');
    }
    const result = registerSchema.safeParse(newUser)
    if (!result.success) {
        throw new HTTPError(400, 'Error de validación');
    } else {
        console.log(`Usuario creado: ${newUser.username}`);
        res.send('Usuario registrado');
    }
})
// INICIAR SESSION
app.post('/users/login',(req, res) => {
    const { email, password } = req.body;
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
        res.status(400).json({ message: result.error.message });
        return;
    } else {
        res.status(200).json({ message: 'Usuario encontrado' });
        return;
    }
})
app.delete('users/:userId', (req, res) => {
    const { password } = req.body;
    const userId = req.params.userId;
    if (password === '12345678k') {
        res.status(200).json({ message: 'Usuario eliminado' });
        return;
    } else {
        res.status(400).json({ message: 'Contraseña incorrecta' });
        return;
    }
})

app.get('/movies/watchlist/:movieId', (req, res) => {
    const movieId = req.params.movieId;
    if (movieId === '1') {
        res.send('Movie 1 en la lista de peliculas que el usuario ha añadido');
    } else {
        res.send('Pelicula no encontrada');
    }
})
app.use((error: Error | HTTPError, req: Request, res: Response, next: NextFunction) => {
    console.log('❌', error.message) 
    if(error instanceof HTTPError){
        res.status(error.status).send({error: error.message});
        return
    } 
    res.status(500).send({error: 'Internal Server Error'});
});

//* Middleware RUTA NO ENCONTRADA
app.use(/(.*)/, (req, res) => {
  res.status(404).send({ error: 'Ruta no establecida' });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})