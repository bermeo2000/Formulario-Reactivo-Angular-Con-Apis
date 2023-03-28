import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { TablaPipe } from './pipes/tabla.pipe';
import { TecnicosComponent } from './components/tecnicos/tecnicos.component';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './pages/nav/nav.component';
import { PresidentesComponent } from './components/presidentes/presidentes.component';

@NgModule({
  declarations: [
    AppComponent,
    JugadoresComponent,
    EquiposComponent,
    TablaPipe,
    TecnicosComponent,
    HomeComponent,
    NavComponent,
    PresidentesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
