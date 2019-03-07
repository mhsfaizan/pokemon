import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  constructor(private _http: HttpClient) { }
  isLoad = false;
  weatherData: any;
  isError = false;
  ngOnInit() {
    this.getWeather();
  }
  getWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.isLoad = true;
        // let lat = Math.floor(pos.coords.latitude);
        // let lon = Math.floor(pos.coords.longitude);
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;
        this._http.get("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=aa478abef8023ef510e3fe7dabb7f45c").subscribe((res: any) => {
          console.log(res);
          res.main.temp = Math.floor(this.converToCel(res.main.temp));
          this.weatherData = res;
          this.isLoad = true;
        }, (err) => {
          this.isError = true;
          this.isLoad = true;
        })
      }, (err) => {
        this.isLoad = true;
        this.isError = true;
        console.log(err);
      });
    } else {
      this.isError = true;
    }
  }
  converToCel(kelvin: number) {
    return (kelvin - 273);
  }
}
