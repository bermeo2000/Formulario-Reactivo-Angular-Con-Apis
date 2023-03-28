import { Component, OnInit} from '@angular/core';
import { Jugadores } from '../../../app/interfaces/jugadores';
import { Rejugadores } from '../../../app/interfaces/rejugadores';
import { JugadoresService } from 'src/app/services/jugadores.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {
/* de aqui */
  jugador: Rejugadores[] = [];
  public formJugadores!: FormGroup;
  public formUpdateJugadores!: FormGroup;
  carga: boolean = false;
  file: File | any;
  fileSelect:any;
  url: string = environment.urlImgJug;

  jugad:any

  isAdd:boolean = false;

  isUpdate:boolean = false;
  
  idForUpdate:number = 0;

  text:string = '';

  imagen:any;


  constructor(
    private formBuilder: FormBuilder,
    private jugadoresSer: JugadoresService
  ) {

    this.formJugadores = formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      foto: ['', [Validators.required]]
    });

    this.formUpdateJugadores = formBuilder.group({
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
    this.jugadoresSer.getJugador().subscribe({
      next: (res) => {
        this.jugador = [];
        this.jugador = res;
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
    if (this.file) {
      this.formJugadores.controls['foto'].setValue(this.file.name)

      let data:Jugadores = {
        nombre: this.formJugadores.value.nombre,
        apellido: this.formJugadores.value.apellido,
        cedula: this.formJugadores.value.cedula,
        telefono: this.formJugadores.value.telefono,
        direccion: this.formJugadores.value.direccion,
        foto: this.file
      }

      if(this.formJugadores.valid){
        this.jugadoresSer.storeJugador(data).subscribe({
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
        this.formJugadores.reset();
        this.fileSelect = null;
      } else {
        this.formJugadores.markAllAsTouched();
        this.getAll();
      }

    } else {
      Swal.fire({
        title: 'Warning!',
        text: 'La foto es requerida',
        icon: 'warning',
        confirmButtonText: 'Ok'
      })

    }
  }

  getFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.fileSelect = reader.result;
    };
   
    this.file = (event.target).files[0];
  }

  update(){
    if(this.formUpdateJugadores.valid){
      let data:Jugadores = { //aqui uso la interface de tipos porque tiene solo el campo descripcion
        nombre: this.formUpdateJugadores.value.nombre,
        apellido: this.formUpdateJugadores.value.apellido,
        cedula: this.formUpdateJugadores.value.cedula,
        telefono: this.formUpdateJugadores.value.telefono,
        direccion: this.formUpdateJugadores.value.direccion,
        foto: this.file
      }
      this.jugadoresSer.updateJugador(data, this.idForUpdate).subscribe({
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
      this.formUpdateJugadores.markAllAsTouched();
    }

  }

  edit(id:number){
debugger
    this.idForUpdate = id;
debugger
    this.jugad = this.jugador.find(e => e.id == id);
    
    debugger
    if(this.jugad){
      this.formUpdateJugadores.controls['nombre'].setValue(this.jugad?.nombre)
      this.formUpdateJugadores.controls['apellido'].setValue(this.jugad?.apellido)
      this.formUpdateJugadores.controls['cedula'].setValue(this.jugad?.cedula)
      this.formUpdateJugadores.controls['telefono'].setValue(this.jugad?.telefono)
      this.formUpdateJugadores.controls['direccion'].setValue(this.jugad?.direccion)


    }
debugger
    this.isUpdate = true;

  }

  delete(id:number){
    this.jugadoresSer.deleteJugador(id).subscribe({
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

  getFiles(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.fileSelect = reader.result;
    };
   
    this.file = (event.target).files[0];
     this.imagen = {
      id: this.idForUpdate,
      imagen: this.file,
    };
      
    this.jugadoresSer.editImageJugador(this.imagen).subscribe({
      next:(res)=> {
        console.log(res);
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
          title: 'Ocurrió un problema al actualizar',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
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