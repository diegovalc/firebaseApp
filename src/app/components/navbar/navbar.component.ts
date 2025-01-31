import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLogin: boolean;
  public nombreUsuario: string;
  public emailUsuario: string;
  public fotoUsuario: string;

  constructor(
    private authService: AuthService,
  
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe( auth =>{
      if (auth){
        this.isLogin = true;
        this.nombreUsuario= auth.displayName;
        this.emailUsuario = auth.email;
        this.fotoUsuario = auth.photoURL;
        console.log(this.nombreUsuario);
      }else{
        this.isLogin = false;
      }
    })
  }

  onClickLogout(){
    this.authService.logout();
  }
}
