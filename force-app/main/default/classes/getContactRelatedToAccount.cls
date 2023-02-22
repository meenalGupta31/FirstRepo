public class getContactRelatedToAccount {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(){
        List<Contact> ContactList = new List<Contact>();
        ContactList = [select Id,Name,Email,AccountId from Contact where AccountId = '0015g000019DbkzAAC'];
        if(ContactList.size() > 0){
            return ContactList;
        }else{
            return null;
        }
    }
}