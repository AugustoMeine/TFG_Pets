import { Component, EventEmitter, Output } from '@angular/core';
import { MedicamentoService } from '../../../services/medicamento.service';
import { NgFor } from '@angular/common';
import { Medicamento } from '../../../models/Medicamento.model';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-atualizar-medicamento',
  standalone: true,
  imports: [NgFor, FormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [MedicamentoService, provideNgxMask()],
  templateUrl: './atualizar-medicamento.component.html',
  styleUrl: './atualizar-medicamento.component.css'
})
export class AtualizarMedicamentoComponent {
  @Output() trocarComponenteFilho = new EventEmitter<string>();
  
  medicamentoDadosTela: Medicamento;

  constructor(private medicamentoService: MedicamentoService){  
    this.medicamentoDadosTela = new Medicamento(0, "", "", "", "Ativo");    
    this.carregarDados();
  }

  ngOnInit():void {       
  }

  ngAfterViewInit(): void {    
  }

  carregarDados(){
    if((localStorage.getItem("idMedicamento") == null) || (localStorage.getItem("idMedicamento") == "") || (localStorage.getItem("idMedicamento")) ){      
      this.trocarComponenteFilho.emit("Medicamento");
    }

    let idMedicamento = Number(localStorage.getItem("idMedicamento"));
    console.log(localStorage.getItem("idMedicamento"))
    if (isNaN(idMedicamento) || idMedicamento <= 0) {
      this.trocarComponenteFilho.emit("Medicamento");
    }

    this.medicamentoService.consultarMedicamento(idMedicamento).subscribe(
      {
        next:(data: Medicamento)=>{
          if(data){
          this.medicamentoDadosTela = data;       
          }else{
          console.log("Erro. Dados enviados, mas a operação não foi finalizada - Medicamento");
          }                  
        },
        error:(erro: any)=>{
          console.log("Erro: ");
          console.log(erro);
        },
        complete: () => {
          console.log("Consulta de medicamento concluída");
        }
      }
    );


  }

  atualizarMedicamento(){
  
    this.medicamentoService.atualizarMedicamento(this.medicamentoDadosTela).subscribe(
      {
        next:(data: Medicamento)=>{
          if(data){
            console.log("Medicamento atualizado com sucesso");
          }else{
            console.log("Erro: dados enviados, mas a operação não foi finalizada - Medicamento");
          }                  
        },
        error:(erro: any)=>{
          console.log("Erro - Medicamento: ");
          console.log(erro);
        },
        complete: () => {
          console.log("Atualização de medicamento concluída");    
          this.trocarComponenteFilho.emit("Medicamento");            
        }
      }
    );
    
  }

  retornarTelaMedicamento(){
    this.trocarComponenteFilho.emit("Medicamento");
  }
}
