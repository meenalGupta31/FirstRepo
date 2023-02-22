//Whenever opportunity created, update account object with total opportunities and total amount.

public class onOpportunityCreation {
    public static void opportunityCreationMethod(List<Opportunity> OpportunityList){
        Set<Id> AccountIdSet = new set<Id>();
        Decimal opportunityAmount;
        for(Opportunity each : OpportunityList){
            if(each.AccountId != null){
                AccountIdSet.add(each.AccountId);
                opportunityAmount = each.Amount;
            }
        }
        List<Account> accountList = new List<Account>();
        accountList = [select Id,Total_Opportunities__c,Total_Amount__c,(select id,Amount,AccountId from Opportunities) from Account where Id in : AccountIdSet];
        Map<Id,List<Opportunity>> AccountIdvsListofOpportuntiy = new Map<Id,List<Opportunity>>();
        if(accountList.size()>0){
            for(Account each : accountList){
                AccountIdvsListofOpportuntiy.put(each.Id,each.Opportunities);
                each.Total_Opportunities__c = AccountIdvsListofOpportuntiy.get(each.Id).size() +1;
                if(each.Opportunities.size()>0){
                    for(Opportunity eachrec : each.Opportunities){
                        if(each.Id == eachrec.AccountId){
                            system.debug(eachrec.Amount);
                            if(Integer.valueof(eachrec.Amount)!= null){
                                if(each.Total_Amount__c != null){
                                    each.Total_Amount__c = each.Total_Amount__c + Integer.valueof(eachrec.Amount);
                                }else{
                                   each.Total_Amount__c =  Integer.valueof(eachrec.Amount); 
                                }
                            }
                            if(opportunityAmount != null){
                                each.Total_Amount__c = each.Total_Amount__c+opportunityAmount;
                            }
                        }
                    }
                }
            }
            update accountList;
        }
    }
}