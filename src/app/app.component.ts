import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})


export class AppComponent {
  title = 'starwars';  
  powers = ['Nome', 'Filme'];
  
  submitted = false;
  onSubmit() { this.submitted = true; }
  
  constructor(private http: HttpClient) {}

  users = {};

  loadUsers() {
    const url = 'https://swapi.co/api/people';
    let obs = this.http.get(url);
    obs.subscribe((response) => console.log(response));
  }

  ngOnInit() {
    // const url = 'https://api.github.com/users/koushikkothagal';
    // const url = 'https://swapi.co/api/people';
    // let obs = this.http.get(url);
    // obs.subscribe(() => console.log('Got the response'));
    // obs.subscribe((response) => console.log(response));
  }

}
