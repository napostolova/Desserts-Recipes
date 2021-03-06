import { Component } from '@angular/core';
import { UserService } from './user/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  get isAuthenticated(): boolean {
    return this.userService.user === undefined;
  }

  constructor (
    private userService: UserService
  ) {
    this.userService.userProfile().subscribe({
      error: () => {
        this.userService.user = null;
      }
    })
   
  }

  title = 'recipes';
}
