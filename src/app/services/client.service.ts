import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl:string = environment.apiUrl

  private baseURL =`${this.apiUrl}Client`

  constructor(private http:HttpClient) { }

  getAllClients(){
    return this.http.get(`${this.apiUrl}Client/Clients`)
  }

  postClient(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('Data sent to API:', data); // Debug log
    return this.http.post(this.baseURL, data, { headers });
}

deleteClienttById(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}Client/${id}`);
}
}
