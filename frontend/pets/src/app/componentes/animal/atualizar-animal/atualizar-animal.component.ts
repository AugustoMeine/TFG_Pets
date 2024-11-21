import { Component, EventEmitter, Output } from '@angular/core';
import { AnimalService } from '../../../services/animal.service';
import { NgFor } from '@angular/common';
import { Animal } from '../../../models/Animal.model';
import { FormsModule } from '@angular/forms';
import { Endereco } from '../../../models/Endereco.model';
import { EnderecoService } from '../../../services/endereco.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ListaClienteAnimal } from '../../../models/ListaClienteAnimal.model';
import { ListaclienteanimalService } from '../../../services/listaclienteanimal.service';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/Cliente.model';

@Component({
  selector: 'app-atualizar-animal',
  standalone: true,
  imports: [NgFor, FormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [AnimalService, ClienteService, ListaclienteanimalService, provideNgxMask()],
  templateUrl: './atualizar-animal.component.html',
  styleUrl: './atualizar-animal.component.css'
})
export class AtualizarAnimalComponent {
  @Output() trocarComponenteFilho = new EventEmitter<string>();
  
  animalDadosTela: Animal;
  listaRacas: string[];
  listaCliente: Cliente[] = [];
  listaClienteAnimal: ListaClienteAnimal;

  constructor(private animalService: AnimalService,private clienteService: ClienteService, private listaClienteAnimalService: ListaclienteanimalService){  
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
    this.carregarDados();
  }

  ngOnInit():void {       
  }

  ngAfterViewInit(): void {    
  }

  carregarDados(){
    if((localStorage.getItem("idAnimal") == null) || (localStorage.getItem("idAnimal") == "") || (localStorage.getItem("idAnimal")) ){      
      this.trocarComponenteFilho.emit("Animal");
    }

    let idAnimal = Number(localStorage.getItem("idAnimal"));
    console.log(localStorage.getItem("idAnimal"))
    if (isNaN(idAnimal) || idAnimal <= 0) {
      this.trocarComponenteFilho.emit("Animal");
    }

    this.animalService.consultarAnimal(idAnimal).subscribe(
      {
        next:(data: Animal)=>{
          if(data){
          this.animalDadosTela = data;       
          }else{
          console.log("Erro. Dados enviados, mas a operação não foi finalizada - Animal");
          }                  
        },
        error:(erro: any)=>{
          console.log("Erro: ");
          console.log(erro);
        },
        complete: () => {
          console.log("Consulta de animal concluída");   
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
                this.listaClienteAnimalService.consultarListaClienteAnimal(idAnimal).subscribe(
                  {
                    next:(data:ListaClienteAnimal)=>{
                      if(data){
                        this.listaClienteAnimal = data;
                      }else{
                        this.listaClienteAnimal.idListaClienteAnimal = 0;
                      }                  
                    },
                    error:(erro: any)=>{
                      console.log("Erro: ");
                      console.log(erro);
                    },
                    complete:()=>{
                      console.log("Consulta da lista de clientes/animais finalizada");
                    }
                  }
                );
              }
            }
          );
        }
      }
    );


  }

  atualizarAnimal(){
    //animal não possui vinculo com nenhum cliente e não foi definido cliente para o animal
    if((this.listaClienteAnimal.idListaClienteAnimal === 0) && (this.listaClienteAnimal.idCliente === 0)){
      this.animalService.atualizarAnimal(this.animalDadosTela).subscribe(
        {
          next:(data: Animal)=>{
            if(data){
              console.log("Animal atualizado com sucesso");
            }else{
              console.log("Erro: dados enviados, mas a operação não foi finalizada - Animal");
            }                  
          },
          error:(erro: any)=>{
            console.log("Erro - Animal: ");
            console.log(erro);
          },
          complete: () => {
            console.log("Atualização de animal concluída");    
            this.listaClienteAnimal.idAnimal = this.animalDadosTela.idAnimal;                                   
          }
        }
      );
    }
    //O animal ainda não possui o vinculo com o cliente, sendo necessário cadastrar
    else if((this.listaClienteAnimal.idListaClienteAnimal === 0) && (this.listaClienteAnimal.idCliente !== 0)){
      this.animalService.atualizarAnimal(this.animalDadosTela).subscribe(
        {
          next:(data: Animal)=>{
            if(data){
              console.log("Animal atualizado com sucesso");
            }else{
              console.log("Erro: dados enviados, mas a operação não foi finalizada - Animal");
            }                  
          },
          error:(erro: any)=>{
            console.log("Erro - Animal: ");
            console.log(erro);
          },
          complete: () => {
            console.log("Atualização de animal concluída");    
            this.listaClienteAnimal.idAnimal = this.animalDadosTela.idAnimal;
            this.listaClienteAnimalService.salvarListaClienteAnimal(this.listaClienteAnimal).subscribe(
              {
                next: (data: ListaClienteAnimal) => {
                  if(data){
                    console.log("Vinculo do do cliente/animal adicionado com sucesso");           
                  } else {
                    console.log("Erro: dados enviados, mas a operação não foi finalizada");
                  }                  
                },
                error: (erro: any) => {
                  console.log("Erro: ");
                  console.log(erro);
                },
                complete: () => {
                  console.log("Vinculo do do cliente/animal adicionado com sucesso");
                  this.trocarComponenteFilho.emit("Animal");
                }
              }
            );                                   
          }
        }
      );
    }
    //Existe cadastro para o animal e será necessário atualizar o cadastro
    else{
      this.animalService.atualizarAnimal(this.animalDadosTela).subscribe(
        {
          next:(data: Animal)=>{
            if(data){
              console.log("Animal atualizado com sucesso");
            }else{
              console.log("Erro: dados enviados, mas a operação não foi finalizada - Animal");
            }                  
          },
          error:(erro: any)=>{
            console.log("Erro - Animal: ");
            console.log(erro);
          },
          complete: () => {
            console.log("Atualização de animal concluída");    
            this.listaClienteAnimal.idAnimal = this.animalDadosTela.idAnimal;
            this.listaClienteAnimalService.atualizarListaClienteAnimal(this.listaClienteAnimal).subscribe(
              {
                next: (data: ListaClienteAnimal) => {
                  if(data){
                    console.log("Vinculo do do cliente/animal adicionado com sucesso");           
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
                  this.trocarComponenteFilho.emit("Animal");
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
