export class Animal{
    idAnimal:number;
    nome:string;
    peso:number;
    raca:string;
    idade:number;
    sexo:string;
    status:string;


    constructor(idAnimal:number,nome:string,peso:number,raca:string,idade:number,sexo:string,status:string){
        this.idAnimal = idAnimal;
        this.nome = nome;
        this.peso = peso;
        this.raca = raca;
        this.idade = idade;
        this.sexo = sexo;
        this.status = status;
    }
}