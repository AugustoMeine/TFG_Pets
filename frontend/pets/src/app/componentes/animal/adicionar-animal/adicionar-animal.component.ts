import { Component, EventEmitter, Output } from '@angular/core';
import { AnimalService } from '../../../services/animal.service';
import { NgFor } from '@angular/common';
import { Animal } from '../../../models/Animal.model';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { Cliente } from '../../../models/Cliente.model';
import { ClienteService } from '../../../services/cliente.service';
import { ListaClienteAnimal } from '../../../models/ListaClienteAnimal.model';
import { ListaclienteanimalService } from '../../../services/listaclienteanimal.service';

@Component({
  selector: 'app-adicionar-animal',
  standalone: true,
  imports: [NgFor, FormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [AnimalService, ClienteService, ListaclienteanimalService, provideNgxMask()],
  templateUrl: './adicionar-animal.component.html',
  styleUrl: './adicionar-animal.component.css'
})
export class AdicionarAnimalComponent {
  @Output() trocarComponenteFilho = new EventEmitter<string>();
  
  animalDadosTela: Animal;
  listaRacas: string[];
  listaCliente: Cliente[] = [];
  listaClienteAnimal: ListaClienteAnimal;

  constructor(private animalService: AnimalService, private clienteService: ClienteService, private listaClienteAnimalService: ListaclienteanimalService) {  
    this.animalDadosTela = new Animal(0,"",0,"",0,"","");    
    this.listaClienteAnimal = new ListaClienteAnimal(0,0,0,"");
    this.listaRacas = [
      "-","Labrador Retriever", "Poodle", "Bulldog Francês", "Beagle", "Rottweiler", "Pastor Alemão", 
      "Dachshund", "Yorkshire Terrier", "Boxer", "Shih Tzu", "Golden Retriever", "Cocker Spaniel", 
      "Chihuahua", "Doberman", "Siberian Husky", "Maltês", "Bichon Frisé", "Pug", 
      "Staffordshire Bull Terrier", "Basenji", "Siamês", "Persa", "Maine Coon", "Ragdoll", 
      "Bengal", "Sphynx", "Abissínio", "Scottish Fold", "American Shorthair", "Birman", 
      "Burmese", "Devon Rex", "Cornish Rex", "Russian Blue", "British Shorthair", 
      "Norwegian Forest Cat", "Oriental Shorthair", "Savannah", "Himalayan", "Scottish Straight"
    ];

    this.clienteService.consultarClientes().subscribe(
      {
        next:(data:Cliente[]) =>{
          if(data){
            this.listaCliente = data;
            this.listaCliente = this.listaCliente.filter(cliente => cliente.status !== "Inativo");
          }else{
            console.log("Erro (consulta clientes): dados enviados, mas os dados não foram retornados");
          }          
        },
        error: (erro: any) => {
          console.log("Erro: ");
          console.log(erro);
        },
        complete:() =>{
          console.log("Clientes consultados com sucesso"); 
        }
      }
    );
    
  }

  ngOnInit(): void {    
  }

  adicionarAnimal(){    

    //O cliente não foi selecionado, sendo possível alterar posteriormente
    if(this.listaClienteAnimal.idCliente === 0){
      this.animalService.salvarAnimal(this.animalDadosTela).subscribe(
        {
          next: (data: Animal) => {
            if(data){
              this.retornarTelaAnimal();            
            } else {
              console.log("Erro: dados enviados, mas a operação não foi finalizada");
            }                  
          },
          error: (erro: any) => {
            console.log("Erro: ");
            console.log(erro);
          },
          complete: () => {
            console.log("Animal adicionado com sucesso");                     
          }
        }
      );
    }
    else{
      this.animalService.salvarAnimal(this.animalDadosTela).subscribe(
        {
          next: (data: Animal) => {
            if(data){
              this.animalDadosTela = data;
            } else {
              console.log("Erro: dados enviados, mas a operação não foi finalizada");
            }                  
          },
          error: (erro: any) => {
            console.log("Erro: ");
            console.log(erro);
          },
          complete: () => {
            console.log("Animal adicionado com sucesso"); 
            this.listaClienteAnimal.idAnimal = this.animalDadosTela.idAnimal;
            this.listaClienteAnimalService.salvarListaClienteAnimal(this.listaClienteAnimal).subscribe(
              {
                next: (data: ListaClienteAnimal) => {
                  if(data){
                    this.retornarTelaAnimal();            
                  } else {
                    console.log("Erro: dados enviados, mas a operação não foi finalizada");
                  }                  
                },
                error: (erro: any) => {
                  console.log("Erro: ");
                  console.log(erro);
                },
                complete: () => {
                  console.log("Vinculodo do cliente/animal adicionado com sucesso");                     
                }
              }
            );                      
          }
        }
      );
    }
    
  }

  retornarTelaAnimal(){
    this.trocarComponenteFilho.emit("Animal");
  }
}
