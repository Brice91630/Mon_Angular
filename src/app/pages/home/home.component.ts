import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  router = inject(Router);

  ContactRedirect():void{
    this.router.navigate(['contact'])
  }

  CommentaireRedirect():void{
    this.router.navigate(['comment'])
  }
}
