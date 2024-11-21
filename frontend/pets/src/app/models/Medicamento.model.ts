export class Medicamento{
    idMedicamento:number;
    nome:string;
    principioAtivo:string;
    fabricante:string;
    status:string;

    constructor(idMedicamento:number,nome:string,principioAtivo:string,fabricante:string,status:string){
        this.idMedicamento = idMedicamento;
        this.nome = nome;
        this.principioAtivo = principioAtivo;
        this.fabricante = fabricante;
        this.status = status;
    }
}