import { Component, OnInit} from '@angular/core';
import { Tecnicos } from '../../../app/interfaces/tecnicos';
import { Retecnicos } from '../../../app/interfaces/retecnicos';
import { TecnicosService } from 'src/app/services/tecnicos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tecnicos',
  templateUrl: './tecnicos.component.html',
  styleUrls: ['./tecnicos.component.css']
})
export class TecnicosComponent implements OnInit{
  tecnico: Retecnicos[] = [];
  public formTecnico!: FormGroup;
  public formUpdateTecnico!: FormGroup;
  cargo: boolean = false;
  file: File | any;
  fileSelect:any;
  url: string = environment.urlImgTec;

  tecni:any

  isAdd:boolean = false;

  isUpdate:boolean = false;
  
  idForUpdate:number = 0;

  text:string = '';

  imagen:any;

  constructor(
    private formBuilder: FormBuilder,
    private tecnicosSer: TecnicosService
  ) {

    this.formTecnico = formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      foto: ['', [Validators.required]]
    });

    this.formUpdateTecnico= formBuilder.group({
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
        this.tecnicosSer.getTecnico().subscribe({
          next: (res) => {
          this.tecnico = [];
          this.tecnico = res;
            this.cargo = true;this.tecnico
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
          this.formTecnico.controls['foto'].setValue(this.file.name)
    
          let data:Tecnicos = {
            nombre: this.formTecnico.value.nombre,
            apellido: this.formTecnico.value.apellido,
            cedula: this.formTecnico.value.cedula,
            telefono: this.formTecnico.value.telefono,
            direccion: this.formTecnico.value.direccion,
            foto: this.file
          }
    
          if(this.formTecnico.valid){
            this.tecnicosSer.storeTecnico(data).subscribe({
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
            this.formTecnico.reset();
            this.fileSelect = null;
          } else {
            this.formTecnico.markAllAsTouched();
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
        if(this.formUpdateTecnico.valid){
          let data:Tecnicos = { //aqui uso la interface de tipos porque tiene solo el campo descripcion
            nombre: this.formUpdateTecnico.value.nombre,
            apellido: this.formUpdateTecnico.value.apellido,
            cedula: this.formUpdateTecnico.value.cedula,
            telefono: this.formUpdateTecnico.value.telefono,
            direccion: this.formUpdateTecnico.value.direccion,
            foto: this.file
          }
          this.tecnicosSer.updateTecnico(data, this.idForUpdate).subscribe({
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
          this.formUpdateTecnico.markAllAsTouched();
        }
    
      }
    
      edit(id:number){
    debugger
        this.idForUpdate = id;
    debugger
        this.tecni = this.tecnico.find(e => e.id == id);
        
        debugger
        if(this.tecni){
          this.formUpdateTecnico.controls['nombre'].setValue(this.tecni?.nombre)
          this.formUpdateTecnico.controls['apellido'].setValue(this.tecni?.apellido)
          this.formUpdateTecnico.controls['cedula'].setValue(this.tecni?.cedula)
          this.formUpdateTecnico.controls['telefono'].setValue(this.tecni?.telefono)
          this.formUpdateTecnico.controls['direccion'].setValue(this.tecni?.direccion)
    
    
        }
    debugger
        this.isUpdate = true;
    
      }
    
      delete(id:number){
        this.tecnicosSer.deleteTecnico(id).subscribe({
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
          
        this.tecnicosSer.editImageTecnico(this.imagen).subscribe({
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
