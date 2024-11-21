export class Prontuario{
    idProntuario: number;
    idAnimal: number;
    dataCriacao: string;
    temperatura: number;
    frequenciaCardiaca: number;
    sintomas: string;
    diagnosticoProvavel: string;
    diagnosticoDefinitivo: string;
    status: string;

    constructor(idProntuario: number,idAnimal: number,dataCriacao: string,temperatura: number,frequenciaCardiaca: number,sintomas: string,diagnosticoProvavel: string,diagnosticoDefinitivo: string,status: string){
            this.idProntuario = idProntuario;
            this.idAnimal = idAnimal;
            this.dataCriacao = dataCriacao;
            this.temperatura = temperatura;
            this.frequenciaCardiaca = frequenciaCardiaca;
            this.sintomas = sintomas;
            this.diagnosticoProvavel = diagnosticoProvavel;
            this.diagnosticoDefinitivo = diagnosticoDefinitivo;
            this.status = status;
    }
}