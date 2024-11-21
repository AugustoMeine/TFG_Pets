import { Component, EventEmitter, Output } from '@angular/core';
import { MedicamentoService } from '../../../services/medicamento.service';
import { NgFor } from '@angular/common';
import { Medicamento } from '../../../models/Medicamento.model';
import { FormsModule } from '@angular/forms';
import { Endereco } from '../../../models/Endereco.model';
import { EnderecoService } from '../../../services/endereco.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-adicionar-medicamento',
  standalone: true,
  imports: [NgFor, FormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [MedicamentoService, provideNgxMask()],
  templateUrl: './adicionar-medicamento.component.html',
  styleUrl: './adicionar-medicamento.component.css'
})
export class AdicionarMedicamentoComponent {
  @Output() trocarComponenteFilho = new EventEmitter<string>();
  
  medicamentoDadosTela: Medicamento;

  constructor(private medicamentoService: MedicamentoService){  

    this.medicamentoDadosTela = new Medicamento(0, "", "", "", "Ativo");    

  }

  ngOnInit(): void {    
  }

  adicionarMedicamento(){    
    this.medicamentoService.salvarMedicamento(this.medicamentoDadosTela).subscribe(
      {
        next: (data: Medicamento) => {
          if(data){
            this.retornarTelaMedicamento();            
          } else {
            console.log("Erro: dados enviados, mas a operação não foi finalizada");
          }                  
        },
        error: (erro: any) => {
          console.log("Erro: ");
          console.log(erro);
        },
        complete: () => {
          console.log("Medicamento adicionado com sucesso");          
        }
      }
    );
  }

  retornarTelaMedicamento(){
    this.trocarComponenteFilho.emit("Medicamento");
  }
}
