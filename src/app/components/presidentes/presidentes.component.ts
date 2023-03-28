import { Presidentes } from './../../interfaces/presidente';
import { PresidenteService } from './../../services/presidentes.service';
import { Component, OnInit} from '@angular/core';
import { Represidentes } from 'src/app/interfaces/represidente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-presidentes',
  templateUrl: './presidentes.component.html',
  styleUrls: ['./presidentes.component.css']
})
export class PresidentesComponent implements OnInit {
/* de aqui */
presidentes: Represidentes[] = [];
public formPresidentes!: FormGroup;
public formUpdatePresidentes!: FormGroup;
carga: boolean = false;

presi:any

isAdd:boolean = false;

isUpdate:boolean = false;

idForUpdate:number = 0;

text:string = '';


  constructor(
    private formBuilder: FormBuilder,
    private presidenteSer: PresidenteService
  ) {

    this.formPresidentes = formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    });

    this.formUpdatePresidentes = formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
this.getAll();
  }
  
  getAll(){
    this.presidenteSer.getPresidente().subscribe({
      next: (res) => {
        this.presidentes = [];
        this.presidentes = res;
        this.carga = true;
      },
      error: (err) => {
          console.log(err);
          Swal.fire({
            title: 'Ocurrió un problema con la carga de datos',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
      },
    });
  }
  store(){
    if (this.formPresidentes.valid) {

      let data:Presidentes = {
        nombre: this.formPresidentes.value.nombre,
        apellido: this.formPresidentes.value.apellido,
        cedula: this.formPresidentes.value.cedula,
        telefono: this.formPresidentes.value.telefono,
        direccion: this.formPresidentes.value.direccion,
      }

      if(this.formPresidentes.valid){
        this.presidenteSer.storePresidente(data).subscribe({
          next: (res) => {
            console.log(res);
            this.getAll();
            Swal.fire({
              title: res.message,
              /* text: res.message, */
              icon: 'success',
              confirmButtonText: 'Ok'
            })
          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              title: 'Ocurrió un problema con el registro',
              text: err.message,
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          }
        });
        this.getAll();
        this.isAdd = false;
        this.formPresidentes.reset();
      } else {
        this.formPresidentes.markAllAsTouched();
        this.getAll();
      }

    } 
  }


  update(){
    if(this.formUpdatePresidentes.valid){
      let data:Presidentes = { //aqui uso la interface de tipos porque tiene solo el campo descripcion
        nombre: this.formUpdatePresidentes.value.nombre,
        apellido: this.formUpdatePresidentes.value.apellido,
        cedula: this.formUpdatePresidentes.value.cedula,
        telefono: this.formUpdatePresidentes.value.telefono,
        direccion: this.formUpdatePresidentes.value.direccion
            }
      this.presidenteSer.updatePresidente(data, this.idForUpdate).subscribe({
        next: (res) => {
          console.log(res);
          this.getAll();
          Swal.fire({
            title: res.message,
            /* text: res.message, */
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        },
        error(err) {
          console.log(err);
          Swal.fire({
            title: 'Ocurrió un problema al actualizar',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        },
      });
      
      this.getAll();
      this.isUpdate = false;
      this.idForUpdate = 0;
    }else{
      this.formUpdatePresidentes.markAllAsTouched();
    }

  }

  edit(id:number){
debugger
    this.idForUpdate = id;
debugger
    this.presi = this.presidentes.find(e => e.id == id);
    
    debugger
    if(this.presi){
      this.formUpdatePresidentes.controls['nombre'].setValue(this.presi?.nombre)
      this.formUpdatePresidentes.controls['apellido'].setValue(this.presi?.apellido)
      this.formUpdatePresidentes.controls['cedula'].setValue(this.presi?.cedula)
      this.formUpdatePresidentes.controls['telefono'].setValue(this.presi?.telefono)
      this.formUpdatePresidentes.controls['direccion'].setValue(this.presi?.direccion)


    }
debugger
    this.isUpdate = true;

  }

  delete(id:number){
    this.presidenteSer.deletePresidente(id).subscribe({
      next: (value) => {
        /* console.log(value); */
        this.getAll();
        Swal.fire({
          title: value.message,
          /* text: res.message, */
          icon: 'info',
          confirmButtonText: 'Ok'
        })
      }, error(err) {
        console.log(err);
        Swal.fire({
          title: 'Ocurrió un problema al eliminar',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      },
    });
  }


  regresar(){
    this.isAdd = false;
    this.isUpdate = false;
  }

  agregar(){
    this.isAdd = true;
    this.isUpdate = false;
  }

}


