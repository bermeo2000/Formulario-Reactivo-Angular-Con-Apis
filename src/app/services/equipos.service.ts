import { Equipos } from './../interfaces/equipos';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor(private http:HttpClient) { }
  getEquipo(){
    return this.http.get<any>(`${environment.urlApi}equipos`)
  }

  storeEquipo(form:Equipos){
    let data = new FormData();
    data.append('nombre', form.nombre.toString());
    data.append('foto', form.foto);

    return this.http.post<any>(`${environment.urlApi}equipos`, data);
  }

  updateEquipo(form:any, id:number){
    return this.http.put<any>(`${environment.urlApi}equipos/${id}`, form)
  }

  deleteEquipo(id:number){
    return this.http.delete<any>(`${environment.urlApi}equipos/${id}`)
  }

  editImageEquipo(form:any){
    console.log(form);
    
    const params = new FormData();
    params.append('foto', form.foto);
    return this.http.post<any>(`${environment.urlApi}edit-foto-equipos/${form.id}`,params)
  }

  showEquipo(id:any){
    return this.http.get<any>(`${environment.urlApi}equipos/${id}`)
  }
}
