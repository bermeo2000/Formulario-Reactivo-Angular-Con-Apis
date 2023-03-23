import { Injectable } from '@angular/core';
import {HttpClient,HttpParams, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Tecnicos } from './../interfaces/tecnicos';
@Injectable({
  providedIn: 'root'
})
export class TecnicosService {
  constructor(private http:HttpClient) { }
  getTecnico(){
    return this.http.get<any>(`${environment.urlApi}tecnico`)
  }

  storeTecnico(form:Tecnicos){
    let data = new FormData();
    data.append('nombre', form.nombre.toString());
    data.append('apellido', form.apellido.toString());
    data.append('cedula', form.cedula.toString());
    data.append('telefono', form.telefono.toString());
    data.append('direccion', form.direccion.toString());
    data.append('foto', form.foto);

    return this.http.post<any>(`${environment.urlApi}tecnico`, data);
  }

  updateTecnico(form:any, id:number){
    return this.http.put<any>(`${environment.urlApi}tecnico/${id}`, form)
  }

  deleteTecnico(id:number){
    return this.http.delete<any>(`${environment.urlApi}tecnico/${id}`)
  }

  editImageTecnico(form:any){
    console.log(form);
    
    const params = new FormData();
    params.append('foto', form.foto);
    return this.http.post<any>(`${environment.urlApi}edit-foto-tecnico/${form.id}`,params)
  }

  showTecnico(id:any){
    return this.http.get<any>(`${environment.urlApi}tecnico/${id}`)
  }
}
