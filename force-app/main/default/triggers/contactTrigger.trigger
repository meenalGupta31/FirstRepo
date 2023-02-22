trigger contactTrigger on Contact (before insert,before update,after insert,after update) {
    if(trigger.isbefore && trigger.isinsert)
    {
        Contacthandler.preventAccountToAddContact(trigger.new);
    }
    if(trigger.isAfter && (trigger.isInsert || trigger.isUpdate)){
        contactTriggerHandler.onUpdateAccountNameWithContactLastName(trigger.new);
    }
}