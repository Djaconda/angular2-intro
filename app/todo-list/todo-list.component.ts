import {Component} from "@angular/core";
import {Todo} from "../common/todo";
import {todos} from "../common/data";

@Component({
    moduleId: module.id,
    selector: 'todo-list',
    templateUrl: 'todo-list.component.html',
    styleUrls: ['todo-list.component.css'],
})
export class TodoListComponent {
    todos: Todo[] = todos;

    toggle(todo: Todo) {
        todo.completed = !todo.completed;
    }

    delete(todo: Todo) {
        let index = this.todos.lastIndexOf(todo);
        if (index > -1) {
            this.todos.splice(index, 1);
        }
    }
}