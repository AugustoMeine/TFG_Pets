import { Component, EventEmitter, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { AdicionarUsuarioComponent } from '../../usuario/adicionar-usuario/adicionar-usuario.component';
import { AnimalService } from '../../../services/animal.service';
import { AdicionarAnimalComponent } from '../adicionar-animal/adicionar-animal.component';
import { Animal } from '../../../models/Animal.model';
import { Cliente } from '../../../models/Cliente.model';
import { ListaClienteAnimal } from '../../../models/ListaClienteAnimal.model';
import { ListaclienteanimalService } from '../../../services/listaclienteanimal.service';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-animal',
  standalone: true,
  imports: [AdicionarAnimalComponent,NgFor,NgIf],
  providers: [AnimalService],
  templateUrl: './animal.component.html',
  styleUrl: './animal.component.css'
})
export class AnimalComponent {
  @Output() trocarComponenteFilho = new EventEmitter<string>();

  listaAnimais: Animal[] = [];
  listaClientes: Cliente[] = [];
  listaClienteAnimal: ListaClienteAnimal[] = [];

  constructor(private animalService: AnimalService,private listaClienteAnimalService: ListaclienteanimalService, private clienteService: ClienteService){

    this.animalService.consultarAnimais().subscribe(
      {
        next:(data: Animal[])=>{
          if(data){
            this.listaAnimais = data;  
            this.listaAnimais = this.listaAnimais.filter(animal => animal.status !== "Inativo");
          }else{
            console.log("Erro");
          }                  
        },
        error:(erro: any)=>{
          console.log("Erro: ");
          console.log(erro);
        },
        complete:()=>{
          console.log("Consulta de clientes finalizada");
          this.listaClienteAnimalService.consultarListaClienteAnimais().subscribe(
            {
              next:(data: ListaClienteAnimal[])=>{
                if(data){
                  this.listaClienteAnimal = data;
                }else{
                  console.log("Erro: os dados foram enviados, mas não foram recebidos");
                }                  
              },
              error:(erro: any)=>{
                console.log("Erro: ");
                console.log(erro);
              },
              complete:()=>{
                console.log("Consulta da lista dos clientes vinculados aos animais finalizada");
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
                        console.log("Erro: dados enviados, mas não recebidos");
                      }                  
                    },
                    error:(erro: any)=>{
                      console.log("Erro: ");
                      console.log(erro);
                    },
                  }
                );                  
              }
            }
          );
        }
      }
    );
  }

  // Função para obter as chaves do model para popular o cabeçalho da tabela
  getKeys(obj: any): string[] {
    //return (Object.keys(obj));
    return(["Nome","Peso","Raca","Idade","Sexo","Cliente","Editar","Desativar"]);
  }

  atualizarListaAnimals(){
    this.animalService.consultarAnimais().subscribe(
      {
        next:(data: Animal[])=>{
          if(data){
            this.listaAnimais = data;  
            this.listaAnimais = this.listaAnimais.filter(animal => animal.status !== "Inativo");          
          }else{
            console.log("Erro");
          }                  
        },
        error:(erro: any)=>{
          console.log("Erro: ");
          console.log(erro);
        },
        complete:()=>{
          console.log("Consulta de clientes finalizada");
          this.listaClienteAnimalService.consultarListaClienteAnimais().subscribe(
            {
              next:(data: ListaClienteAnimal[])=>{
                if(data){
                  this.listaClienteAnimal = data;
                }else{
                  console.log("Erro: os dados foram enviados, mas não foram recebidos");
                }                  
              },
              error:(erro: any)=>{
                console.log("Erro: ");
                console.log(erro);
              },
              complete:()=>{
                console.log("Consulta da lista dos clientes vinculados aos animais finalizada");
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
                        console.log("Erro: dados enviados, mas não recebidos");
                      }                  
                    },
                    error:(erro: any)=>{
                      console.log("Erro: ");
                      console.log(erro);
                    },
                  }
                );                  
              }
            }
          );
        }
      }
    );
  }

  adicionarAnimal(){
    this.trocarComponenteFilho.emit("AdicionarAnimal");    
  }

  atualizarAnimal(idAnimal: number){
    localStorage.removeItem("idAnimal");
    localStorage.setItem("idAnimal",idAnimal.toString());
    this.trocarComponenteFilho.emit("AtualizarAnimal");    
  }

  desligarAnimal(idAnimal: number){
    this.animalService.desligarAnimal(idAnimal).subscribe(
      {
        next:(data: Animal[])=>{
          if(data){
            this.atualizarListaAnimals();
          }else{
            console.log("Erro ao desligar o animal. Dados enviados, mas a operação não foi finalizada");
          }                  
        },
        error:(erro: any)=>{
          console.log("Erro: ");
          console.log(erro);
        },
        complete:()=>{
          console.log("Animal desligado com sucesso");
          this.atualizarListaAnimals();
        }
      }
    );  
  }

  getClienteNome(idAnimal: number){
    let clienteAnimal = this.listaClienteAnimal.find(lca => lca.idAnimal === idAnimal);
    if (clienteAnimal) {
      let cliente = this.listaClientes.find(cliente => cliente.idCliente === clienteAnimal.idCliente);
      return(cliente ? cliente.nome : "");
    }
    return "";
  }
}
