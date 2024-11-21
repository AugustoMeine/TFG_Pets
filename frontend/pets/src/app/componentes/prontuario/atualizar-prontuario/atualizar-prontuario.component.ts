import { Component, EventEmitter, Output } from '@angular/core';
import { ProntuarioService } from '../../../services/prontuario.service';
import { NgFor } from '@angular/common';
import { Prontuario } from '../../../models/Prontuario.model';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { Animal } from '../../../models/Animal.model';
import { AnimalService } from '../../../services/animal.service';
import { Medicamento } from '../../../models/Medicamento.model';
import { ListaMedicamentoProntuario } from '../../../models/ListaMedicamentoProntuario.model';
import { MedicamentoService } from '../../../services/medicamento.service';
import { ListamedicamentoprontuarioService } from '../../../services/listamedicamentoprontuario.service';

@Component({
  selector: 'app-atualizar-prontuario',
  standalone: true,
  imports: [NgFor, FormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [ProntuarioService, AnimalService, MedicamentoService, provideNgxMask()],
  templateUrl: './atualizar-prontuario.component.html',
  styleUrl: './atualizar-prontuario.component.css'
})
export class AtualizarProntuarioComponent {
  @Output() trocarComponenteFilho = new EventEmitter<string>();

  prontuarioDadosTela: Prontuario;
  animalSelecionado: number;
  listaAnimaisCadastrados: Animal[];
  listaMedicamentos: Medicamento[] = [];
  listaMedicamentosSelecionados: Medicamento[] = [];
  medicamentoSelecionado: Medicamento;
  listaMedicamentosProntuario: ListaMedicamentoProntuario[] = [];
  listaMedicamentosProntuarioValidacao: ListaMedicamentoProntuario[] = [];
  listaMedicamentosProntuarioGeral: ListaMedicamentoProntuario[] = [];

  constructor(
    private prontuarioService: ProntuarioService,
    private animalService: AnimalService,
    private medicamentoService: MedicamentoService,
    private listaMedicamentoProntuarioService: ListamedicamentoprontuarioService
  ) {
    this.prontuarioDadosTela = new Prontuario(0, 0, "", 0, 0, "", "", "", "Ativo");
    this.animalSelecionado = 0;
    this.listaAnimaisCadastrados = [];
    this.medicamentoSelecionado = new Medicamento(0, "", "", "", "");

    this.carregarDados();
    this.atualizarListaAnimais();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  carregarDados() {
    if (
      localStorage.getItem("idProntuario") == null ||
      localStorage.getItem("idProntuario") == "" ||
      localStorage.getItem("idProntuario")
    ) {
      this.trocarComponenteFilho.emit("Prontuario");
    }

    let idProntuario = Number(localStorage.getItem("idProntuario"));
    console.log(localStorage.getItem("idProntuario"));
    if (isNaN(idProntuario) || idProntuario <= 0) {
      this.trocarComponenteFilho.emit("Prontuario");
    }

    this.prontuarioService.consultarProntuario(idProntuario).subscribe({
      next: (data: Prontuario) => {
        if (data) {
          this.prontuarioDadosTela = data;
        } else {
          console.log("Erro. Dados enviados, mas a operação não foi finalizada - Prontuario");
        }
      },
      error: (erro: any) => {
        console.log("Erro: ");
        console.log(erro);
      },
      complete: () => {
        console.log("Consulta de prontuario concluída");
        this.animalSelecionado = this.prontuarioDadosTela.idAnimal;
      }
    });

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
          this.listaMedicamentosProntuarioGeral = this.listaMedicamentosProntuario;
          this.listaMedicamentosProntuario = this.listaMedicamentosProntuario.filter(
            item => item.idProntuario === idProntuario
          );
          this.listaMedicamentosProntuarioValidacao = this.listaMedicamentosProntuario;
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
  }

  atualizarProntuario() {
    this.prontuarioService.atualizarProntuario(this.prontuarioDadosTela).subscribe({
      next: (data: Prontuario) => {
        if (data) {
          console.log("Prontuario atualizado com sucesso");
        } else {
          console.log("Erro: dados enviados, mas a operação não foi finalizada - Prontuario");
        }
      },
      error: (erro: any) => {
        console.log("Erro - Prontuario: ");
        console.log(erro);
      },
      complete: () => {
        console.log("Atualização de prontuario concluída");
        let medicamentoProntuarioPendente = this.listaMedicamentosSelecionados.length;
        console.log("Medicamentos pendentes: " + medicamentoProntuarioPendente);

        this.listaMedicamentosProntuario = [];
        for (let aux of this.listaMedicamentosSelecionados) {
          this.listaMedicamentosProntuario.push(
            new ListaMedicamentoProntuario(0, aux.idMedicamento, this.prontuarioDadosTela.idProntuario, "")
          );
        }

        for (let aux of this.listaMedicamentosSelecionados) {
          // Verifica se o medicamento está na lista inicial
          let existeNaListaInicial = this.listaMedicamentosProntuarioValidacao.some(
            item => item.idMedicamento === aux.idMedicamento
          );
          // Verifica se o medicamento está na lista nova
          let existeNaListaNova = this.listaMedicamentosProntuario.some(
            item => item.idMedicamento === aux.idMedicamento
          );
          // Primeira validação: existe na lista nova e não existia na lista inicial
          if (!existeNaListaInicial && existeNaListaNova) {
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
                }
              });
          }
          // Segunda validação: existe na lista nova e existe na lista inicial
          else if (existeNaListaInicial && existeNaListaNova) {
            console.log("Medicamento já existe na lista, nenhuma ação efetivada referente aos medicamentos");
          }
        }

        for (let aux of this.listaMedicamentosProntuarioValidacao) {
          // Verifica se o medicamento está na lista nova
          let existeNaListaNova = this.listaMedicamentosProntuario.some(
            item => item.idMedicamento === aux.idMedicamento
          );
          // Terceira validação: não existe na lista nova e existe na lista inicial
          if (!existeNaListaNova) {
            let medicamentoProntuarioAux = this.listaMedicamentosProntuarioValidacao.find(
              item =>
                item.idMedicamento === aux.idMedicamento &&
                item.idProntuario === this.prontuarioDadosTela.idProntuario
            );
            if (medicamentoProntuarioAux) {
              this.listaMedicamentoProntuarioService
                .excluirListaMedicamentoProntuario(medicamentoProntuarioAux.idListaMedicamentoProntuario)
                .subscribe({
                  next: (data: any) => {
                    console.log("Medicamento removido do prontuário com sucesso");
                  },
                  error: (erro: any) => {
                    console.log("Erro ao remover medicamento do prontuário: ");
                    console.log(erro);
                  },
                  complete: () => {
                    console.log("Remoção de medicamento do prontuário concluída");                    
                  }
                });
            }
          }
        }

        this.trocarComponenteFilho.emit("Prontuário");
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
