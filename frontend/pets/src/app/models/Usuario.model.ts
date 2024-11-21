export class Usuario{
    idUsuario:number;
    nome:string;
    email:string;
    senha:string;
    dataCriacao:string;
    dataEncerramento:string;
    status: string;


  constructor(idUsuario:number,nome:string,email:string,senha:string,dataCriacao:string,dataEncerramento:string,status: string){
    this.idUsuario = idUsuario;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.dataCriacao = dataCriacao;
    this.dataEncerramento = dataEncerramento;
    this.status = status;
  }

}
