export class ListaMedicamentoProntuario{

    idListaMedicamentoProntuario:number;
    idMedicamento:number;
    idProntuario:number;
    dataCriacao:string;

    constructor(idListaMedicamentoProntuario:number,idMedicamento:number,idProntuario:number,dataCriacao:string){
        this.idListaMedicamentoProntuario = idListaMedicamentoProntuario;
        this.idMedicamento = idMedicamento;
        this.idProntuario = idProntuario;
        this.dataCriacao = dataCriacao;
    }
}