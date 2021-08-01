import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = fb.group ({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
   }

   login(): void {
     if(this.form.invalid) {
       return;
     }
     this.userService.login(this.form.value).subscribe({
       next: () => {
        this.router.navigate(['/']);
       },
       error: (err) => {
         console.log(err);
         
       }
     }); 
   }
  }
