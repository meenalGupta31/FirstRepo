public class getAccounts {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> get20Accounts(){
        List<Account> Accountlist = new List<Account>();
        Accountlist = [select Id , Name from Account limit 20];
        system.debug('Accountlist-->'+Accountlist);
        return Accountlist;
    }
    @AuraEnabled
    public static List<Account> updateAccountList(string AccountId , string AccountName){
        List<Account> Accountlist = new List<Account>();
        Accountlist = [select Id , Name from Account where Id=: AccountId];
        Accountlist[0].Name = AccountName;
        update Accountlist;
        system.debug('Accountlist-->'+Accountlist);
        return Accountlist;
    }
    
}