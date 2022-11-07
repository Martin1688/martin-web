import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedataRoutingModule } from './sharedata-routing.module';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { WeatherComponent } from './components/weather/weather.component';
import { WeathernewsComponent } from './components/weathernews/weathernews.component';


@NgModule({
  declarations: [
    ExchangeComponent,
    WeatherComponent,
    WeathernewsComponent
  ],
  imports: [
    CommonModule,
    SharedataRoutingModule
  ]
})
export class SharedataModule { }
