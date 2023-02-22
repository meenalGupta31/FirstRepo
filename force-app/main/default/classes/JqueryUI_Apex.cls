public class JqueryUI_Apex {
@AuraEnabled 
    public static List<Account> JqueryUI_ApexMethod()
    {
        List<Account> Accountlist = new List<Account>();
        Accountlist = [select Id,name from account limit 5];
        return Accountlist;
    }
}