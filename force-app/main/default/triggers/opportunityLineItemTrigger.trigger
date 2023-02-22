trigger opportunityLineItemTrigger on OpportunityLineItem (before insert) {
    if(trigger.isinsert && trigger.isbefore)
    { 
OpportunityLineItemHandler.OpportunityLineItemmethod(trigger.new);
    }
}