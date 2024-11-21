import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prontuario } from '../models/Prontuario.model';
import { API_CONFIG } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ProntuarioService {

  ip: string;

  constructor(private http: HttpClient){
    this.ip = API_CONFIG.ip;
  }

  public consultarProntuarios():Observable<any>{
    return(this.http.get(this.ip+':2485/Prontuario/'));
  }

  public consultarProntuario(idProntuario:number):Observable<any>{
    return(this.http.get(this.ip+':2485/Prontuario/'+idProntuario));
  }

  public salvarProntuario(prontuario: Prontuario):Observable<any>{
    return(this.http.post(this.ip+':2485/Prontuario/', prontuario));
  }

  public atualizarProntuario(prontuario: Prontuario):Observable<any>{
    return(this.http.put(this.ip+':2485/Prontuario/', prontuario));
  }

  public desligarProntuario(idProntuario:number):Observable<any>{
    return(this.http.get(this.ip+':2485/Prontuario/Desligar/'+ idProntuario));
  }

  public ativarProntuario(idProntuario:number):Observable<any>{
    return(this.http.get(this.ip+':2485/Prontuario/Ativar/'+ idProntuario));
  }

}
