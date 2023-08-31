import { Component,OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionesService } from 'src/app/servicios/funciones.service';
import { NgbModule,NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[DatePipe]
})
export class HomeComponent  implements OnInit{


  public listaEquipos:any = [];


  currentPage: number = 1;
  totalPages: number = 0;
  pagesToShow: number = 20;
  cantRegistros:number = 15;
  totalRecords: number = 919;

  fechaInicial:any;
  fechafinal:any;


  constructor(private router:Router,private funciones:FuncionesService,private datePipe:DatePipe){}

  ngOnInit(): void {
    if(localStorage.getItem("session") == undefined){
      this.router.navigate(['/login']);
    }
    this.getEquipos();
  }

  getEquipos(inicio=1,fin=this.cantRegistros){
    this.funciones.getEquipos(inicio,fin).subscribe((resp:any)=>{
      console.log(resp)
      this.listaEquipos = resp.content;
      this.totalPages = Math.ceil(resp.totalElements / this.cantRegistros);
    });
  }


getPagesToShow(): number[] {
  const startPage = Math.max(1, this.currentPage - Math.floor(this.pagesToShow / 2));
  const endPage = Math.min(this.totalPages, startPage + this.pagesToShow - 1);
  //this.getEquipos(startPage,endPage);
  return Array.from({ length: (endPage - startPage) + 1 }, (_, i) => startPage + i);
}
goToPage(page:any){
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.getEquipos(this.currentPage,this.cantRegistros);
  }
}


nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.getEquipos(this.currentPage,this.cantRegistros);
  }
}

prevPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.getEquipos(this.currentPage,this.cantRegistros);
  }
}

  editar(id:any){
    //abro el modal
    this.router.navigate(['/editar/'+id]);
  }
  eliminar(id:any):any{
    if (confirm("¿Está seguro que desea borrar este equipo?") == true) {
      this.funciones.eliminaEquipo(id).subscribe((resp)=>{
        alert("Eliminado con éxito"); 
        this.getEquipos(this.currentPage,this.cantRegistros);
      });
    }
    else{
      return false;
    }
  }
  crear(){
    this.router.navigate(['/crear']);
  }

  filtrar(){
    
      if(this.fechaInicial == "")
      {
        alert("Seleccione la fecha inicial para poder filtrar");

      }
      else if(this.fechafinal == "")
      {
          alert("Seleccione la fecha final para poder filtrar");
      }
      else{
        this.funciones.buscarPorFecha(this.datePipe.transform(this.fechaInicial, 'dd-MM-yyyy'),this.datePipe.transform(this.fechafinal, 'dd-MM-yyyy')).subscribe((resp:any)=>{
            console.log(resp);
            this.listaEquipos = resp;
            
            this.totalPages = Math.ceil(resp.length / this.cantRegistros);
        });
      }
  }
  logout(){
    if(confirm("¿Desea cerrar la sesión?")){
      this.funciones.logout().subscribe((resp:any)=>{
        this.router.navigate(['/login']);
        localStorage.removeItem('session');
      });
      
      this.router.navigate(['/login']);
      localStorage.removeItem('session');
    }
  }

}
