import express, { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import logger from './middlewares/logger.js';
import HTTPError from './models/HTTPError.js';
import { loginSchema, registerSchema } from './schemas/formSchemas.js';
import { z } from 'zod/v4';

interface User {
    email: string;
    password: string;
    userName: string;
    id: number;
}



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
const users: User[] = [
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

// OBTENER USUARIO
app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId
    const userIdToNumber = Number(userId)
    const user = users.map((user) => {

    })
    if (userIdToNumber === 1 ) {
        res.send('Tu usuario es', )
    }
})


// -REGISTRAR USUARIO
app.post('/users/register', (req, res) => {
    const newUser = req.body;

    const { success, data: validatedUser, error } = registerSchema.safeParse(newUser)
    if (!success) {
        console.log(z.prettifyError(error));
        throw new HTTPError(400, 'Error de validación');
    }


    const userByEmail = users.find(user => user.email === validatedUser.email)
    const userByUsername = users.find(user => user.userName === validatedUser.username)
    if (userByEmail) {
        throw new HTTPError(400, 'Usuario ya registrado con ese email');
    }
    if (userByUsername) {
        throw new HTTPError(400, 'Usuario ya registrado con ese username');
    }
    
    console.log(`Usuario creado: ${validatedUser.username}`);
    res.send('Usuario registrado');
    
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
// Eliminar usuario
app.delete('/users/:userId', (req, res) => {
    const { password, userName } = req.body;
    const userId = Number(req.params.userId);

    // Buscamos al usuario por ID
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return
    }

    const user = users[userIndex];

    // Verificar si el nombre de usuario y la contraseña coinciden
    if (user.userName !== userName) {
         res.status(400).json({ message: 'Nombre de usuario incorrecto' });
         return
    }

    if (user.password !== password) {
         res.status(400).json({ message: 'Contraseña incorrecta' });
         return
    }

    // Eliminar al usuario
    users.splice(userIndex, 1);

     res.status(200).json({ message: 'Usuario eliminado correctamente' });
     return
});


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