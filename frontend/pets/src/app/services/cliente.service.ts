import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente.model';
import { API_CONFIG } from '../config';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  
  ip: string;

  constructor(private http: HttpClient){
    this.ip = API_CONFIG.ip;
  }

  public consultarClientes():Observable<any>{
    return(this.http.get(this.ip+':2485/Cliente/'));
  }

  public consultarCliente(idCliente:number):Observable<any>{
    return(this.http.get(this.ip+':2485/Cliente/'+idCliente));
  }

  public salvarCliente(cliente: Cliente):Observable<any>{
    return(this.http.post(this.ip+':2485/Cliente/', cliente));
  }

  public atualizarCliente(cliente: Cliente):Observable<any>{
    return(this.http.put(this.ip+':2485/Cliente/', cliente));
  }

  public desligarCliente(idCliente:number):Observable<any>{
    return(this.http.get(this.ip+':2485/Cliente/Desligar/'+ idCliente));
  }

  public ativarCliente(idCliente:number):Observable<any>{
    return(this.http.get(this.ip+':2485/Cliente/Ativar/'+ idCliente));
  }

}
