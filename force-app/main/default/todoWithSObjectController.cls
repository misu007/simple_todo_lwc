public with sharing class todoWithSObjectController {
    
    @AuraEnabled(cacheable=true)
    public static List<Task> getTasks(){
        List<Task> tasks = [SELECT Id, Subject, Description FROM Task];
        return tasks;
    }

    @AuraEnabled(cacheable=false)
    public static String insertTask(String subject, String description){
        try {
            Task task = new Task(
                Subject = subject,
                Description = description
                );
            insert task;
            return task.Id;
        } catch (Exception ex){
            return null;
        }
    }

    @AuraEnabled(cacheable=false)
    public static String removeTask(String taskId){
        try {
            Task task = [SELECT Id FROM Task WHERE Id = :taskId LIMIT 1];
            delete task;
            return 'success';
        } catch (Exception ex){
            return null;
        }
    }
}
