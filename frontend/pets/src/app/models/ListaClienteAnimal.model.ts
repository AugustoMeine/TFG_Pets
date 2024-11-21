export class ListaClienteAnimal{

    idListaClienteAnimal: number;
    idCliente: number;
    idAnimal: number;
    dataCriacao: string;

    constructor(idListaClienteAnimal: number,idCliente: number,idAnimal: number,dataCriacao: string){
        this.idListaClienteAnimal = idListaClienteAnimal;
        this.idCliente = idCliente;
        this.idAnimal = idAnimal;
        this.dataCriacao = dataCriacao;
    }
}