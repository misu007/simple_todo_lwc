import { LightningElement, wire } from 'lwc';
import getTasks from '@salesforce/apex/todoWithSObjectController.getTasks';
import insertTask from '@salesforce/apex/todoWithSObjectController.insertTask';
import removeTask from '@salesforce/apex/todoWithSObjectController.removeTask';
import { refreshApex } from '@salesforce/apex';

export default class TodoSimple extends LightningElement {
    @wire(getTasks) todos;
    newTodo = {subject: '', description: ''};
    
    changedInput(event){
        const field = event.target.name;
        this.newTodo[field] = event.target.value;
    }
    clickedCreate(){
        const todo = this.newTodo;
        insertTask(todo).then(() => {
            return refreshApex(this.todos);
        });
    }
    clickedDelete(event){
        const taskId = event.target.dataset.id;
        removeTask({taskId: taskId}).then(() => {
            return refreshApex(this.todos);
        });
    }

}