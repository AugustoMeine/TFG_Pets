import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from '../models/Endereco.model';
import { API_CONFIG } from '../config';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  ip: string;

  constructor(private http: HttpClient){
    this.ip = API_CONFIG.ip;
  }

  public consultarEnderecos():Observable<any>{
    return(this.http.get(this.ip+':2485/Endereco/'));
  }

  public consultarEndereco(idEndereco:number):Observable<any>{
    return(this.http.get(this.ip+':2485/Endereco/'+idEndereco));
  }

  public salvarEndereco(endereco: Endereco):Observable<any>{
    return(this.http.post(this.ip+':2485/Endereco/', endereco));
  }

  public atualizarEndereco(endereco: Endereco):Observable<any>{
    return(this.http.put(this.ip+':2485/Endereco/', endereco));
  }

  public desligarEndereco(idEndereco:number):Observable<any>{
    return(this.http.get(this.ip+':2485/Endereco/Desligar/'+ idEndereco));
  }

  public ativarEndereco(idEndereco:number):Observable<any>{
    return(this.http.get(this.ip+':2485/Endereco/Ativar/'+ idEndereco));
  }
}
