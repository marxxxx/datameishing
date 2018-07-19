import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profile: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {

    if (this.authService.isAuthenticated()) {
      this.loadProfile();
    }


    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      console.log('UserProfileComponent ' + isLoggedIn);
      if (isLoggedIn) {
        this.loadProfile();
      } else {
        this.profile = null;
      }
    });

  }

  loadProfile() {
    if (this.authService.userProfile) {
      console.log('having profile');
      this.profile = this.authService.userProfile;
    } else {
      this.authService.getProfile((err, profile) => {
        this.profile = profile;
        console.log('got profile');
      });
    }
  }

}
