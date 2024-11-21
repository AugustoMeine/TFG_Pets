import { Component, EventEmitter, Output } from '@angular/core';
import { AdicionarClienteComponent } from '../adicionar-cliente/adicionar-cliente.component';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/Cliente.model';
import { NgFor, NgIf } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [AdicionarClienteComponent, NgFor, NgIf,NgxMaskDirective, NgxMaskPipe],
  providers: [ClienteService, provideNgxMask()],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  @Output() trocarComponenteFilho = new EventEmitter<string>();

  listaClientes: Cliente[] = [];
  constructor(private clienteService: ClienteService){

    this.clienteService.consultarClientes().subscribe(
      {
        next:(data: Cliente[])=>{
          if(data){
            this.listaClientes = data;            
            for(let i = 0; i < this.listaClientes.length;i++){
              //Ajuste da data
              let dataRecebida = this.listaClientes[i].dataNascimento.split("-");
              this.listaClientes[i].dataNascimento = dataRecebida[2]+"/"+dataRecebida[1]+"/"+dataRecebida[0]
            }

            this.listaClientes = this.listaClientes.filter(cliente => cliente.status !== "Inativo");
          }else{
            console.log("Erro");
          }                  
        },
        error:(erro: any)=>{
          console.log("Erro: ");
          console.log(erro);
        },       
      }
    );
  }

  // Função para obter as chaves do model para popular o cabeçalho da tabela
  getKeys(obj: any): string[] {
    //return (Object.keys(obj));
    return(["Nome","Data de Nascimento","CPF","Registro Geral","Telefone","E-mail","whatsapp","Editar","Desativar"]);
  }

  atualizarListaClientes(){
    this.clienteService.consultarClientes().subscribe(
      {
        next:(data: Cliente[])=>{
          if(data){
            this.listaClientes = data;
            for(let i = 0; i < this.listaClientes.length;i++){
              //Ajuste da data
              let dataRecebida = this.listaClientes[i].dataNascimento.split("-");
              this.listaClientes[i].dataNascimento = dataRecebida[2]+"/"+dataRecebida[1]+"/"+dataRecebida[0]
            }
            this.listaClientes = this.listaClientes.filter(cliente => cliente.status !== "Inativo");
          }else{
            console.log("Erro");
          }                  
        },
        error:(erro: any)=>{
          console.log("Erro: ");
          console.log(erro);
        }
      }
    );
  }

  adicionarCliente(){
    this.trocarComponenteFilho.emit("AdicionarCliente");    
  }

  atualizarCliente(idCliente: number){
    localStorage.removeItem("idCliente");
    localStorage.setItem("idCliente",idCliente.toString());
    this.trocarComponenteFilho.emit("AtualizarCliente");    
  }

  desligarCliente(idCliente: number){
    this.clienteService.desligarCliente(idCliente).subscribe(
      {
        next:(data: Cliente[])=>{
          if(data){
            this.atualizarListaClientes();
          }else{
            console.log("Erro ao desligar o cliente. Dados enviados, mas a operação não foi finalizada");
          }                  
        },
        error:(erro: any)=>{
          console.log("Erro: ");
          console.log(erro);
        },
        complete:()=>{
          console.log("Cliente desligado com sucesso");
          this.atualizarListaClientes();
        }
      }
    );  
  }

  enviarMensagemWhatsApp(whatsapp: string){
    console.log("Enviando mensagem para o WhatsApp: "+ whatsapp);
    const apiDoWhatsApp = 'https://wa.me/' + whatsapp;
    window.open(apiDoWhatsApp, '_blank');
  }

}