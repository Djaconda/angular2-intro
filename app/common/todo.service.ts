import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Todo} from "./todo";

@Injectable()
export class TodoService {
    private apiUrl = 'api/todos';
    private headers = new Headers({'Content-Type': 'application/json'});
    private options = new RequestOptions({headers: this.headers});
    todos: Todo[] = [];

    constructor(private http: Http) {
    }

    getTodos(): Promise<Todo[]> {
        return this.http.get(this.apiUrl)
            .toPromise()
            .then(res => res.json().data as Todo[])
            .then(todos => this.todos = todos)
            .catch(this.handleError);
    }

    createTodo(title: string) {
        let todo = new Todo(title);
        this.http.post(this.apiUrl, todo, this.options)
            .toPromise()
            .then(res => res.json().data)
            .then(todo => this.todos.push(todo))
            .catch(this.handleError);
    }

    deleteTodo(todo: Todo) {
        let url = `${this.apiUrl}/${todo.id}`;
        this.http.delete(url, this.options)
            .toPromise()
            .then(res => {
                let index = this.todos.lastIndexOf(todo);
                if (index > -1) {
                    this.todos.splice(index, 1);
                }
            })
            .catch(this.handleError);
    }

    toggleTodo(todo: Todo) {
        let url = `${this.apiUrl}/${todo.id}`;
        this.http.put(url, todo, this.options)
            .toPromise()
            .then(res => {
                todo.completed = !todo.completed;
            })
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}