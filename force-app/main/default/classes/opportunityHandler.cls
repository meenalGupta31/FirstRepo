public class opportunityHandler {
    public static void onCreateOpportunityWithPastClosedDate(List<Opportunity> OpportunityList){
        try{
            if(OpportunityList.size()>0){
                for(Opportunity each : OpportunityList){
                    if(each.CloseDate!=null && each.CloseDate < date.today()){
                        each.addError('Please enter a future Closed Date');
                    }
                }
            }
        }catch(Exception ex){
            system.debug('error at lineNo->'+ex.getLineNumber()+'--Error is-->'+ex.getMessage());
        }
    }
}