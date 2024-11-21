import { Component, EventEmitter, Output } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { NgFor } from '@angular/common';
import { Cliente } from '../../../models/Cliente.model';
import { FormsModule } from '@angular/forms';
import { Endereco } from '../../../models/Endereco.model';
import { EnderecoService } from '../../../services/endereco.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-adicionar-cliente',
  standalone: true,
  imports: [NgFor, FormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [ClienteService, provideNgxMask()],
  templateUrl: './adicionar-cliente.component.html',
  styleUrl: './adicionar-cliente.component.css'
})
export class AdicionarClienteComponent {
  @Output() trocarComponenteFilho = new EventEmitter<string>();

  clienteDadosTela: Cliente;
  enderecoDadosTela: Endereco;

  constructor(private clienteService: ClienteService, private enderecoService: EnderecoService){  
    this.clienteDadosTela = new Cliente(0,"","","","","","",0,"");    
    this.enderecoDadosTela = new Endereco(0,"","","","","",0,"","");
  }

  ngOnInit():void {   
    
  }

  adicionarCliente(){

    this.enderecoService.salvarEndereco(this.enderecoDadosTela).subscribe(
      {
        next:(data: Endereco)=>{
          if(data){
            this.clienteDadosTela.idEndereco = data.idEndereco;            
          }else{
            console.log("Erro: dados enviados, mas a operação não foi finalizada");
          }                  
        },
        error:(erro: any)=>{
          console.log("Erro: ");
          console.log(erro);
        },
        complete:()=>{
          console.log("Endereco adicionado com sucesso");
          this.clienteService.salvarCliente(this.clienteDadosTela).subscribe(
            {
              next:(data: Cliente)=>{
                if(data){
                  this.retornarTelaCliente();
                }else{
                  console.log("Erro: dados enviados, mas a operação não foi finalizada");
                }                  
              },
              error:(erro: any)=>{                
                console.log("Erro:");
                console.log(erro);
              },
              complete:()=>{
                console.log("Cliente adicionado com sucesso");
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