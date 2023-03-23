import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tabla'
})
export class TablaPipe implements PipeTransform {

  transform(arreglo: any[], texto: string): any[] {

    /* Este filto/pipe solo sirve para 
    buscar los que tienen el campo 
    descripcion: tipo, categoria, marca */

    if(texto === ''){
      return arreglo;
    }
    
    const result = [];
    for(const t of arreglo){
      if(t.nombre.toLowerCase().indexOf(texto.toLowerCase()) > -1){
        result.push(t);
      }
    }
    return result;
  }

}
