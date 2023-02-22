//Create a custom field on the contact as Price(Number).
//Find all accounts which contain at least three child contacts and populate the minimum amount of the price of the child contacts.
public class AccountWithContacts {
    public static void AccountWithContactsmethod()
    {
        try{
            list<Contact>contactlist=new list<Contact>();
            contactlist=[select id,accountid,Price__c from Contact limit 100];
            set<Id>accountid=new set<Id>();
            if(contactlist.size()>0)
            { 
                for(Contact conobj:contactlist)
                {
                    accountid.add(conobj.accountid);//accountid
                }
            }
            list<Account>accountlist=new list<Account>();
            accountlist=[select id,name from account where id in:accountid];
            //list<decimal>minvalue=new list<integer>();
            if(accountlist.size()>0 && contactlist.size()>0){ 
            for(Account accountobj:accountlist)
            {
                decimal min=32768;
                integer count=0;
               
                for(Contact contactobj:contactlist)
                {
                     //System.debug('minimum-->'+min);
                    if(contactobj.AccountId==accountobj.id)
                    { 
                        count++;
                        if(min >=contactobj.Price__c)
                        {   
                            min=contactobj.Price__c;   
                            //system.debug(min);
                        }
                    }
                }
                if(count>=3)
                {
                    system.debug('accounts having 3 and more than 3 contacts>>'+accountobj.name+'no of contact>>'+count+'Minimum price>>'+min);
                }       
            }
            }
            
        }
        catch(Exception e)
        {
            system.debug(e.getLineNumber()+e.getMessage());
        }
    }
}