import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { WeatherEvent } from '../classes/weather-event';

@Injectable({
  providedIn: 'root'
})
export class ScrapeService {

  private apiBaseUrl = environment.apiBaseUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    })
  };

  constructor(private http: HttpClient) { }

  public fetchExchange(): Observable<any> {
    //alert('call');
    const url: string = `${this.apiBaseUrl}/exchange`;
    return this.http.get(url);
  }

  fetchWeather() {
    const url: string = `${this.apiBaseUrl}/weather`;
    return this.http.get(url);
  }

  createcarousel():Observable<any>{
    const ret:WeatherEvent[]=[];
    const url: string = `${this.apiBaseUrl}/weatherevent`;
    return this.http.get(url);
    //return ret;
  }

  private getToken(): string {
    let uToken = '';
    //讀取token目前沒有
    // const str = Storage.getItem('userObj');
    // if (str) {
    //   let data = str === null ? '' : JSON.parse(str as string);
    //   uToken = data.token;
    //  }    
     return uToken;
  }

}
