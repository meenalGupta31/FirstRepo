public class AccountHandler {
    public static void AccountMethod(List<Opportunity> opplist){
        set<Id> AccountIdset = new set<id>();
        for(opportunity each : opplist){
            AccountIdset.add(each.AccountId);
        }
        List<Account> accountList = new List<Account>();
        accountList = [select Id ,(select Id,stageName,AccountId from Opportunities) from Account where Id in: AccountIdset];
        Map<Id, List<string>> AccountIdOpportunityMap = new Map<Id, List<string>>();
        
        for ( Account each : accountList) {
            for (Opportunity opp : each.Opportunities) {
                if(AccountIdOpportunityMap.containsKey(each.Id)){
                    AccountIdOpportunityMap.get(each.Id).add(opp.StageName);
                }
                else {
                    AccountIdOpportunityMap.put(each.Id, new string[]{opp.StageName});
                }
            }
        }
        for(Opportunity opp : opplist){
            if(AccountIdOpportunityMap.containsKey(opp.AccountId)){
                for(string each : AccountIdOpportunityMap.get(opp.AccountId)){
                    if(opp.Stagename == each){
                        opp.StageName.addError('Duplicate stage Name');
                    }  
                }
            }
        }
    }
}