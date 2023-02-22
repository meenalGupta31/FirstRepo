public class contactTriggerHandler {
    public static void onUpdateAccountNameWithContactLastName(List<Contact> contactList){
        try{
            Set<Id> ContactIdSet = new Set<Id>();
            for(Contact each : contactList){
                ContactIdSet.add(each.AccountId);
            }
            
            Account accountobj=new Account();          
            Map<Id,String> AccountIdvsAccountNameMap = new Map<Id,String>();
            
            List<Account> AccountList =new List<Account>();           
            AccountList= [Select Id,Name from Account where Id in: ContactIdSet limit 50000];
            
            if(AccountList.size()>0){
                for(Account acc:AccountList){
                    if(!AccountIdvsAccountNameMap.containskey(acc.Id)){
                        AccountIdvsAccountNameMap.put(acc.id,acc.Name);
                    }
                }
            }
            
            if(!AccountIdvsAccountNameMap.isEmpty()){
                for(Contact con:contactList){
                    accountobj.Id = con.AccountId;
                    accountobj.Name = AccountIdvsAccountNameMap.get(con.AccountId)+' '+con.LastName;
                }
            }
            
            if(!contactList.isEmpty()){
                update accountobj;
            }
            
        }catch(Exception ex){
            system.debug('Error is'+ex.getLineNumber());
        }
    }
}