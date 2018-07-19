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

  constructor(private dataService: DataService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.isBusy = true;
    this.dataService.getBeers().subscribe( r => {
      this.beers = r;
      this.isBusy = false;
    }, e => {
      this.isBusy = false;
      this.snackbar.open('Loading beers failed :-(');

    });
  }

}
