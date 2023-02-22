//Create a restricted picklist field on Contact -> Job Post and add the following item:AdminDeveloperTesterProject CoordinatorTeam Lead
//Write a trigger on Account and prevent the account to add two Contacts Having same Job Post 
//and then send mail to the Account owner with the
// following body:Hi {Owner Name},Your Account {Account Name} cannot have two Contact with same Job Post {Job Post Name}. 
public class Contacthandler {
    public static void preventAccountToAddContact(list<Contact>Contactlist)
    {
        try{ 
            set<id>accountidset=new set<id>();//accountidset
            set<string>jobprofileset=new set<string>();//jobprofileset
            if(Contactlist.size()>0)
            { 
            for(Contact contactobj:Contactlist)  
            {
                accountidset.add(contactobj.accountid);//accountid
                jobprofileset.add(contactobj.JobProfile__c);//jobprofile
            }
            }
            list<Account>accountlist2=new list<Account>();
            accountlist2=[select id,owner.name from account where id in:accountidset limit 100];
            list<Contact>oldcontactlist=new list<Contact>();
            oldcontactlist=[select id,accountid,JobProfile__c from contact where accountid in: accountidset and JobProfile__c in:jobprofileset ];//old contact
            if(accountlist2.size()>0 && oldcontactlist.size()>0&& Contactlist.size()>0)
            { 
                for(Account accountobj:accountlist2)
                {
                    for(Contact contactobj:contactlist)
                    {
                        for(Contact contactobj1:oldcontactlist)
                        { 
                            
                            if((contactobj.JobProfile__c == contactobj1.JobProfile__c)&&(contactobj1.accountid==contactobj.AccountId)&&(accountobj.id==contactobj.AccountId))
                            {
                                contactobj.adderror('can not add more contact with same job profile');
                                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                                String[] Addresses = new String[] {userInfo.getUserEmail()};
                                mail.setToAddresses(Addresses);
                                mail.setSubject('prevent the account to add two Contacts');
                                mail.setPlainTextBody('Hi'+accountobj.owner.name+',Your Account' +accountobj.name +'cannot have two Contact with same Job Post '+contactobj.JobProfile__c);
                                Messaging.SendEmailResult[] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
                            }
                        }
                        
                    }
                }
            }
        }
        catch(Exception e)
        {
            system.debug(e.getLineNumber()+e.getMessage());
        }
    } }