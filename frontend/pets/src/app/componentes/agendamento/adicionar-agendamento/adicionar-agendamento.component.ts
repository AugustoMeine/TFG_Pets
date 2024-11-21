import { Component, EventEmitter, Output } from '@angular/core';
import { AgendamentoService } from '../../../services/agendamento.service';
import { ListaclienteanimalService } from '../../../services/listaclienteanimal.service';
import { ClienteService } from '../../../services/cliente.service';
import { AnimalService } from '../../../services/animal.service';
import { Agendamento } from '../../../models/Agendamento.model';
import { ListaClienteAnimal } from '../../../models/ListaClienteAnimal.model';
import { Cliente } from '../../../models/Cliente.model';
import { Animal } from '../../../models/Animal.model';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adicionar-agendamento',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  providers: [AgendamentoService, ListaclienteanimalService, ClienteService, AnimalService],
  templateUrl: './adicionar-agendamento.component.html',
  styleUrl: './adicionar-agendamento.component.css'
})
export class AdicionarAgendamentoComponent {
  @Output() trocarComponenteFilho = new EventEmitter<string>();
  listaAgendamentos: Agendamento[] = [];
  listaClienteAnimal: ListaClienteAnimal[] = [];
  listaClientes: Cliente[] = [];
  listaAnimais: Animal[] = [];
  listaHorariosDisponiveis: string[] = [];
  horariosSelecionados: string[] = [];
  currentDate: Date = new Date();
  selectedAno: number = this.currentDate.getFullYear();
  selectedMonth: number = this.currentDate.getMonth();
  selectedDay: number = this.currentDate.getDate();
  selectedClienteAnimal: number = 0;

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
    private listaClienteAnimalService: ListaclienteanimalService,
    private clienteService: ClienteService,
    private animalService: AnimalService
  ) {
    this.preencherAnos();
    this.atualizarDias();
    this.consultarAgendamentosPorData();
    this.consultarListaClienteAnimal();
    this.consultarClientes();
    this.consultarAnimais();
  }

  preencherAnos() {
    const anoAtual = new Date().getFullYear();
    for (let i = anoAtual - 10; i <= anoAtual + 10; i++) {
      this.anos.push(i);
    }
  }

  atualizarDias(){
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
    this.consultarHorariosDisponiveisPorData();
  }

  consultarAgendamentosPorData() {
    let ano = Number(this.selectedAno);
    let mes = String(Number(this.selectedMonth) + 1).padStart(2, '0');
    let dia = String(Number(this.selectedDay)).padStart(2, '0');
    let dataCompleta = ''+ano+'-'+mes+'-'+dia;

    this.agendamentoService.consultarAgendamentosPorData(dataCompleta).subscribe(
      {
        next: (data: Agendamento[]) => {
          if (data) {
            this.listaAgendamentos = data;
          } else {
            console.log("Erro");
          }
        },
        error: (erro: any) => {
          console.log("Erro: ");
          console.log(erro);
        }
      }
    );
  }

  consultarHorariosDisponiveisPorData() {
    let ano = Number(this.selectedAno);
    let mes = String(Number(this.selectedMonth) + 1).padStart(2, '0');
    let dia = String(Number(this.selectedDay)).padStart(2, '0');
    let dataCompleta = ''+ano+'-'+mes+'-'+dia;

    this.agendamentoService.consultarHorariosDisponiveisPorData(dataCompleta).subscribe(
      {
        next: (data: string[]) => {
          if (data) {
            this.listaHorariosDisponiveis = data;
          } else {
            console.log("Erro");
          }
        },
        error: (erro: any) => {
          console.log("Erro: ");
          console.log(erro);
        }
      }
    );
  }

  consultarListaClienteAnimal() {
    this.listaClienteAnimalService.consultarListaClienteAnimais().subscribe(
      {
        next: (data: ListaClienteAnimal[]) => {
          if (data) {
            this.listaClienteAnimal = data;
          } else {
            console.log("Erro");
          }
        },
        error: (erro: any) => {
          console.log("Erro: ");
          console.log(erro);
        }
      }
    );
  }

  consultarClientes() {
    this.clienteService.consultarClientes().subscribe(
      {
        next: (data: Cliente[]) => {
          if (data) {
            this.listaClientes = data;
          } else {
            console.log("Erro");
          }
        },
        error: (erro: any) => {
          console.log("Erro: ");
          console.log(erro);
        }
      }
    );
  }

  consultarAnimais() {
    this.animalService.consultarAnimais().subscribe(
      {
        next: (data: Animal[]) => {
          if (data) {
            this.listaAnimais = data;
          } else {
            console.log("Erro");
          }
        },
        error: (erro: any) => {
          console.log("Erro: ");
          console.log(erro);
        }
      }
    );
  }

  getClienteNome(idCliente: number): string {
    const cliente = this.listaClientes.find(cliente => cliente.idCliente === idCliente);
    return cliente ? cliente.nome : '';
  }

  getAnimalNome(idAnimal: number): string {
    const animal = this.listaAnimais.find(animal => animal.idAnimal === idAnimal);
    return animal ? animal.nome : '';
  }

  retornarAgendamento() {
    this.trocarComponenteFilho.emit("Agendamento");
  }

  salvarAgendamento() {
    let ano = Number(this.selectedAno);
    let mes = String(Number(this.selectedMonth) + 1).padStart(2, '0');
    let dia = String(Number(this.selectedDay)).padStart(2, '0');
    let dataCompleta = ''+ano+'-'+mes+'-'+dia;
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;    

    let listaClienteAnimalSelecionado: ListaClienteAnimal | undefined;

    for(let item of this.listaClienteAnimal){
        if(item.idListaClienteAnimal == this.selectedClienteAnimal){
          listaClienteAnimalSelecionado = item;
            break;
        }
    }

    if(!listaClienteAnimalSelecionado){
      console.log("Erro ao selecionar o cliente e o animal");
      return;
    }

    for (let hora of this.horariosSelecionados) {
      let agendamento: Agendamento = {
        idUsuario: user.idUsuario,
        idAgendamento: 0,
        dataAgendamento: dataCompleta,
        horaAgendamento: hora,
        idCliente: listaClienteAnimalSelecionado.idCliente,
        idAnimal: listaClienteAnimalSelecionado.idAnimal,
        status: 'Pendente'
      };

      this.agendamentoService.salvarAgendamento(agendamento).subscribe(
        {
          next: (data: Agendamento) => {
            if (!data) {
              console.log("Erro ao confirmar o agendamento. Dados enviados, mas a operação não foi finalizada");
            }
          },
          error: (erro: any) => {
            console.log("Erro: ");
            console.log(erro);
          },
          complete: () => {
            console.log("Agendamento confirmado com sucesso");
            this.trocarComponenteFilho.emit("Agendamento");
          }
        }
      );
      
    }
  }

  selecionarHorario(horario: string) {
    let index = this.horariosSelecionados.indexOf(horario);
    if (index > -1) {
      this.horariosSelecionados.splice(index, 1);      
    } else {
      this.horariosSelecionados.push(horario);
    }
  }
}