#### LISTA DE PETICIONES PARA APP CINE TRACK

### USUARIOS

## GET /users/login

-Comprueba un usuario por su email y contraseña
-BODY: email, password
-HEADER: 'Content-type: application/json
-POST new user
-AUTENTICACION: NO

## POST /users/register

-Registra un nuevo usuario
-BODY: email, password, userName
-HEADER: 'Content-type: application/json
-AUTENTICACION: NO

## DELETE /users/userId

-Eliminar un usuario ya existente
-BODY: password
-HEADER: 'Content-type: application/json
-AUTENTICACION: SI

## Movies

- GET /movies/Watchlist
  -Obtiene la lista de peliculas que el usuario ha añadido
  -HEADER: 'Content-type: application/json
  -AUTENTICACION: SI

-POST /movies/watchlist
-Body: movieId
-HEADER: 'Content-type: application/json
-SEGURIDAD: Solo se pueden añadir peliculas los usuarios logged
-AUTENTICACION: SI
