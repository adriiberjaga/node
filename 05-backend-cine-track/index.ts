import express, { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import logger from './middlewares/logger.js';
import HTTPError from './models/HTTPError.js';
import { loginSchema, registerSchema } from './schemas/formSchemas.js';
import { z } from 'zod/v4';
import cors from 'cors';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface User {
    email: string;
    password: string;
    username: string;
    id: number;
}



const app = express();
app.use(cors());

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
        username: 'megauser3000',
        id: 1
    },
    {
        email: 'admin@example.com',
        password: '12345678k',
        username: 'admin5000',
        id: 2
    },
    {
        email: 'adri@gmail.com',
        password: '12345678',
        username: 'adriiberjaga',
        id: 3
    }
]

// OBTENER USUARIO
app.get('/users/:userId', (req, res) => {
    // const { username, email} = req.body NO NECESARIO
    const userId = Number(req.params.userId)
    if(isNaN(userId)) {
        throw new HTTPError(404, 'Usuario no encontrado, ID invalido')
    }
    const user = users.find(u => u.id === userId);

    if(!user) {
        throw new HTTPError(400, 'Usuario no encontrado(no hay un user con ese ID)')
    }

    res.status(200).json({
        id: user.id,
        email: user.email,
        username: user.username,
        password: user.password
    })
    console.log(`Bienvenido de nuevo ${user.username}`) 

    
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
    const userByUsername = users.find(user => user.username === validatedUser.username)
    if (userByEmail) {
        throw new HTTPError(400, 'Usuario ya registrado con ese email');
    }
    if (userByUsername) {
        throw new HTTPError(400, 'Usuario ya registrado con ese username');
    }
    const encriptedPassword = bcrypt.hashSync(validatedUser.password, 10)
    console.log(encriptedPassword) 
    
    const newUserHassed = {
        id: users.length + 1,
        username: validatedUser.username,
        email: validatedUser.email,
        password: encriptedPassword,
    };
    users.push(newUserHassed)
    console.log(`✅ Usuario creado: ${newUserHassed.username}`);

 const {password, ...newUserWhithoutPassword} = newUserHassed //todo menos password
  // Devuelve JSON AL USER SIN LA CONTRASEÑA:
   res.status(201).json({
    message: 'Usuario registrado correctamente',
    data: newUserWhithoutPassword
  });
  console.log(newUserWhithoutPassword) 
})


// INICIAR SESSION
app.post('/users/login', (req, res) => {
    const user = req.body
    const { email, password } = loginSchema.parse(user)

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
        res.status(400).json({ message: result.error.message });
        return;
    } 

    const userFound = users.find(u => u.email === email)
    if(!userFound) {
        throw new HTTPError(401, 'Usuario y/o contraseñas incorrectas EMAIL')
    }

    const passwordMatch = bcrypt.compareSync(password, userFound.password)
    console.log(passwordMatch) 
    if(!passwordMatch) {
        throw new HTTPError(401, 'Usuario y/o contraseñas incorrectas PASSWORD')
    }

    const tokenData = { id: userFound.id, username: userFound.username};
    console.log('TokenData: ',tokenData) 

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
        expiresIn: '1h'
    })

res.status(200).send({
  message: `Usuario ${result.data.email} encontrado, entrando a tu cuenta...`,
  data: token,
  user: {
    email: result.data.email,
    username: userFound.username
  }
});
    console.log(`${result.data.email}  - TOKEN:    ${token}`);

    
});



// Eliminar usuario
app.delete('/users/:userId', (req, res) => {
    const { password, username } = req.body;
    const userId = Number(req.params.userId);

    // Buscamos al usuario por ID
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return
    }

    const user = users[userIndex];

    // Verificar si el nombre de usuario y la contraseña coinciden
    if (user.username !== username) {
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

// AÑADIR PELICULAS

// app.post('/')


//* Middleware ERRORS

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