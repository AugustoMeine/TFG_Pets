export class Cliente{
    idCliente:number;
    nome:string;
    dataNascimento:string;
    cpf:string;
    registroGeral:string;
    telefone:string;
    email:string;
    idEndereco:number;
    status:string;

  constructor(idCliente:number,nome:string,dataNascimento:string,cpf:string,registroGeral:string,telefone:string,email:string,idEndereco:number,status:string){
    this.idCliente = idCliente;
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.cpf = cpf;
    this.registroGeral = registroGeral;
    this.telefone = telefone;
    this.email = email;
    this.idEndereco = idEndereco;
    this.status = status;
  }

}
