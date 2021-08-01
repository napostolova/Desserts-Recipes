import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router } from '@angular/router';
import { UserService} from '../user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { 
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rePassword: ['', [Validators.required]]
    });
  }

  register(): void {
    if(this.form.invalid) {
      console.log('Invalid form');
           return;
    }
    this.userService.register(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

 

}
