import { Component, EventEmitter, Output } from '@angular/core';
import { ProntuarioService } from '../../../services/prontuario.service';
import { NgFor } from '@angular/common';
import { Prontuario } from '../../../models/Prontuario.model';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { Animal } from '../../../models/Animal.model';
import { AnimalService } from '../../../services/animal.service';
import { Medicamento } from '../../../models/Medicamento.model';
import { MedicamentoService } from '../../../services/medicamento.service';
import { ListaMedicamentoProntuario } from '../../../models/ListaMedicamentoProntuario.model';
import { ListamedicamentoprontuarioService } from '../../../services/listamedicamentoprontuario.service';

@Component({
  selector: 'app-adicionar-prontuario',
  standalone: true,
  imports: [NgFor, FormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [ProntuarioService, AnimalService, MedicamentoService, provideNgxMask()],
  templateUrl: './adicionar-prontuario.component.html',
  styleUrl: './adicionar-prontuario.component.css'
})
export class AdicionarProntuarioComponent {
  @Output() trocarComponenteFilho = new EventEmitter<string>();

  prontuarioDadosTela: Prontuario;
  animalSelecionado: number;
  listaAnimaisCadastrados: Animal[];
  listaMedicamentos: Medicamento[] = [];
  listaMedicamentosSelecionados: Medicamento[] = [];
  medicamentoSelecionado: Medicamento;
  listaMedicamentosProntuario: ListaMedicamentoProntuario[] = [];

  constructor(
    private prontuarioService: ProntuarioService,
    private animalService: AnimalService,
    private medicamentoService: MedicamentoService,
    private listaMedicamentoProntuarioService: ListamedicamentoprontuarioService
  ) {
    this.prontuarioDadosTela = new Prontuario(0, 0, "", 0, 0, "", "", "", "");
    this.animalSelecionado = 0;
    this.listaAnimaisCadastrados = [];
    this.medicamentoSelecionado = new Medicamento(0, "", "", "", "");
    this.medicamentoService.consultarMedicamentos().subscribe({
      next: (data: Medicamento[]) => {
        if (data) {
          this.listaMedicamentos = data;
        } else {
          console.log("Erro");
        }
      },
      error: (erro: any) => {
        console.log("Erro: ");
        console.log(erro);
      },
      complete: () => {
        console.log("Lista de medicamentos atualizada com sucesso");
      }
    });

    this.listaMedicamentoProntuarioService.consultarListaMedicamentoProntuarios().subscribe({
      next: (data: ListaMedicamentoProntuario[]) => {
        if (data) {
          this.listaMedicamentosProntuario = data;
        } else {
          console.log("Erro");
        }
      },
      error: (erro: any) => {
        console.log("Erro: ");
        console.log(erro);
      },
      complete: () => {
        console.log("Lista de medicamentos do prontuário atualizada com sucesso");
        for (let item of this.listaMedicamentosProntuario) {
          let medicamento = this.listaMedicamentos.find(
            medicamento => medicamento.idMedicamento === item.idMedicamento
          );
          if (medicamento) {
            this.listaMedicamentosSelecionados.push(medicamento);
          }
        }
      }
    });

    this.atualizarListaAnimais();
  }

  ngOnInit(): void {}

  adicionarProntuario() {
    this.prontuarioDadosTela.idAnimal = this.animalSelecionado;
    this.prontuarioService.salvarProntuario(this.prontuarioDadosTela).subscribe({
      next: (data: Prontuario) => {
        if (data) {
          this.prontuarioDadosTela = data;
        } else {
          console.log("Erro: dados enviados, mas a operação não foi finalizada");
        }
      },
      error: (erro: any) => {
        console.log("Erro: ");
        console.log(erro);
      },
      complete: () => {
        console.log("Prontuario adicionado com sucesso");
        let medicamentosPendentes = this.listaMedicamentosSelecionados.length;
        for (let aux of this.listaMedicamentosSelecionados) {
          //para cada medicamento será adicionado uma linha na lista de medicamentos do prontuario
          this.listaMedicamentoProntuarioService
            .salvarListaMedicamentoProntuario(
              new ListaMedicamentoProntuario(0, aux.idMedicamento, this.prontuarioDadosTela.idProntuario, "")
            )
            .subscribe({
              next: (data: ListaMedicamentoProntuario) => {
                if (data) {
                  console.log("Medicamento adicionado ao prontuário com sucesso");
                } else {
                  console.log("Erro (lista medicamento prontuario): dados enviados, mas a operação não foi finalizada");
                }
              },
              error: (erro: any) => {
                console.log("Erro: ");
                console.log(erro);
              },
              complete: () => {
                console.log("Medicamento do prontuário foi adicionado com sucesso");
                medicamentosPendentes -= 1;
                if (medicamentosPendentes === 0) {
                  this.retornarTelaProntuario();
                }
              }
            });
        }
      }
    });
  }

  atualizarListaAnimais() {
    this.animalService.consultarAnimais().subscribe({
      next: (data: Animal[]) => {
        if (data) {
          this.listaAnimaisCadastrados = data;
          this.listaAnimaisCadastrados = this.listaAnimaisCadastrados.filter(animal => animal.status !== "Inativo");
        } else {
          console.log("Erro");
        }
      },
      error: (erro: any) => {
        console.log("Erro: ");
        console.log(erro);
      },
      complete: () => {
        console.log("Lista de animais atualizada com sucesso");
      }
    });
  }

  retornarTelaProntuario() {
    this.trocarComponenteFilho.emit("Prontuário");
  }

  adicionarMedicamento(medicamentoSelecionado: Medicamento) {
    let validacao = this.listaMedicamentosSelecionados.some(
      m => m.idMedicamento === medicamentoSelecionado.idMedicamento
    );
    if (!validacao) {
      this.listaMedicamentosSelecionados.push(medicamentoSelecionado);
      console.log("Medicamento adicionado à lista");
    } else {
      console.log("Medicamento já está na lista");
    }
  }

  removerMedicamento(medicamento: Medicamento) {
    console.log("Removendo medicamento");
    let validacao = this.listaMedicamentosSelecionados.some(m => m.idMedicamento === medicamento.idMedicamento);
    if (validacao) {
      this.listaMedicamentosSelecionados = this.listaMedicamentosSelecionados.filter(
        m => m.idMedicamento !== medicamento.idMedicamento
      );
      console.log("Medicamento removido da lista");
    } else {
      console.log("Medicamento não existe na lista");
    }
  }
}
