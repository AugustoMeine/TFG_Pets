import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '../models/Animal.model';
import { API_CONFIG } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  ip: string;

  constructor(private http: HttpClient){
    this.ip = API_CONFIG.ip;
  }

  public consultarAnimais():Observable<any>{
    return(this.http.get(this.ip+':2485/Animal/'));
  }

  public consultarAnimal(idAnimal:number):Observable<any>{
    return(this.http.get(this.ip+':2485/Animal/'+idAnimal));
  }

  public salvarAnimal(animal: Animal):Observable<any>{
    return(this.http.post(this.ip+':2485/Animal/', animal));
  }

  public atualizarAnimal(animal: Animal):Observable<any>{
    return(this.http.put(this.ip+':2485/Animal/', animal));
  }

  public desligarAnimal(idAnimal:number):Observable<any>{
    return(this.http.get(this.ip+':2485/Animal/Desligar/'+ idAnimal));
  }

  public ativarAnimal(idAnimal:number):Observable<any>{
    return(this.http.get(this.ip+':2485/Animal/Ativar/'+ idAnimal));
  }

}
