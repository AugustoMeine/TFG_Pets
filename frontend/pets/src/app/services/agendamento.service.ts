import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agendamento } from '../models/Agendamento.model';
import { API_CONFIG } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  ip: string;

  constructor(private http: HttpClient){
    this.ip = API_CONFIG.ip;
  }

  public consultarAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.ip+':2485/Agendamento/');
  }

  public consultarAgendamentosPorData(dataAgendamento: string): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.ip+':2485/Agendamento/Data/'+dataAgendamento);
  }

  public consultarHorariosDisponiveisPorData(dataAgendamento: string): Observable<string[]> {
    return this.http.get<string[]>(this.ip+':2485/Agendamento/Hora/Disponivel/'+dataAgendamento);
  }

  public consultarAgendamento(idAgendamento: number): Observable<Agendamento> {
    return this.http.get<Agendamento>(this.ip+':2485/Agendamento/'+idAgendamento);
  }

  public salvarAgendamento(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.ip+':2485/Agendamento/', agendamento);
  }

  public efetivarAgendamento(idAgendamento: number): Observable<Agendamento> {
    return this.http.get<Agendamento>(this.ip+':2485/Agendamento/Efetivar/'+idAgendamento);
  }

  public cancelarAgendamento(idAgendamento: number): Observable<Agendamento> {
    return this.http.get<Agendamento>(this.ip+':2485/Agendamento/Cancelar/'+idAgendamento);
  }
}
