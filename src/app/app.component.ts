import { Component } from '@angular/core';
import {SearchService} from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  modal = false;
  id: any;
  constructor(private service: SearchService) {
  }

  delete(id: any): void {
     this.service.deleteCard();
  }

  edit(id: any): any {
    this.service.editUser(id);
    this.service.type = 'update';
  }

  create(): void {
    this.service.type = 'create';
  }


}
