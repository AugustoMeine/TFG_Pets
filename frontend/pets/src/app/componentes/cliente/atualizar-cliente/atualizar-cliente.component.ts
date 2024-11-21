import { Component, EventEmitter, Output } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { NgFor } from '@angular/common';
import { Cliente } from '../../../models/Cliente.model';
import { FormsModule } from '@angular/forms';
import { Endereco } from '../../../models/Endereco.model';
import { EnderecoService } from '../../../services/endereco.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-atualizar-cliente',
  standalone: true,
  imports: [NgFor, FormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [ClienteService, provideNgxMask()],
  templateUrl: './atualizar-cliente.component.html',
  styleUrl: './atualizar-cliente.component.css'
})
export class AtualizarClienteComponent {
  @Output() trocarComponenteFilho = new EventEmitter<string>();

  clienteDadosTela: Cliente = new Cliente(0,"","","","","","",0,"");
  enderecoDadosTela: Endereco = new Endereco(0,"","","","","",0,"","");

  constructor(private clienteService: ClienteService, private enderecoService: EnderecoService){  
    this.carregarDados();
  }

  ngOnInit():void {       
  }

  ngAfterViewInit(): void {    
  }

  carregarDados(){
    if((localStorage.getItem("idCliente") == null) || (localStorage.getItem("idCliente") == "") || (localStorage.getItem("idCliente")) ){      
      this.trocarComponenteFilho.emit("Cliente");
    }

    let idCliente = Number(localStorage.getItem("idCliente"));
    console.log(localStorage.getItem("idCliente"))
    if (isNaN(idCliente) || idCliente <= 0) {
      this.trocarComponenteFilho.emit("Cliente");
    }

    this.clienteService.consultarCliente(idCliente).subscribe(
      {
        next:(data: Cliente)=>{
          if(data){
          this.clienteDadosTela = data;
          //Ajuste da data
          //let dataRecebida = this.clienteDadosTela.dataNascimento.split("-");
          //this.clienteDadosTela.dataNascimento = dataRecebida[2]+"/"+dataRecebida[1]+"/"+dataRecebida[0]       
          }else{
          console.log("Erro. Dados enviados, mas a operação não foi finalizada - Cliente");
          }                  
        },
        error:(erro: any)=>{
          console.log("Erro: ");
          console.log(erro);
        },
        complete: () => {
          console.log("Consulta de cliente concluída");
          this.enderecoService.consultarEndereco(this.clienteDadosTela.idEndereco).subscribe(
            {
              next:(data: Endereco)=>{
                if(data){
                this.enderecoDadosTela = data;
                }else{
                console.log("Erro. Dados enviados, mas a operação não foi finalizada - Endereco");
                }                  
              },
              error:(erro: any)=>{
                console.log("Erro: ");
                console.log(erro);
              },complete: () => {
                console.log("Consulta de endereco concluída");
              }
            }
          );
        }
      }
    );

    if((this.enderecoDadosTela.idEndereco == 0) || (this.clienteDadosTela.idCliente == 0)){
      this.trocarComponenteFilho.emit("Cliente");
    }

  }

  atualizarCliente(){

    this.enderecoService.atualizarEndereco(this.enderecoDadosTela).subscribe(
      {
        next:(data: Endereco)=>{
          if(data){
            this.clienteDadosTela.idEndereco = data.idEndereco;            
            console.log("Endereco atualizado com sucesso");
          }else{
            console.log("Erro: dados enviados, mas a operação não foi finalizada - Endereco");
          }                  
        },
        error:(erro: any)=>{
          console.log("Erro - Endereco: ");
          console.log(erro);
        },
        complete: () => {
          console.log("Atualização de endereço concluída");
          this.clienteService.atualizarCliente(this.clienteDadosTela).subscribe(
            {
              next:(data: Cliente)=>{
                if(data){
                  console.log("Cliente atualizado com sucesso");
                }else{
                  console.log("Erro: dados enviados, mas a operação não foi finalizada - Cliente");
                }                  
              },
              error:(erro: any)=>{
                console.log("Erro - Cliente: ");
                console.log(erro);
              },
              complete: () => {
                console.log("Atualização de cliente concluída");    
                this.trocarComponenteFilho.emit("Cliente");            
              }
            }
          );
        }
      }
    );
    
  }

  retornarTelaCliente(){
    this.trocarComponenteFilho.emit("Cliente");
  }

}
