import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {
    //url del api
  public urlApi = "https://wo-fifa.azurewebsites.net/";
  constructor(private http:HttpClient) { }

  login(parametros:any):any{
    return this.http.post(this.urlApi+"login/",parametros);
  }
  logout():any{
    return this.http.get(this.urlApi+"logout");
  }

  getEquipos(inicio:any=0,fin:any=20){
    return this.http.get(this.urlApi+"equipos/listar/"+inicio+"/"+fin);
  }
  getInfoEquipo(id:any){
    return this.http.get(this.urlApi+"equipos/consultar/"+id);
  }

  buscarPorFecha(fechaIni:any,fechafin:any){
    return this.http.get(this.urlApi+"equipos/consultar/"+fechaIni+"/"+fechafin);
  }


  crearEquipo(data:any){
    return this.http.post(this.urlApi+"equipos/crear",data);
  }
  updateEquipo(id:any,data:any){
    return this.http.put(this.urlApi+"equipos/actualizar/"+id,data);
  }

  eliminaEquipo(id:any){
    return this.http.delete(this.urlApi+"equipos/eliminar/"+id);
  }
}
