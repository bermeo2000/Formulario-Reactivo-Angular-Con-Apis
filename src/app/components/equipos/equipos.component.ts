import { Reequipos } from './../../interfaces/reequipos';
import { Equipos } from './../../interfaces/equipos';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { EquiposService } from 'src/app/services/equipos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent {
  equipos: Reequipos[] = [];
  public formEquipos!: FormGroup;
  public formUpdateEquipos!: FormGroup;
  carga: boolean = false;
  file: File | any;
  fileSelect:any;
  url: string = environment.urlImgequi;

  equip:any

  isAdd:boolean = false;

  isUpdate:boolean = false;
  
  idForUpdate:number = 0;

  text:string = '';

  imagen:any;

  constructor(
    private formBuilder: FormBuilder,
    private EquipoSer: EquiposService
  ) {

    this.formEquipos = formBuilder.group({
      nombre: ['', [Validators.required]],
      foto: ['', [Validators.required]]
    });

    this.formUpdateEquipos = formBuilder.group({
      nombre: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();
      }
      getAll(){
        this.EquipoSer.getEquipo().subscribe({
          next: (res) => {
            this.equipos = [];
            this.equipos = res;
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
          this.formEquipos.controls['foto'].setValue(this.file.name)
    
          let data:Equipos = {
            nombre: this.formEquipos.value.nombre,
            foto: this.file
          }
    
          if(this.formEquipos.valid){
            this.EquipoSer.storeEquipo(data).subscribe({
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
            this.formEquipos.reset();
            this.fileSelect = null;
          } else {
            this.formEquipos.markAllAsTouched();
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
        if(this.formUpdateEquipos.valid){
          let data:Equipos = { //aqui uso la interface de tipos porque tiene solo el campo descripcion
            nombre: this.formUpdateEquipos.value.nombre,
            foto: this.file
          }
          this.EquipoSer.updateEquipo(data, this.idForUpdate).subscribe({
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
          this.formUpdateEquipos.markAllAsTouched();
        }
    
      }
    
      edit(id:number){
    debugger
        this.idForUpdate = id;
    debugger
        this.equip = this.equipos.find(e => e.id == id);
        
        debugger
        if(this.equip){
          this.formUpdateEquipos.controls['nombre'].setValue(this.equip.nombre)
        }
    debugger
        this.isUpdate = true;
    
      }
    
      delete(id:number){
        this.EquipoSer.deleteEquipo(id).subscribe({
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
          
        this.EquipoSer.editImageEquipo(this.imagen).subscribe({
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
