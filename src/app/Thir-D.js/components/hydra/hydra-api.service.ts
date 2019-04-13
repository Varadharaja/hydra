import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class HydraApiService {

  private apiUrl = 'api/';

  constructor( private http: HttpClient) { }

  getGoals()
  {
    return this.http.get<string>(this.apiUrl);
  }
}
