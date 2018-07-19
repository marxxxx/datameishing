import { BeerRequestModel } from './../../models/BeerRequestModel';
import { AuthService } from './../services/auth.service';
import { BeerModel } from './../../models/BeerModel';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '../../../node_modules/@angular/material';

@Component({
  selector: 'app-start-brewing',
  templateUrl: './start-brewing.component.html',
  styleUrls: ['./start-brewing.component.css']
})
export class StartBrewingComponent implements OnInit {

  beers: BeerModel[] = [];
  isBusy = false;
  isBusyRequestingBeer = false;
  selectedBeer: string;
  email: string;

  constructor(private dataService: DataService,
    private authService: AuthService,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.isBusy = true;
    this.dataService.getBeers().subscribe(r => {
      this.beers = r;
      this.isBusy = false;
    }, e => {
      this.isBusy = false;
      this.snackbar.open('Loading beers failed :-(');

    });
  }

  onRequestBeer() {
    console.log('requesting beer');
    console.log(this.authService.userProfile);
    this.isBusyRequestingBeer = true;
    const request: BeerRequestModel = {
      name: this.authService.userProfile.nickname,
      email: this.email,
      receipt: this.selectedBeer,
      timestamp: new Date()
    };
    this.dataService.requestBeer(request).subscribe(r => {
      this.snackbar.open(`Your beer request has id ${r.instanceId} and is waiting for approval.`, 'OK', {duration: 3000});
      console.log(r);
      this.isBusyRequestingBeer = false;
    }, e => {
      this.isBusyRequestingBeer = false;
      this.snackbar.open('Requesting beer failed :-(', 'OK');
    });
  }

}
