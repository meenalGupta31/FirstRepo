trigger AccountsTrigger on Account (before insert) {
    if(trigger.isbefore && trigger.isinsert)
    {
        // Accounthandler.preventAccountToAddContact(trigger.new);
    }
    if(trigger.isbefore && trigger.isUpdate)
		Account a = new Account();
        // Accounthandler.preventAccountToAddContact(trigger.new);
}