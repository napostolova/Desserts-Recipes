import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { emailValidator } from 'src/app/shared/validators';

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
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
   }

   login(): void {
     if(this.form.invalid) {
       return;
     }
     this.userService.login(this.form.value).subscribe({
       next: (user) => {
         localStorage.setItem('user', user.username)
        this.router.navigate(['/recipes']);
       },
       error: (err) => {
         console.log(err);
         
       }
     }); 
   }
  }
