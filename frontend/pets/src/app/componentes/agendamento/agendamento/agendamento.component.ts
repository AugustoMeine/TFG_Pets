import { Component, EventEmitter, Output } from '@angular/core';
import { AgendamentoService } from '../../../services/agendamento.service';
import { ClienteService } from '../../../services/cliente.service';
import { AnimalService } from '../../../services/animal.service';
import { Agendamento } from '../../../models/Agendamento.model';
import { Cliente } from '../../../models/Cliente.model';
import { Animal } from '../../../models/Animal.model';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  providers: [AgendamentoService, ClienteService, AnimalService],
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent {
  @Output() trocarComponenteFilho = new EventEmitter<string>();
  listaAgendamentos: Agendamento[] = [];
  clientes: Cliente[] = [];
  animais: Animal[] = [];
  currentDate: Date = new Date();
  selectedAno: number = this.currentDate.getFullYear();
  selectedMonth: number = this.currentDate.getMonth();
  selectedDay: number = this.currentDate.getDate();
  anos: number[] = [];
  meses: { value: number, name: string }[] = [
    { value: 0, name: 'Janeiro' },
    { value: 1, name: 'Fevereiro' },
    { value: 2, name: 'Março' },
    { value: 3, name: 'Abril' },
    { value: 4, name: 'Maio' },
    { value: 5, name: 'Junho' },
    { value: 6, name: 'Julho' },
    { value: 7, name: 'Agosto' },
    { value: 8, name: 'Setembro' },
    { value: 9, name: 'Outubro' },
    { value: 10, name: 'Novembro' },
    { value: 11, name: 'Dezembro' }
  ];
  diasMes: number[] = [];

  constructor(
    private agendamentoService: AgendamentoService,
    private clienteService: ClienteService,
    private animalService: AnimalService
  ) {
    this.preencherAnos();
    this.atualizarDias();
    this.consultarAgendamentosPorData();
    this.carregarClientes();
    this.carregarAnimais();
  }

  preencherAnos() {
    const anoAtual = new Date().getFullYear();
    for (let i = anoAtual - 10; i <= anoAtual + 10; i++) {
      this.anos.push(i);
    }
  }

  atualizarDias() {
    let date = new Date(this.selectedAno, this.selectedMonth, 1);
    this.diasMes = [];
    while (date.getMonth() == this.selectedMonth) {
      this.diasMes.push(new Date(date).getDate());
      date.setDate(date.getDate() + 1);
    }
    this.selecionarDia(this.selectedDay);
  }

  selecionarDia(dia: number) {
    this.selectedDay = dia;
    this.consultarAgendamentosPorData();
  }

  consultarAgendamentosPorData() {
    let ano = Number(this.selectedAno);
    let mes = String(Number(this.selectedMonth) + 1).padStart(2, '0');
    let dia = String(Number(this.selectedDay)).padStart(2, '0');
    let dataCompleta = '' + ano + '-' + mes + '-' + dia;

    this.agendamentoService.consultarAgendamentosPorData(dataCompleta).subscribe({
      next: (data: Agendamento[]) => {
        if (data) {
          this.listaAgendamentos = data;
        } else {
          console.log('Erro');
        }
      },
      error: (erro: any) => {
        console.log('Erro: ');
        console.log(erro);
      }
    });
  }

  carregarClientes() {
    this.clienteService.consultarClientes().subscribe({
      next: (data: Cliente[]) => {
        this.clientes = data;
      },
      error: (erro: any) => {
        console.log('Erro ao carregar clientes: ', erro);
      }
    });
  }

  carregarAnimais() {
    this.animalService.consultarAnimais().subscribe({
      next: (data: Animal[]) => {
        this.animais = data;
      },
      error: (erro: any) => {
        console.log('Erro ao carregar animais: ', erro);
      }
    });
  }

  nomeCliente(idCliente: number): string {
    const cliente = this.clientes.find(c => c.idCliente === idCliente);
    return cliente ? cliente.nome : 'Erro';
  }

  nomeAnimal(idAnimal: number): string {
    const animal = this.animais.find(a => a.idAnimal === idAnimal);
    return animal ? animal.nome : 'Erro';
  }

  adicionarAgendamento() {
    this.trocarComponenteFilho.emit('AdicionarAgendamento');
  }

  confirmarAgendamento(idAgendamento: number) {
    this.agendamentoService.efetivarAgendamento(idAgendamento).subscribe({
      next: (data: Agendamento) => {
        if (data) {
          this.consultarAgendamentosPorData();
        } else {
          console.log('Erro ao confirmar o agendamento. Dados enviados, mas a operação não foi finalizada');
        }
      },
      error: (erro: any) => {
        console.log('Erro: ');
        console.log(erro);
      },
      complete: () => {
        console.log('Agendamento confirmado com sucesso');
        this.consultarAgendamentosPorData();
      }
    });
  }
}