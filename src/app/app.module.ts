import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SimulationComponent } from './simulation/simulation.component';
import { InitDataComponent } from './init-data/init-data.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {InitDataService} from './init-data/init-data.service';
import {SimulationService} from './simulation/simulation.service';

@NgModule({
  declarations: [
    AppComponent,
    SimulationComponent,
    InitDataComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ InitDataService,
               SimulationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
