import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BeerModel } from '../../models/BeerModel';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = environment.BackendRootUrl + 'api/';

  constructor(private http: HttpClient) { }

  getBeers(): Observable<BeerModel[]> {
    const url = `${this.baseUrl}Beer`;

    const accessToken = localStorage.getItem('access_token');
    console.log('accessToken = ' + accessToken);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    return this.http.get<BeerModel[]>(url, {
      headers: headers
    });
  }
}
