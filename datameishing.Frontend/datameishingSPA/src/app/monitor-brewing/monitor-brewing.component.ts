import { SwPush } from '@angular/service-worker';
import { Component, OnInit } from '@angular/core';
import { BrewTelemetryService } from '../services/brew-telemetry.service';

@Component({
  selector: 'app-monitor-brewing',
  templateUrl: './monitor-brewing.component.html',
  styleUrls: ['./monitor-brewing.component.css']
})
export class MonitorBrewingComponent implements OnInit {

  currentBeerTemp: number;

  // lineChart
  public lineChartData: Array<any> = [
    { data: [], label: 'Beer temperature' },

  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(private brewTelemetryService: BrewTelemetryService) { }

  ngOnInit() {
    this.brewTelemetryService.brewTelemetryMessages$.subscribe(m => {
      console.log('message received');
      console.log(m);
      this.currentBeerTemp = m.temp;
      const newData = this.lineChartData[0].data;
      newData.push(m.temp);
      this.lineChartData = [
        { data: newData, label: 'Beer temperature' }
      ];
      this.lineChartLabels.push(new Date().toLocaleTimeString());

    });
  }



}
