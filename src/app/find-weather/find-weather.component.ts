import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-find-weather',
  templateUrl: './find-weather.component.html',
  styleUrls: ['./find-weather.component.css']
})
export class FindWeatherComponent implements OnInit {

  constructor(private _http: HttpClient) { }
  weatherData: any;
  isLoad: number;
  countries:any = [];
  ngOnInit() {
    this._http.get("/assets/country.json").subscribe((codes)=>{
      for(let code in codes ){
        this.countries.push(code);
      }
      console.log(this.countries);
    })
  }
  getZip(zipcode: number,country:string) {
    if (zipcode && country) {
      this.isLoad = 1;
      this._http.get("https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ","+country+ "&appid=aa478abef8023ef510e3fe7dabb7f45c").subscribe((res: any) => {
        res.main.temp = this.getCelcius(res.main.temp);
        this.isLoad = 2;
        this.weatherData = res;
      },(err)=>{
        this.isLoad = 3;
      })
    }else{
      this.isLoad = 3;
    }
  }
  getCelcius(kelvin) {
    return  Math.ceil(kelvin - 273.15);
  }
}
