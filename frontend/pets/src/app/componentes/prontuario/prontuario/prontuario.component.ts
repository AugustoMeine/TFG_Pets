import { Component, EventEmitter, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { AdicionarProntuarioComponent } from '../adicionar-prontuario/adicionar-prontuario.component';
import { ProntuarioService } from '../../../services/prontuario.service';
import { Prontuario } from '../../../models/Prontuario.model';
import { NgFor, NgIf } from '@angular/common';
import { AnimalService } from '../../../services/animal.service';
import { Animal } from '../../../models/Animal.model';

@Component({
  selector: 'app-prontuario',
  standalone: true,
  imports: [AdicionarProntuarioComponent,NgFor,NgIf],
  providers: [ProntuarioService,AnimalService],
  templateUrl: './prontuario.component.html',
  styleUrl: './prontuario.component.css'
})
export class ProntuarioComponent {
  @Output() trocarComponenteFilho = new EventEmitter<string>();

  listaProntuarios: Prontuario[] = [];
  listaAnimais: Animal[] = [];

  constructor(private prontuarioService: ProntuarioService, private animalService: AnimalService){

    this.prontuarioService.consultarProntuarios().subscribe(
      {
        next:(data: Prontuario[])=>{
          if(data){
            this.listaProntuarios = data;
            this.listaProntuarios = this.listaProntuarios.filter(linha => linha.status !== "Inativo");
            this.listaProntuarios.forEach(prontuario => {
              const dataCriacao = new Date(prontuario.dataCriacao);
              const dia = String(dataCriacao.getDate()).padStart(2, '0');
              const mes = String(dataCriacao.getMonth() + 1).padStart(2, '0'); // Months are zero-based
              const ano = dataCriacao.getFullYear();
              prontuario.dataCriacao = `${dia}/${mes}/${ano}`;
            });
          }else{
            console.log("Erro");
          }                  
        },
        error:(erro: any)=>{
          console.log("Erro: ");
          console.log(erro);
        },
        complete:()=>{
          console.log("Prontuarios carregados com sucesso");
          this.animalService.consultarAnimais().subscribe(
            {
              next:(data: Animal[])=>{
                if(data){
                  this.listaAnimais = data;
                }else{
                  console.log("Erro");
                }                  
              },
              error:(erro: any)=>{
                console.log("Erro: ");
                console.log(erro);
              },
              complete:()=>{
                console.log("Animais carregados com sucesso");
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
    return(["Nome Animal","Temperatura","Frequência Cardiaca","Sintomas","Diagnóstico Provável","Diagnóstico Definitivo","Registro","Editar","Desativar"]);
  }

  atualizarListaProntuarios(){
    this.prontuarioService.consultarProntuarios().subscribe(
      {
        next:(data: Prontuario[])=>{
          if(data){
            this.listaProntuarios = data;
            this.listaProntuarios = this.listaProntuarios.filter(linha => linha.status !== "Inativo");
          }else{
            console.log("Erro");
          }                  
        },
        error:(erro: any)=>{
          console.log("Erro: ");
          console.log(erro);
        },
        complete:()=>{
          console.log("Prontuarios carregados com sucesso");
          this.animalService.consultarAnimais().subscribe(
            {
              next:(data: Animal[])=>{
                if(data){
                  this.listaAnimais = data;
                }else{
                  console.log("Erro");
                }                  
              },
              error:(erro: any)=>{
                console.log("Erro: ");
                console.log(erro);
              },
              complete:()=>{
                console.log("Animais carregados com sucesso");
              }
            }
          );
        }
      }
    );
  }

  adicionarProntuario(){
    this.trocarComponenteFilho.emit("AdicionarProntuario");    
  }

  atualizarProntuario(idProntuario: number){
    localStorage.removeItem("idProntuario");
    localStorage.setItem("idProntuario",idProntuario.toString());
    this.trocarComponenteFilho.emit("AtualizarProntuario");    
  }

  desligarProntuario(idProntuario: number){
    this.prontuarioService.desligarProntuario(idProntuario).subscribe(
      {
        next:(data: Prontuario[])=>{
          if(data){
            this.atualizarListaProntuarios();
          }else{
            console.log("Erro ao desligar o prontuario. Dados enviados, mas a operação não foi finalizada");
          }                  
        },
        error:(erro: any)=>{
          console.log("Erro: ");
          console.log(erro);
        },
        complete:()=>{
          console.log("Prontuario desligado com sucesso");
          this.atualizarListaProntuarios();
        }
      }
    );  
  }

  nomeAnimal(idAnimal: number): string{
    const animal = this.listaAnimais.find(animal => animal.idAnimal === idAnimal);
    return(animal ? animal.nome : '-');
  }

}
