import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { EditarComponent } from './componentes/editar/editar.component';
import { CrearComponent } from './componentes/crear/crear.component';
const routes: Routes = [
  {path:'',component:LoginComponent, pathMatch: 'full'},
  {path:'home',component:HomeComponent, pathMatch: 'full'},
  {path:'login',component:LoginComponent, pathMatch: 'full'},
  {path:'editar/:id',component:EditarComponent, pathMatch: 'full'},
  {path:'crear',component:CrearComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
