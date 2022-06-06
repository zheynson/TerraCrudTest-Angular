import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Todo} from '../models/Todo';
import {Observable, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class SearchService {
  public type!: 'create' | 'update';
  public selectedCardId: number;
  public selectedPost!: Todo;
  public cards$: Subject<Todo[]> = new Subject();

  constructor(private http: HttpClient) {
  }

  search(): Observable<Todo[]> {
    this.http.get<Todo[]>(`https://yourtestapi.com/api/posts`).subscribe(res => {
      this.cards$.next(res);
    });
    return this.cards$;
  }

  searchUser(): Observable<Todo> {
    return this.http.get<Todo>(`https://yourtestapi.com/api/posts/${this.selectedCardId}`);
  }

  createCard(card: any): any {
   return this.http.post<any>(`https://yourtestapi.com/api/posts`, card);
  }

  deleteCard(): void {
    this.http.delete(`https://yourtestapi.com/api/posts/${this.selectedCardId}`).subscribe(() => {
      this.search();
    });
  }

  editUser(card: Todo ): Observable<Todo> {
    return this.http.put<Todo>(`https://yourtestapi.com/api/posts/` + this.selectedCardId, card);
  }




}
