import { HttpClient } from '@angular/common/http';
import { Component,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  logiObj: any ={
    "email":"",
    "password":""
  }

  http= inject(HttpClient);
  router = inject(Router);

  onLogin() {
    this.http.post("http://localhost:8000/api/login", this.logiObj).subscribe({
      next: (res: any) => {
        if (res.token) {
          localStorage.setItem('token',res.token);
          alert("Connexion réussie");
          this.router.navigateByUrl('home');
        } else {
          alert(res.message);
        }
      },
      error: (error) => {
        console.error("Error:", error);
        alert("Une erreur est survenue: " + error.message);
      }
    });
  }
}
