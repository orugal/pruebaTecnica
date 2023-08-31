import { Component,OnInit } from '@angular/core';
import { FuncionesService } from 'src/app/servicios/funciones.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
  providers:[DatePipe]
})
export class CrearComponent {

  public datosEquipo:any = {
    nombre:"",
    estadio:"",
    sitioWeb:"",
    nacionalidad:"",
    fundacion:"",
    entrenador:"",
    capacidad:"",
    valor:""
}
public error:any = "";
public id: any;
public dataEquipo:any=[];
constructor(private router:Router,private funciones:FuncionesService,private ac:ActivatedRoute,private datePipe:DatePipe){}

ngOnInit(): void {
  if(localStorage.getItem("session") == undefined){
    this.router.navigate(['/login']);
  }
  this.id = this.ac.snapshot.paramMap.get('id');
}

editar(){
  //valido campos
  if(this.datosEquipo.nombre == ""){
    this.error = "Debe escribir el nombre";
  }
  else if(this.datosEquipo.estadio == ""){
    this.error = "Debe escribir el estadio";
  }
  else if(this.datosEquipo.sitioWeb == ""){
    this.error = "Debe escribir el sitio web";
  }
  else if(this.datosEquipo.nacionalidad == ""){
    this.error = "Debe escribir la nacionalidad";
  }
  else if(this.datosEquipo.fundacion ==""){
    this.error = "Debe seleccionar el año de fundación";
  }
  else if(this.datosEquipo.entrenador == ""){
    this.error = "Debe escribir el entrenador";
  }
  else if(this.datosEquipo.capacidad == ""){
    this.error = "Debe escribir la capacidad";
  }
  else if(this.datosEquipo.valor == ""){
    this.error = "Debe escribir el valor";
  }
  else{
    if(confirm("Está apunto de crear un nuevo equipo, ¿Desea continuar?")){
      // this.datosEquipo.fundacion = this.datePipe.transform(this.datosEquipo.fundacion, 'dd-MM-yyyy');
      //procedo a llamar el api para edicion
      this.funciones.crearEquipo(this.datosEquipo).subscribe((resp)=>{
        console.log(resp)
        alert("Creado con éxito")
        location.reload();
      });
    }
  }
}
regresar(){
  
  this.router.navigate(['/home']);
}
}
