import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
  }

  onSubmitAddUser(){
    this.authService.registerUser(this.email, this.password)
    .then( (res)=> {
      this.email ='';
      this.password ='';    
      this.flashMessage.show('Usuario registrado correctamente.', {cssClass:'alert alert-success', timeout: 5000}); 
      this.router.navigate(['/privado']);
    }).catch( (err) =>{
      this.flashMessage.show(err.message, {cssClass:'alert alert-danger', timeout: 5000});
    })
  }

}
