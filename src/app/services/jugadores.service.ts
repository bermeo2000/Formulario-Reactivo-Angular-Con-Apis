import { Jugadores } from './../interfaces/jugadores';
import { Injectable } from '@angular/core';
import {HttpClient,HttpParams, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
/* import { environment } from 'src/environments/environment'; */

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  constructor(private http:HttpClient) { }
  getJugador(){
    return this.http.get<any>(`${environment.urlApi}jugador`)
  }

  storeJugador(form:Jugadores){
    let data = new FormData();
    data.append('nombre', form.nombre.toString());
    data.append('apellido', form.apellido.toString());
    data.append('cedula', form.cedula.toString());
    data.append('telefono', form.telefono.toString());
    data.append('direccion', form.direccion.toString());
    data.append('foto', form.foto);

    return this.http.post<any>(`${environment.urlApi}jugador`, data);
  }

  updateJugador(form:any, id:number){
    return this.http.put<any>(`${environment.urlApi}jugador/${id}`, form)
  }

  deleteJugador(id:number){
    return this.http.delete<any>(`${environment.urlApi}jugador/${id}`)
  }

  editImageJugador(form:any){
    console.log(form);
    
    const params = new FormData();
    params.append('foto', form.foto);
    return this.http.post<any>(`${environment.urlApi}edit-foto/${form.id}`,params)
  }

  showJugador(id:any){
    return this.http.get<any>(`${environment.urlApi}jugador/${id}`)
  }
}
