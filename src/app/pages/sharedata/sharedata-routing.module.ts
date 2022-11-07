import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { WeatherComponent } from './components/weather/weather.component';
import { WeathernewsComponent } from './components/weathernews/weathernews.component';

const routes: Routes = [
  {
    path: '',
    component: ExchangeComponent
  },
  {
    path: 'exchange',
    component: ExchangeComponent
  },
  {
    path: 'weather',
    component: WeatherComponent
  },
  {
    path: 'weathernews',
    component: WeathernewsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedataRoutingModule { }
