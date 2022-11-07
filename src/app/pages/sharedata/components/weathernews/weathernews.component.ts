import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WeatherEvent } from '../../classes/weather-event';
import { ScrapeService } from '../../services/scrape.service';

@Component({
  selector: 'app-weathernews',
  templateUrl: './weathernews.component.html',
  styleUrls: ['./weathernews.component.css']
})
export class WeathernewsComponent implements OnInit {
  formError = '稍等片刻，氣象資料取得中...';
  models: WeatherEvent[] = [];
  earthquake: any;
  resources = [{ title: '其他', src: '../../../../../assets/images/weather.png' },
  { title: '地震', src: '../../../../../assets/images/earthquake.png' },
  { title: '大雨', src: '../../../../../assets/images/rain.png' },
  { title: '長浪', src: '../../../../../assets/images/wave.png' },
  { title: '颱風', src: '../../../../../assets/images/typhoon.png' },
  { title: '強風', src: '../../../../../assets/images/wind.png' },
  ];
  constructor(private scrape: ScrapeService) { }

  ngOnInit(): void {
    this.getevents();
  }

  getevents() {
    this.scrape.createcarousel().subscribe({
      next: (result: { message: string, data: [] }) => {
        if (result.message === '') {
          for (let i = 0; i < result.data.length; i++) {
            const { title, datetime, data } = result.data[i];
            if (title === '地震報告') {
              const { data } = result.data[i];
              const ary: any[] = data;
              this.formatEarthquate(ary);
            } else {
              const src = this.getSource(title);
              //alert(src);
              const comment: string = data;
              if (comment.indexOf('目前無') > -1) {
                ;//無資料不顯示
              } else {
                //alert(title);
                this.models.push({
                  source: src,
                  title: title,
                  datetime: datetime,
                  data: comment
                });

              }
            }
          }
          this.formError ='';
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
  formatEarthquate(obj1: any) {
    let rightobj=obj1[2];
    for(let i=0; i<obj1.length; i++){
      const { grade, datetime, obj } = obj1[i];
      const gradeint=Number.parseInt(grade);
      const dateint=this.date2int(datetime);
      //alert(`${gradeint}:${dateint.toLocaleDateString()}`);
      if(gradeint > Number.parseInt(rightobj.grade) && dateint >= this.date2int(rightobj.datetime)){
        rightobj=obj1[i];
      }
    }
    this.models.push({
      source: this.getSource('地震報告'),
      title: rightobj.grade,
      datetime: this.pureDatetime(rightobj.datetime),
      data:`${rightobj.obj.locate}，${rightobj.obj.deep}，${rightobj.obj.scale}` 
    });    

  }
  date2int(datetime: any) {
    let newdate = new Date();
    const yr = newdate.getFullYear();
    if(datetime){
     const dateary= this.splitMulti(datetime,['/', ' ', ':']);
     const month=dateary[0];
     const day=dateary[1]
    //  alert(dateary[0]);
    //  alert(dateary[1]);
     newdate= new Date(yr,month,day);
     //alert(newdate.toLocaleString());
    }
    return newdate;
  }

  getSource(str: string) {
    let ret = '';
    for (let i = 0; i < this.resources.length; i++) {
      const { title, src } = this.resources[i];
      ret = src;
      // alert(str);
      // alert(title);
      // alert(str.indexOf(title));
      // alert(src);
      if (str.indexOf(title) > -1) {
        break;
        //alert(src);
        //return this.earthquake[i].src;
      }
    }
    //alert(ret);
    return ret;
  }
  splitMulti(str:any, tokens:any){
    var tempChar = tokens[0]; // We can use the first token as a temporary join character
    for(var i = 1; i < tokens.length; i++){
        str = str.split(tokens[i]).join(tempChar);
    }
    str = str.split(tempChar);
    return str;
}
  pureDatetime(dt:string){
    let ret =dt;
    if(dt.indexOf('<')> -1){
      ret=dt.split('<')[0];
    }
    return ret;
  }
}
