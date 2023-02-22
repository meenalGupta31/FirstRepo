public class SkillBasedRoutingDemoClass {
   @InvocableMethod
    public static void RoutingCasesToAgents(List<string> caseIds){
        //create PSR
        //Add skills to the request for the case
        //Push it to queue
        List<Case> caseinserted = new List<Case>();
        caseinserted = [select id,subject from case where id in :caseIds limit 49999];
        List<PendingServiceRouting> PendingServiceRoutingList = new List<PendingServiceRouting>();
        List<Skill> allSkillsInBB =new List<Skill>();
        allSkillsInBB = [select Id,MasterLabel from Skill limit 49999];
        for(case caserec : caseinserted){
            PendingServiceRouting psr = new PendingServiceRouting();
            psr.workItemId = caseRec.Id;
            psr.RoutingModel = 'SkillsBased';
            psr.RoutingPriority = 1;
            psr.ServiceChannelId = '0N95g000000PuDL';
            psr.RoutingModel = 'Most Available';
            psr.IsReadyForRouting = false;
            PendingServiceRoutingList.add(psr);
            insert PendingServiceRoutingList;
            //Find out the skills required for a given case based on its subject
            List<Id> MatchingSkillIds = new List<Id>();
            for(Skill each : allSkillsInBB)
            {
                if(caserec.Subject.contains(each.MasterLabel))    
                {
                    MatchingSkillIds.add(each.Id);
                }   
            }
            List<SkillRequirement> skillrequList = new list<SkillRequirement>();
            
            //Associate matching skills with psr request
            for(string  each: MatchingSkillIds)
            {
                SkillRequirement eachSkill = new SkillRequirement();
                eachSkill.SkillId = each;
                eachSkill.RelatedRecordId = psr.Id;
                eachSkill.SkillLevel = 5;
                skillrequList.add(eachSkill);
            }
            insert skillrequList;
            //Push our request in to queue
            psr.IsReadyForRouting = TRUE;
           update psr;
        } 
    }
}