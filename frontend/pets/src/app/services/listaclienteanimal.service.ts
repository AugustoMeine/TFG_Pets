import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaClienteAnimal } from '../models/ListaClienteAnimal.model';
import { API_CONFIG } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ListaclienteanimalService {
  ip: string;

  constructor(private http: HttpClient){
    this.ip = API_CONFIG.ip;
  }

  public consultarListaClienteAnimais():Observable<any>{
    return(this.http.get(this.ip+':2485/ListaClienteAnimal/'));
  }

  public consultarListaClienteAnimal(idListaClienteAnimal:number):Observable<any>{
    return(this.http.get(this.ip+':2485/ListaClienteAnimal/' + idListaClienteAnimal));
  }

  public salvarListaClienteAnimal(listaClienteAnimal: ListaClienteAnimal):Observable<any>{
    return(this.http.post(this.ip+':2485/ListaClienteAnimal/', listaClienteAnimal));
  }

  public atualizarListaClienteAnimal(listaClienteAnimal: ListaClienteAnimal):Observable<any>{
    return(this.http.put(this.ip+':2485/ListaClienteAnimal/', listaClienteAnimal));
  }

}
