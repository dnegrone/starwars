import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  personagens:string[] = [];

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
      }
      console.log(this.personagens);
    })

  }
}
