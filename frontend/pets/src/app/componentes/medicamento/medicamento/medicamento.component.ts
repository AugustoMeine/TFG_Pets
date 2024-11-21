import { Component, EventEmitter, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { AdicionarMedicamentoComponent } from '../adicionar-medicamento/adicionar-medicamento.component';
import { MedicamentoService } from '../../../services/medicamento.service';
import { Medicamento } from '../../../models/Medicamento.model';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-medicamento',
  standalone: true,
  imports: [AdicionarMedicamentoComponent,NgFor,NgIf],
  providers: [MedicamentoService],
  templateUrl: './medicamento.component.html',
  styleUrl: './medicamento.component.css'
})
export class MedicamentoComponent {
  @Output() trocarComponenteFilho = new EventEmitter<string>();

  listaMedicamentos: Medicamento[] = [];

  constructor(private medicamentoService: MedicamentoService){

    this.medicamentoService.consultarMedicamentos().subscribe(
      {
        next:(data: Medicamento[])=>{
          if(data){
            this.listaMedicamentos = data;   
            this.listaMedicamentos = this.listaMedicamentos.filter(linha => linha.status !== "Inativo");        
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

  // Função para obter as chaves do model para popular o cabeçalho da tabela
  getKeys(obj: any): string[] {
    //return (Object.keys(obj));
    return(["Nome","Principio Ativo","Fabricante","Editar","Desativar"]);
  }

  atualizarListaMedicamentos(){
    this.medicamentoService.consultarMedicamentos().subscribe(
      {
        next:(data: Medicamento[])=>{
          if(data){
            this.listaMedicamentos = data; 
            this.listaMedicamentos = this.listaMedicamentos.filter(linha => linha.status !== "Inativo");                   
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

  adicionarMedicamento(){
    this.trocarComponenteFilho.emit("AdicionarMedicamento");    
  }

  atualizarMedicamento(idMedicamento: number){
    localStorage.removeItem("idMedicamento");
    localStorage.setItem("idMedicamento",idMedicamento.toString());
    this.trocarComponenteFilho.emit("AtualizarMedicamento");    
  }

  desligarMedicamento(idMedicamento: number){
    this.medicamentoService.desligarMedicamento(idMedicamento).subscribe(
      {
        next:(data: Medicamento[])=>{
          if(data){
            this.atualizarListaMedicamentos();
          }else{
            console.log("Erro ao desligar o medicamento. Dados enviados, mas a operação não foi finalizada");
          }                  
        },
        error:(erro: any)=>{
          console.log("Erro: ");
          console.log(erro);
        },
        complete:()=>{
          console.log("Medicamento desligado com sucesso");
          this.atualizarListaMedicamentos();
        }
      }
    );  
  }
}
