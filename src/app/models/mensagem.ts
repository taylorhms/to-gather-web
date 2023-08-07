import { Usuario } from "./usuario";

export interface Mensagem {
    conteudo: string;
    tipo: string;
    autor: Usuario;
    dataEnvio: string;
}