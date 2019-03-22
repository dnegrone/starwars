import { Component } from '@angular/core';
import { ConfigService } from './config.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  title = 'starwars';
  users;
  constructor(private configService:ConfigService) {}

  getUsers() {
    this.users = this.configService.getUsers();
  }
}
