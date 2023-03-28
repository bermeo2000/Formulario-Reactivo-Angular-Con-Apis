import { PresidentesComponent } from './components/presidentes/presidentes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { TecnicosComponent } from './components/tecnicos/tecnicos.component';
import { EquiposComponent } from './components/equipos/equipos.component';


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
  {
    path: 'equipos',
    component: EquiposComponent
  },
  {
    path: 'presidente',
    component: PresidentesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
