trigger OpportunityTrigger on Opportunity (before insert,after insert,before update,after update) {
    if(trigger.isBefore && (trigger.isInsert)){
        onOpportunityCreation.opportunityCreationMethod(trigger.new);
    }
}