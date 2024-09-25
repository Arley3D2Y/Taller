import { Reactions } from "./Reactions";

export interface Post {
  id: number;               // ID único del post
  title: string;            // Título del post
  body: string;             // Cuerpo o contenido del post
  tags: string[];           // Etiquetas asociadas al post
  reactions: Reactions;     // Reacciones del post (me gusta y no me gusta)
  views: number;            // Cantidad de vistas del post
  userId: number;           // ID del usuario que creó el post
}