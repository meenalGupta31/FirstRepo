trigger AccountTrigger on Account (before insert,after insert,before update,after update) {
    if(trigger.isafter && trigger.isInsert){
        Account_Trigger_Handler.onAccountCreationCreateContact(trigger.new);
    }
}