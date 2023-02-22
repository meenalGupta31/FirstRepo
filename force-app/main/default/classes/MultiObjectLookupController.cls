public class MultiObjectLookupController {
    @AuraEnabled 
    public static List<RecordsData> fetchRecords( String objectName, String filterField, String searchString ) {
        List<RecordsData> recordsDataList = new List<RecordsData>();
        try {
            String query = 'SELECT Id, ' + filterField+
                ' FROM '+objectName+
                ' WHERE '+filterField+' LIKE ' + '\'' + String.escapeSingleQuotes(searchString.trim()) + '%\'' + ' LIMIT 50000';
            
            for(SObject s : Database.query(query)){
                recordsDataList.add( new RecordsData((String)s.get(filterField), (String)s.get('id')) );
            } 
        } catch(Exception err) {
            if ( String.isNotBlank( err.getMessage() ) && err.getMessage().contains( 'error:' ) ) {
                throw new AuraHandledException(err.getMessage().split('error:')[1].split(':')[0] + '.');
            } else {
                throw new AuraHandledException(err.getMessage());
            }
        }
        return recordsDataList;
    }
    @AuraEnabled 
    public static RecordsData fetchRec(string objId){
        try{
            if(objId != null)
            {
                system.debug('objId'+objId);
            List<Account> accRecord = new List<Account>();
            accRecord = [SELECT Name,Id FROM Account WHERE id =: objId LIMIT 1];
            RecordsData recordsDataList = new RecordsData(accRecord[0].Name,accRecord[0].Id);
            system.debug('recordsDataList--->>'+recordsDataList);
            return recordsDataList;
            }
           return null;
        }
        catch(Exception e){
            System.debug('Error is ::: '+e.getMessage()+' at line no. :::'+e.getLineNumber());
            return null;
        }    
    }
    @AuraEnabled
    public static RecordsData fetchUser(){
        try{
            RecordsData recordsDataList = new RecordsData(UserInfo.getName(),UserInfo.getUserId());
            return recordsDataList;
        }
        catch(Exception e){
            System.debug('Error is ::: '+e.getMessage()+' at line no. :::'+e.getLineNumber());
            return null;
        }
    }
    public class RecordsData{
        @AuraEnabled public String label;
        @AuraEnabled public String value;
        public RecordsData(String label, String value) {
            this.label = label;
            this.value = value;
        }
    }
}