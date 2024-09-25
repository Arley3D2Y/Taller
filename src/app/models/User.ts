export interface User {
    id: number; // Identificador único del usuario
    firstName: string; // Nombre del usuario
    lastName: string; // Apellido del usuario
    image: string;
    age: number; // Edad del usuario
    gender: string; // Género del usuario
    email: string; // Correo electrónico del usuario
    phone: string; // Número de teléfono del usuario
    username: string; // Nombre de usuario
    birthDate: string; // Fecha de nacimiento en formato ISO
    university: string; // Universidad a la que asiste o asistió
}