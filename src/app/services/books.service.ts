import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private apiUrl:string = environment.apiUrl

  private baseURL =`${this.apiUrl}Book/AddBook`

  constructor(private http:HttpClient) { }

  getAllBooks(){
    return this.http.get(`${this.apiUrl}Book/getAllBooks`)
  }

  postBook(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.baseURL, data, { headers });
}

}
