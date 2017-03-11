import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Todo} from "./todo";

@Injectable()
export class TodoService {
    private apiUrl = 'api/todos';
    private headers = new Headers({'Content-Type': 'application/json'});
    private options = new RequestOptions({headers: this.headers});

    constructor(private http: Http) {
    }

    getTodos(): Observable<Todo[]> {
        return this.http.get(this.apiUrl)
            .map(res => res.json().data as Todo[])
            .catch(TodoService.handleError);
    }

    createTodo(title: string): Observable<Todo> {
        let todo = new Todo(title);
        return this.http.post(this.apiUrl, todo, this.options)
            .map(res => res.json().data)
            .catch(TodoService.handleError);
    }

    deleteTodo(todo: Todo): Observable<void> {
        let url = `${this.apiUrl}/${todo.id}`;
        return this.http.delete(url, this.options)
            .catch(TodoService.handleError);
    }

    toggleTodo(todo: Todo): Observable<void> {
        let url = `${this.apiUrl}/${todo.id}`;
        return this.http.put(url, todo, this.options)
            .catch(TodoService.handleError);
    }

    private static handleError(error: any): Observable<any> {
        console.error('An error occurred', error);
        return Observable.throw(error.message || error);
    }
}