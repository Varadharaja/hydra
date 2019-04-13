import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Goal } from '../../contracts/goal';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class HydraApiService {

  private apiUrl = 'api/';

  constructor( private http: HttpClient) { }

  getGoals(goalId: string)
  {
    return this.http.get<Goal[]>(this.apiUrl + "?goalId=" + goalId) ;
  }
}
