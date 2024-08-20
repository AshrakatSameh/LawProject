import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private apiUrl:string = environment.apiUrl

  private baseURL =`${this.apiUrl}Article/CreateArticle`

  constructor(private http:HttpClient) { }

  getAllArticles(){
    return this.http.get(`${this.apiUrl}Article/Articles`)
  }

  postArticle(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('Data sent to API:', data); // Debug log
    return this.http.post(this.baseURL, data, { headers });
}

deleteArticleById(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}Article/${id}`);
}
}
