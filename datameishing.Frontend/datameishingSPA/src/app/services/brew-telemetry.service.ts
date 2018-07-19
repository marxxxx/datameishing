import { environment } from './../../environments/environment.prod';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SignalRConnectionInfo } from '../../models/SignalRConnectionInfo';
import { BrewTelemetryModel } from '../../models/BrewTelemetryModel';


@Injectable({
  providedIn: 'root'
})
export class BrewTelemetryService {


  private hubConnection: HubConnection;
  brewTelemetryMessages$: EventEmitter<BrewTelemetryModel> = new EventEmitter<BrewTelemetryModel>();

  constructor(private http: HttpClient) {
  }

  private getConnectionInfo(): Observable<SignalRConnectionInfo> {
    const requestUrl = `${environment.BrewTelemetryBaseUrl}negotiate`;
    return this.http.get<SignalRConnectionInfo>(requestUrl);
  }

  init() {
    this.getConnectionInfo().subscribe(info => {
      const options = {
        accessTokenFactory: () => info.accessKey
      };

      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(info.endpoint, options)
        .configureLogging(signalR.LogLevel.Information)
        .build();

      this.hubConnection.start().catch(err => console.error(err.toString()));

      this.hubConnection.on('brewTelemetry', (data: any) => {
        console.log(data);
        console.log('brewTelemetry received: ');
        this.brewTelemetryMessages$.next(JSON.parse(data));
      });
    });
  }

  // send(message: string): Observable<void> {
  //     const requestUrl = `${this._baseUrl}message`;
  //     return this.http.post(requestUrl, message).pipe(map((result: any) => { }));
  // }
}
