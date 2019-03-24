import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {FormControl} from '@angular/forms';
// import {Observable} from 'rxjs';
// import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-view-component',
  templateUrl: './view-component.component.html',
  styleUrls: ['./view-component.component.styl']
})
export class ViewComponentComponent implements OnInit {

  userName: string = "";
  selectedOption: string = "";
  url: string = "";
  response: any;
  films:string[] = [];
  characters:string[] = [];


  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<string[]>;


  checkSelect() {
    if(this.selectedOption == 'filme') {
      this.url = "https://swapi.co/api/films/";
    }
    if (this.selectedOption == 'nome') {
      this.url = "https://swapi.co/api/people/";
    }
    console.log(this.selectedOption);
  }

  searchFilm(film) {
    console.log(film);
    return film == this.userName;
  }

  selectChangeHandler (event: any) {
    this.selectedOption = event.target.value;
    this.checkSelect();
  }
  constructor(private http: HttpClient) { }

  ngOnInit() { }

  search() {
    this.http.get(this.url)
    .subscribe((response) => {
      this.response = response;

      // Verificando se o filme foi selecionado e populando o array com os nomes dos filmes
      if (this.selectedOption == 'filme') {
        for(let i:number=0; i<this.response.results.length; i++) {
          this.films.push(this.response.results[i].title);
        }
        this.films.find(this.searchFilm);
      }

      console.log(this.films);
      // console.log(this.response);
    })

  }
}
