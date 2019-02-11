import { LightningElement, track } from 'lwc';

export default class TodoSimple extends LightningElement {
    @track todos = [];
    newTodo = {description: ''};
    
    changedInput(event){
        const field = event.target.name;
        this.newTodo[field] = event.target.value;
    }
    clickedCreate(){
        const todo = Object.assign({
            id: Math.random().toString(36).slice(-8)
        }, this.newTodo);
        this.todos.push(todo);
    }
    clickedDelete(event){
        const targetId = event.target.dataset.id;
        const todos = this.todos.filter(todo => todo.id !== targetId);
        this.todos = todos;
    }

}