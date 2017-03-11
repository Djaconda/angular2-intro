import {Component, Input} from "@angular/core";
import {Todo} from "../common/todo";

@Component({
    moduleId: module.id,
    selector: 'todo-list',
    templateUrl: 'todo-list.component.html',
    styleUrls: ['todo-list.component.css'],
})
export class TodoListComponent {
    @Input() todos: Todo[];

    delete(todo: Todo) {
        let index = this.todos.lastIndexOf(todo);
        if (index > -1) {
            this.todos.splice(index, 1);
        }
    }
}