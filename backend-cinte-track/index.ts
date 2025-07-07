import express from 'express';
import chalk from 'chalk';
import { z } from 'zod';
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
app.use((req, res, next) => {
    const text = `Peticion: ${req.method} - ${req.url} - ${new Date().toLocaleString('es-ES')}`;
    console.log(chalk.blue(text));
    next();
})
app.use(express.json())

// ### USUARIOS

// ## GET /users/login

// -Comprueba un usuario por su email y contraseña
// -BODY: email, password
// -HEADER: 'Content-type: application/json
// -POST new user
// -AUTENTICACION: NO



// -Registra un nuevo usuario
app.post('/users/register', (req, res) => {
    const newUser = req.body;
    const result = registerSchema.safeParse(newUser)
    if (!result.success) {
        res.status(400).json({
  message: "Error de validación",
  errors: result.error.flatten().fieldErrors
});

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})