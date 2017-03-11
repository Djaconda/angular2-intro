import {Component} from "@angular/core";

@Component({
    moduleId: module.id,
    selector: 'todo-form',
    templateUrl: 'todo-form.component.html',
    styleUrls: ['todo-form.component.css'],
})
export class TodoFormComponent {
    newTodoTitle: string = '';


    create() {
        // let todo: Todo = new Todo(this.newTodoTitle);
        //
        // this.todos.push(todo);
        // this.newTodoTitle = '';
    }
}