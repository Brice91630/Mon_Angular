import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {
  comments: any[] = [];
  errorMessage: string | null = null;
  private apiUrl = 'http://localhost:8000/api/comment'; // URL de l'API
  router: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  trackById(index: number, comment: any): number {
    return comment.id;
  }

  HomeRedirect(): void {
    this.router.navigate(['/src/app/pages/home/home.component.html']);
  }

  loadArticles(): void {
    this.http.get<any[]>(`${this.apiUrl}/index`).subscribe({
      next: (data) => {
        this.comments = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des commentaires :', error);
        this.errorMessage = 'Impossible de charger les commentaires.';
      },
    });
  }

  deleteComment(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      this.http.delete(`${this.apiUrl}/delete/${id}`).subscribe({
        next: () => {
          this.comments = this.comments.filter(comment => comment.id !== id);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du commentaire :', error);
          this.errorMessage = 'Impossible de supprimer le commentaire.';
        },
      });
    }
  }
}
