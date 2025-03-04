import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
    contacts: any[] = [];
    errorMessage: string | null = null;
    private apiUrl = 'http://localhost:8000/api/contact/index'; // URL de l'API
  
    constructor(private http: HttpClient) {}
  
    ngOnInit(): void {
      this.loadArticles();
    }
  
    trackById(index: number, contact: any): number {
      return contact.id;
    }
  
    loadArticles(): void {
      this.http.get<any[]>(this.apiUrl).subscribe({
        next: (data) => {
          this.contacts = data;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des contacts :', error);
          this.errorMessage = 'Impossible de charger les contacts.';
        },
      });
    }
}
