#### LISTA DE PETICIONES PARA APP CINE TRACK

### USUARIOS

## POST /users/login // PARA HACER LOGIN

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

-DELETE /movies/watchlist/movieId
-Eliminar una pelicula de la lista de peliculas que el usuario ha añadido
-BODY: movieId
-AUTENTICACION: SI

- GET /movies/Watched
  -Obtiene la lista de peliculas que el usuario ha visto
  -AUTENTICACION: SI
  -BODY: movieId
  -SEGURIDAD: Solo se pueden añadir peliculas los usuarios logged

- POST /movies/watched
  -BODY: movieId
  -HEADER: 'Content-type: application/json
  -AUTENTICACION: SI
