import {Component, OnInit} from '@angular/core';
import {Todo} from '../models/Todo';
import {SearchService} from '../services/search.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  todos: Todo[] = [];
  todosId: number;

  public activeItem: string;

  public onSelectItem(item: string): void {
    this.activeItem = item;
  }

  constructor(private service: SearchService ) { }

  ngOnInit(): any {
    this.service.search().subscribe(response => {
      this.todos = response;
    });
  }

  setId(id): any {
    this.service.selectedCardId = id;
  }

}
