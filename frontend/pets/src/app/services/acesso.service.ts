import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acesso } from '../models/Acesso.model';
import { API_CONFIG } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AcessoService {

  ip: string;

  constructor(private http: HttpClient) {
    this.ip = API_CONFIG.ip;
  }

  public consultarAcessos(): Observable<any> {
    return this.http.get(this.ip + ':2485/Acesso/');
  }

  public consultarAcesso(idAcesso: number): Observable<any> {
    return this.http.get(this.ip + ':2485/Acesso/' + idAcesso);
  }

  public consultarAcessoUsuario(idUsuario: number): Observable<any> {
    return this.http.get(this.ip + ':2485/Acesso/Usuario/' + idUsuario);
  }

  public salvarAcesso(acesso: Acesso): Observable<any> {
    return this.http.post(this.ip + ':2485/Acesso/', acesso);
  }

  public atualizarAcesso(acesso: Acesso): Observable<any> {
    return this.http.put(this.ip + ':2485/Acesso/', acesso);
  }
}