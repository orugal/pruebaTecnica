import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FuncionesService } from 'src/app/servicios/funciones.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  public Usuario: any = '';
  public Password: any = '';
  public error:any = "";

  constructor(private router:Router,private funciones:FuncionesService){}
  
  ngOnInit(): void {
  }

  login(){
    //valido campos
    if(this.Usuario == ""){
      this.error = "Debe escribir el usuario";
    }
    else if(this.Password == ""){
      this.error = "Debe escribir la contraseña";
    }
    else{
      let data = {Usuario:this.Usuario,Password:this.Password}
      //procedo a consultar el api REST con el método pos
      this.funciones.login(data).subscribe((resp:any)=>{
        this.router.navigate(['/home']);
      });
      localStorage.setItem("session","1");
      this.router.navigate(['/home']);
      
    }
    
  }

}
