public class EmailTab {
    @AuraEnabled
    public static User getsEmails()
    {
        try
        {
            User userInfoObj = [Select Email,Name from User where Id =: userInfo.getUserId() Limit 1];
            return userInfoObj;
        }catch(Exception ex)
        {
            System.debug('Exception is-- '+ex.getMessage()+' at line-->'+ex.getLineNumber());   
        }
        return null;
    }
    public class RecordsData{
        @AuraEnabled public String name;
        @AuraEnabled public String recordId;
        @AuraEnabled public String email;
        @AuraEnabled public String ObjType;
        @AuraEnabled public String iconname;
        public RecordsData(String name, String email, String recordId, String ObjType,String iconname) {
            this.name = name;
            this.email = email;
            this.recordId = recordId;
            this.ObjType = ObjType;
            this.iconname = iconname;
        }
    }
    @AuraEnabled 
    public static List<ContentVersion> fetchContentDocuments(){
        try{
            List<ContentVersion> cDList = new List<ContentVersion>();
            cdList = [SELECT Title,FileType,ContentSize,ContentModifiedDate,ContentDocumentId,Id FROM ContentVersion ORDER BY Title ASC LIMIT 100];
            return cdList;
        }
        catch(Exception e){
            System.Debug('Error is :::'+e.getMessage()+' at line no. :::'+e.getLineNumber());
            return null;
        }
    }
    @AuraEnabled 
    public static List<ContentVersion> searchContentDocuments(String inputStr){
        try{
            List<ContentVersion> cDList = new List<ContentVersion>();
            cdList = Database.query('SELECT Title,FileType,ContentSize,ContentModifiedDate,ContentDocumentId,Id FROM ContentVersion WHERE Title LIKE \''+inputStr+'%\' LIMIT 100');
            return cdList;
        }
        catch(Exception e){
            System.Debug('Error is :::'+e.getMessage()+' at line no. :::'+e.getLineNumber());
            return null;
        }
    }
    @AuraEnabled 
    public static List<RecordsData> fetchRecords(String searchString) {
        try{
            List<RecordsData> recordsDataList = new List<RecordsData>();
            List<Contact> conList = new List<Contact>();
            List<Lead> leadList = new List<Lead>();
            List<User> userList = new List<User>();
            conList = Database.query('SELECT Email, Name FROM Contact WHERE Email LIKE \'%'+searchString+'%\' LIMIT 5');
            leadList = Database.query('SELECT Email, Name FROM Lead WHERE Email LIKE \'%'+searchString+'%\' LIMIT 5');
            userList = Database.query('SELECT Email, Name FROM User WHERE Email LIKE \'%'+searchString+'%\' LIMIT 5');
            if(conList != NULL && conList.size() > 0){
                for(Contact obj : conList)
                    recordsDataList.add( new RecordsData(obj.Name,obj.Email,obj.Id,'contact','standard:contact'));
            }
            if(leadList != NULL && leadList.size() > 0){
                for(Lead obj : leadList)
                    recordsDataList.add( new RecordsData(obj.Name,obj.Email,obj.Id,'lead','standard:lead'));
            }
            if(userList != NULL && userList.size() > 0){
                for(User obj : userList)
                    recordsDataList.add( new RecordsData(obj.Name,obj.Email,obj.Id,'user','standard:user'));
            }
            system.debug(recordsDataList);
            return recordsDataList;
        }
        catch(exception e){
            System.Debug('Error is :::'+e.getMessage()+' at line no. :::'+e.getLineNumber());
            return null;
        }
    }
    @auraEnabled
    public static string sendMailMethod(String recordId,List<String> mToMail,List<String> mCcMail, List<String> mBccMail ,String mSubject,String mbody,List<String> contentDocId){
        try{
            if(mToMail.size()>0 && mSubject!=null && mbody!=null)
            {
                if(mToMail.size() > 0 || mCcMail.size() > 0 || mBccMail.size() > 0){
                List<String> contIds = new List<String>();
                for(String s : contentDocId ){
                    ContentVersion contId =[SELECT Id FROM ContentVersion WHERE ContentDocumentId =: s LIMIT 1];
                    contIds.add(contId.Id);
                }
                List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                List<String> sendTo = new List<String>();
                for(String s : mToMail)
                    sendTo.add(s);
                mail.setCcAddresses(mCcMail);
                mail.setBccAddresses(mBccMail);
                mail.setToAddresses(sendTo);
                mail.setSubject(mSubject);
                mail.setHtmlBody(mbody);
                mail.setEntityAttachments(contIds);
                mails.add(mail);
                Messaging.sendEmail(mails);
            }
                return 'mailSend';
            }
            return null;
        }catch(Exception ex){
            System.debug('Exception :::'+ex.getMessage() + 'Line Number:::'+ex.getLineNumber());
            return null;
        }
    }
}