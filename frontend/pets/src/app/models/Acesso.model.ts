export class Acesso {
    idAcesso: number;
    idUsuario: number;
    acessoAdministrador: string;
    acessoMedicoVeterinario: string;
    acessoAtendente: string;

    constructor(idAcesso: number,idUsuario: number,acessoAdministrador: string,acessoMedicoVeterinario: string,acessoAtendente: string) {
        this.idAcesso = idAcesso;
        this.idUsuario = idUsuario;
        this.acessoAdministrador = acessoAdministrador;
        this.acessoMedicoVeterinario = acessoMedicoVeterinario;
        this.acessoAtendente = acessoAtendente;
    }
}