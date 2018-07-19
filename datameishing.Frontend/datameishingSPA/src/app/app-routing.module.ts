import { CallbackComponent } from './callback/callback.component';
import { MonitorBrewingComponent } from './monitor-brewing/monitor-brewing.component';
import { StartBrewingComponent } from './start-brewing/start-brewing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'start', component: StartBrewingComponent},
  {path: 'monitor', component: MonitorBrewingComponent},
  {path: 'callback', component: CallbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
