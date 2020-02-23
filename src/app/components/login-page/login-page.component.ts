import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmitLogin(){
    this.authService.loginEmail(this.email, this.password)
    .then( (res)=>{
      this.flashMessage.show('Usuario logado correctamente.', {cssClass:'alert alert-success', timeout: 5000}); 
      this.router.navigate(['/privado']);
    }).catch((err)=>{
      this.flashMessage.show(err.message, {cssClass:'alert alert-danger', timeout: 5000});
      this.router.navigate(['/login']);
    })
  }
  onClickGoogleLogin(){
    this.authService.loginGoogle()
    .then((res)=>{
      this.flashMessage.show('Usuario logado correctamente.', {cssClass:'alert alert-success', timeout: 5000});
      this.router.navigate(['/privado']);
    }).catch((err)=>{
      this.flashMessage.show(err.message, {cssClass:'alert alert-danger', timeout: 5000});

    })
  }

}
