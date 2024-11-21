export class Endereco{
    idEndereco: number;
    cep: string;
    cidade: string;
    estado: string;
    bairro: string;
    rua: string;
    numero: number;
    complemento: string;
    status: string;

    constructor(idEndereco: number,cep: string,cidade: string,estado: string,bairro: string,rua: string,numero: number,complemento: string,status: string){
        this.idEndereco = idEndereco;
        this.cep = cep;
        this.cidade = cidade;
        this.estado = estado;
        this.bairro = bairro;
        this.rua = rua;
        this.numero = numero;
        this.complemento = complemento;
        this.status = status;
    }
}