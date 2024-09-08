import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantsService } from '../participants.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userId: number = 1; 
  password: string = '';  
  errorMessage: string = '';

  constructor(private participantsService: ParticipantsService, private router: Router) {}

  onLogin() {
    this.participantsService.login(this.userId,this.password).subscribe((response) => {
      if (response.IsAdmin) {
        localStorage.setItem('isAdmin', 'true'); 
        this.router.navigate(['/discussion']);
      } else {
        this.errorMessage = 'You do not have the required permissions';
      }
    }, error => {
      this.errorMessage = 'Login failed';
    });
  }
  
}
