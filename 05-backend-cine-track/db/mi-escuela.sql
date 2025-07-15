-- Borrar tablas si existen
DROP TABLE IF EXISTS students;

DROP TABLE IF EXISTS teachers;

DROP TABLE IF EXISTS courses;

-- Crear tabla de estudiantes
CREATE TABLE IF NOT EXISTS students (
    student_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de profesores
CREATE TABLE IF NOT EXISTS teachers (
    teacher_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    salary INTEGER NOT NULL
);

-- Crear tabla de cursos
CREATE TABLE IF NOT EXISTS courses (
    course_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    time TEXT NOT NULL
);

-- Insertar un profesor
INSERT INTO
    teachers (name, email, salary)
VALUES
    ('Adri', 'adri@gmail.com', 2000);

-- INSERTAR ALUMNOS
INSERT INTO
    students (name, email)
VALUES
    ('Sergio redondo', 'Sergio@gmail.com');

-- INSERTAR CURSOS
INSERT INTO
    courses (name, time)
VALUES
    ('Brazers course september', '6 months');

INSERT INTO
    courses (name, time)
VALUES
    ('Brazers course january', '8 months');