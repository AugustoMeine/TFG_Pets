import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicamento } from '../models/Medicamento.model';
import { API_CONFIG } from '../config';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  ip: string;

  constructor(private http: HttpClient){
    this.ip = API_CONFIG.ip;
  }

  public consultarMedicamentos():Observable<any>{
    return(this.http.get(this.ip+':2485/Medicamento/'));
  }

  public consultarMedicamento(idMedicamento:number):Observable<any>{
    return(this.http.get(this.ip+':2485/Medicamento/'+idMedicamento));
  }

  public salvarMedicamento(medicamento: Medicamento):Observable<any>{
    return(this.http.post(this.ip+':2485/Medicamento/', medicamento));
  }

  public atualizarMedicamento(medicamento: Medicamento):Observable<any>{
    return(this.http.put(this.ip+':2485/Medicamento/', medicamento));
  }

  public desligarMedicamento(idMedicamento:number):Observable<any>{
    return(this.http.get(this.ip+':2485/Medicamento/Desligar/'+ idMedicamento));
  }

  public ativarMedicamento(idMedicamento:number){
    return(this.http.get(this.ip+':2485/Medicamento/Ativar/'+ idMedicamento));
  }
}
