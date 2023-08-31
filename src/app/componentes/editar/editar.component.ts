import { Component,OnInit } from '@angular/core';
import { FuncionesService } from 'src/app/servicios/funciones.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  providers:[DatePipe]
})
export class EditarComponent implements OnInit{

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
    //consulto la información del id seleccionado
    this.funciones.getInfoEquipo(this.id).subscribe((resp)=>{
      console.log(resp);
      this.datosEquipo = resp;
      this.datosEquipo.fundacion = this.datePipe.transform(this.datosEquipo.fundacion, 'yyyy-MM-dd');
    });
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
    else if(this.datosEquipo.fundacion =="dd/mm/aaaa"){
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
      if(confirm("Está apunto de actualizar la data del equipo, ¿Desea continuar?")){
        //this.datosEquipo.fundacion = this.datePipe.transform(this.datosEquipo.fundacion, 'dd-MM-yyyy');
        //procedo a llamar el api para edicion
        this.funciones.updateEquipo(this.id,this.datosEquipo).subscribe((resp)=>{
          alert("Editado con éxito")
        });
      }
    }
  }
  regresar(){
    
    this.router.navigate(['/home']);
  }
}
