public class Account_Trigger_Handler {
    public static void onAccountCreationCreateContact(List<Account> AccountList){
        try{
            system.debug('AccountList-->>'+AccountList);
            List<Contact> contactList = new List<Contact>();
            if(AccountList.size()>0){
                for(Account each : AccountList){
                    if(each.NumberOfEmployees != null){
                        for(Integer i=1;i<=each.NumberOfEmployees;i++){
                            Contact eachRecord = new Contact();
                            eachRecord.Lastname = each.Name + i;
                            eachRecord.AccountId = each.Id;
                            contactList.add(eachRecord);
                        }
                    }  
                }
                system.debug('contactList-->>'+contactList);
                if(contactList.size()>0){
                    insert contactList;
                }
            }
        }catch(Exception ex){
            system.debug('Error at line number-->'+ex.getLineNumber()+'--Error is-->'+ex.getMessage());
        }
    }
}