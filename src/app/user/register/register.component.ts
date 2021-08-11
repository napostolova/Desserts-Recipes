import { Component, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router } from '@angular/router';
import { Subject } from 'rxjs';
import { emailValidator, sameValue } from 'src/app/shared/validators';
import { UserService} from '../user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {

  form: FormGroup;

  removeSubscription = new Subject();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { 
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rePassword: ['', [Validators.required, sameValue (
        () => this.form?.get('password'), this.removeSubscription
      )]]
    });
  }

  register(): void {
    if(this.form.invalid) {
      console.log('Invalid form');
           return;
    }
    this.userService.register(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

 ngOnDestroy(): void {
   this.removeSubscription.next();
   this.removeSubscription.complete();
 }

}
