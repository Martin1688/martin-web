import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WeatherEvent } from '../../classes/weather-event';
import { WeatherData, WeatherInfo } from '../../classes/weather-info';
import { ScrapeService } from '../../services/scrape.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  formError='';
  currentTime='';
  weather:WeatherData[]=[]
  today= new WeatherInfo();
  tonight= new WeatherInfo();
  tomorrow= new WeatherInfo();
  models:WeatherEvent[] | undefined;
  constructor(private scrape: ScrapeService,private route: Router) { }


  ngOnInit(): void {
    this.getWeather();
  }

  getWeather(){
    this.scrape.fetchWeather().subscribe(
      {
        next: (result: { message: string, datetime:string, data: WeatherInfo[] } | any) => {
          if (result.message === '') {
            //alert(result.data.length);
            this.today=result.data[0];
            this.tonight=result.data[1];
            this.tomorrow=result.data[2];
            for(let i=0;i<result.data[3].data.length; i++){
              const {title}=result.data[3].data[i];
              this.createitem(title);
            }
            this.bind(0);
            //this.currentTime=result.datetime;
          }
          else {
            this.formError = result.message;
          }
          document.body.scrollTop;
        },
        error: (err: HttpErrorResponse) => {
          const errResult = err.error as { message: string, data: string };
          this.formError = errResult.message;
        }
      });
  }
  bind(idx: number){
    if(idx ===0){
      this.weather=this.today.data;
      this.currentTime=this.today.datetime;
      console.log(this.today);
      //alert(this.today.datetimee);
    } else if(idx ===1){
      this.weather=this.tonight.data;
      this.currentTime=this.tonight.datetime;
      console.log(this.tonight);
      //alert(this.tonight.datetimee);
    }else if(idx ===2){
      this.weather=this.tomorrow.data;
      this.currentTime=this.tomorrow.datetime;
      console.log(this.tomorrow);
      //alert(this.tomorrow.datetimee);
    }
  }
  createitem(name:string){
    let btn = document.createElement('span');
    btn.setAttribute('class','btn btn-secondary');
   //btn.setAttribute('routerLink','/data/weathernews');
    btn.innerHTML=name;
    btn.addEventListener('click',()=>this.testevent());
    let container = document.getElementById('btntr');
    container!.append(btn);
  }

  testevent(){
    //alert('click event');
    this.route.navigate(['/data/weathernews'])
  }
}
