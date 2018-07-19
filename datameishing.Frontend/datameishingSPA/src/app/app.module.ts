import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
// tslint:disable-next-line:max-line-length
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatProgressBarModule, MatProgressSpinnerModule, MatSnackBarModule, MatCardModule, MatDividerModule, MatSelectModule, MatInputModule } from '@angular/material';
import { LandingComponent } from './landing/landing.component';
import { StartBrewingComponent } from './start-brewing/start-brewing.component';
import { MonitorBrewingComponent } from './monitor-brewing/monitor-brewing.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { CallbackComponent } from './callback/callback.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule } from '../../node_modules/@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LandingComponent,
    StartBrewingComponent,
    MonitorBrewingComponent,
    CallbackComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
    MatDividerModule,
    FlexLayoutModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [DataService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
