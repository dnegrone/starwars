import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-component',
  templateUrl: './view-component.component.html',
  styleUrls: ['./view-component.component.styl']
})
export class ViewComponentComponent implements OnInit {

  userName = "";
  selectedOption = "";
  url = "";
  response: any;
  filmes = [];
  personagens = [];
  nomeFilmes = [];
  tempNomeFilmes = [];

  checkSelect() {
    if(this.selectedOption == 'filme') {
      this.url = "https://swapi.co/api/films?search=";
    }
    if (this.selectedOption == 'nome') {
      this.url = "https://swapi.co/api/people?search=";
    }
    console.log(this.selectedOption);
  }

  selectChangeHandler (event: any) {
    this.selectedOption = event.target.value;
    this.checkSelect();
  }
  constructor(private http: HttpClient) { }

  ngOnInit() { }

  searchFilms() {
    this.http.get('https://swapi.co/api/films').subscribe((response) => {
      this.response = response;
      for(let i:number = 0;i<this.response.count;i++) {
        this.nomeFilmes.push(this.response.results[i].title);
      }
      // console.log(this.nomeFilmes);
    })
  }

  search() {
    this.http.get(this.url + this.userName)
    .subscribe((response) => {
      this.response = response;
      if (this.selectedOption == 'filme') {
        for(let i:number = 0;i<=2;i++) {
          this.http.get(this.response.results[0].characters[i]).subscribe((response) => {
            this.response = response;
            this.personagens.push(this.response.name);
          })
        }
        console.log(this.personagens);
      }
      if (this.selectedOption == 'nome') {
        // console.log(this.nomeFilmes);
        this.searchFilms();
        // Guardar
        for(let i:number = 0;i<=this.response.results.length;i++) {
          this.personagens.push(this.response.results[i].name); // nome dos personagens
          this.filmes.push(this.response.results[i].films); // link dos filmes

          for(let k=0;k<=this.filmes[i].length;k++) {
            this.http.get(this.filmes[i][k]).subscribe((response) => {
              this.response = response;
              this.tempNomeFilmes.push(this.response.title);
              console.log(this.filmes[i][k] + ' - ' + this.response.title); // links e nomes dos filmes
            })
            
          }
        }
      }      
    })

  }
}
