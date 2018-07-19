import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { MatSnackBar } from '../../node_modules/@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  readonly VAPID_PUBLIC_KEY = 'BJp7bbqgPW3Y0U_O7hGzng2c7gENxgTFPM_LHbt3_88c3qoFxYI61LqWz2fWhJNsIbHZOcScyUybUbpU9gSS1Hs';

  constructor(private authService: AuthService,
    private dataService: DataService,
    private pushService: SwPush,
    private updateService: SwUpdate,
    private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.authService.checkAuthenticated();

    this.updateService.available.subscribe(e => {
      this.snackbar.open(`Update available! Press F5 to install.`, 'OK');
    });

    this.updateService.activated.subscribe(e => {
      this.snackbar.open(`Update ${e.current} activated!`, 'OK', { duration: 3000 });
    });

    this.pushService.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    }).then(sub => {
      console.log('Subscription received');
      console.log(sub);
      this.dataService.setPushSubscription(sub);

      console.log(sub.toJSON());
      console.log(sub.getKey('p256dh'));
    }).catch(err => {
      console.error(err);
      this.snackbar.open('Failed to register for push notifications');
    });

    this.pushService.messages.subscribe((m: any) => {
      this.snackbar.open(m.notification.body, 'OK');
      this.dataService.setBeerRequestApprovalResponse(m.notification.result);
      console.log(m);
    });
  }
}
