export class WeatherInfo {
    title="";
    datetime="";
    data: WeatherData[] = [];
}


export class WeatherData {
    county="";//縣市
    temcstr="";//溫度
    rainstr="";//降雨機率
    countyno=""; //縣市代碼   
}