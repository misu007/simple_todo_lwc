import { LightningElement, track } from 'lwc';

export default class TodoSimple2 extends LightningElement {
    @track todos = [];
    newTodo = {description: ''};

    get notYetTodos(){
        return this.todos.filter(todo => !todo.complete);
    }    
    get doneTodos(){
        return this.todos.filter(todo => todo.complete);
    }

    changedInput(event){
        const field = event.target.name;
        this.newTodo[field] = event.target.value;
    }
    clickedCreate(){
        const todo = Object.assign({
            id: Math.random().toString(36).slice(-8),
            complete: false
        }, this.newTodo);
        this.todos.push(todo);
    }
    clickedDelete(event){
        const targetId = event.target.dataset.id;
        const todos = this.todos.filter(todo => todo.id !== targetId);
        this.todos = todos;
    }

    clickedChangeComplete(event){
        const targetId = event.target.dataset.id;
        const foundIdx = this.todos.findIndex(todo => todo.id === targetId);
        if (foundIdx >= 0){
            this.todos[foundIdx].complete = !this.todos[foundIdx].complete;
        }
    }

}