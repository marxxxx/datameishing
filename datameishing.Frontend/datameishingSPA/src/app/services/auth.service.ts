import { Injectable, EventEmitter } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userProfile: any;

  auth0 = new auth0.WebAuth({
    clientID: 'zAGUrmHHWj8JjvNYBrO3pe4qGDlD3x1U',
    domain: 'datamaishing.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://datamaishing.at',
    redirectUri: location.href + 'callback',
    scope: 'openid profile'
  });

  isLoggedIn$: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public router: Router) { }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);

        if (this.isAuthenticated()) {
          this.isLoggedIn$.next(true);
        }

        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public checkAuthenticated(): void {
    if (this.isAuthenticated()) {
      console.log('user is authenticated');
      this.isLoggedIn$.next(true);
    }
  }

  public getAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);

    this.isLoggedIn$.next(false);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }
}
