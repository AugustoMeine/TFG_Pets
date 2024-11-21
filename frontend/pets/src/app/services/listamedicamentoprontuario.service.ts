import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaMedicamentoProntuario } from '../models/ListaMedicamentoProntuario.model';
import { API_CONFIG } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ListamedicamentoprontuarioService {

  ip: string;

  constructor(private http: HttpClient){
    this.ip = API_CONFIG.ip;
  }

  public consultarListaMedicamentoProntuarios():Observable<any>{
    return(this.http.get(this.ip+':2485/ListaMedicamentoProntuario/'));
  }

  public consultarListaMedicamentoProntuario(idListaMedicamentoProntuario:number):Observable<any>{
    return(this.http.get(this.ip+':2485/ListaMedicamentoProntuario/'+idListaMedicamentoProntuario));
  }

  public salvarListaMedicamentoProntuario(listaMedicamentoProntuario: ListaMedicamentoProntuario):Observable<any>{
    return(this.http.post(this.ip+':2485/ListaMedicamentoProntuario/', listaMedicamentoProntuario));
  }

  public atualizarListaMedicamentoProntuario(listaMedicamentoProntuario: ListaMedicamentoProntuario):Observable<any>{
    return(this.http.put(this.ip+':2485/ListaMedicamentoProntuario/', listaMedicamentoProntuario));
  }

  public excluirListaMedicamentoProntuario(idListaMedicamentoProntuario: number):Observable<any>{
    return(this.http.get(this.ip+':2485/ListaMedicamentoProntuario/Excluir/' + idListaMedicamentoProntuario));
  }

}
