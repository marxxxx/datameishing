import { BeerRequestModel } from './../../models/BeerRequestModel';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BeerModel } from '../../models/BeerModel';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiBaseUrl = environment.BackendRootUrl + 'api/';
  subscription: PushSubscription;
  beerRequestApproval$: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private http: HttpClient) { }

  getBeers(): Observable<BeerModel[]> {
    const url = `${this.apiBaseUrl}Beer`;

    const accessToken = localStorage.getItem('access_token');
    console.log('accessToken = ' + accessToken);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    return this.http.get<BeerModel[]>(url, {
      headers: headers
    });
  }

  setPushSubscription(sub: PushSubscription) {
    this.subscription = sub;
  }

  requestBeer(request: BeerRequestModel): Observable<any> {

    console.log('requesting beer ...');
    request.subscriptionEndpoint = this.subscription.endpoint;

    const subJSObject = JSON.parse(JSON.stringify(this.subscription));

    console.log(subJSObject);

    // const jsonSub = JSON.parse(this.subscription.toJSON());
    request.auth =  subJSObject.keys.auth;
    request.p256dh =  subJSObject.keys.p256dh;
    console.log(request);
    const beerStarterUrl = 'https://beerstarterfunction.azurewebsites.net/api/RequestBrewFunction';

    return this.http.post<any>(beerStarterUrl, request);
  }

  arrayBufferToString(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }

  setBeerRequestApprovalResponse(result: boolean) {
    this.beerRequestApproval$.next(result);
  }
}
