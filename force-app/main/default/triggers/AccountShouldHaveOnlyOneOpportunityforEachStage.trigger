trigger AccountShouldHaveOnlyOneOpportunityforEachStage on Opportunity (before insert) {
AccountHandler.AccountMethod(trigger.new);
}