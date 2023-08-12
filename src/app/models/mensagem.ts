import { Usuario } from "./usuario";

export interface Mensagem {
    conteudo: string;
    tipo: string;
    dataEnvio: string;
    loginAutor: string;
    autor?: Usuario;
}