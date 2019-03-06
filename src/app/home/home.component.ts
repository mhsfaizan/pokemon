import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PokemonComponent } from '../pokemon/pokemon.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _http: HttpClient,private dialog:MatDialog) { }
  pockemons: any;
  isLoad = false;
  ngOnInit() {
    this.getPockemon("https://pokeapi.co/api/v2/pokemon/?limit=20");
  }
  getPockemon(url: string) {
    this._http.get(url).subscribe(async (results: any) => {
      this.pockemons = results;
      for (let pockemon of this.pockemons.results) {
        pockemon.data = await this._http.get(pockemon.url).toPromise();
      }
      this.isLoad = true;
      console.log(this.pockemons);
    }, (err) => {
      this.isLoad = true;
      console.log(err);
    });
  }
  changeData(url: string) {
    this.isLoad = false;
    this.getPockemon(url);
  }
  openD(data: any): void {
    const dialogRef = this.dialog.open(PokemonComponent, {
      width: '350px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
