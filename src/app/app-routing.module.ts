import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { TecnicosComponent } from './components/tecnicos/tecnicos.component';


const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'tecnico',
    component: TecnicosComponent
  },
  {
    path: 'jugadore',
    component: JugadoresComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
