import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ExchangeInfo } from '../../classes/exchange-info';
import { ScrapeService } from  '../../services/scrape.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {
  exchangeInfos:ExchangeInfo[]=[];
  formError='';
  currentTime='';
  constructor(private scrape: ScrapeService) { }

  ngOnInit(): void {
    this.getInfos();
  }

  getInfos(){
    this.scrape.fetchExchange().subscribe(
      {
        next: (result: { message: string, datetime:string, data: ExchangeInfo[] } | any) => {
          if (result.message === '') {
            this.exchangeInfos=result.data;
            this.currentTime=result.datetime;
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

}
