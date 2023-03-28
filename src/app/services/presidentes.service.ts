import { Presidentes } from './../interfaces/presidente';
import { Injectable } from '@angular/core';
import {HttpClient,HttpParams, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
/* import { environment } from 'src/environments/environment'; */

@Injectable({
  providedIn: 'root'
})
export class PresidenteService {

  constructor(private http:HttpClient) { }
  getPresidente(){
    return this.http.get<any>(`${environment.urlApi}Presidente`)
  }

  storePresidente(form:Presidentes){
    let data = new FormData();
    data.append('nombre', form.nombre.toString());
    data.append('apellido', form.apellido.toString());
    data.append('cedula', form.cedula.toString());
    data.append('telefono', form.telefono.toString());
    data.append('direccion', form.direccion.toString());


    return this.http.post<any>(`${environment.urlApi}Presidente`, data);
  }

  updatePresidente(form:any, id:number){
    return this.http.put<any>(`${environment.urlApi}Presidente/${id}`, form)
  }

  deletePresidente(id:number){
    return this.http.delete<any>(`${environment.urlApi}Presidente/${id}`)
  }

  showPresidente(id:any){
    return this.http.get<any>(`${environment.urlApi}Presidente/${id}`)
  }
}
