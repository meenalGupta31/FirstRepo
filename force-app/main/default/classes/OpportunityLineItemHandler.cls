//Write a Trigger on the Opportunity line item to not add Quantity more than the Days of the month. Example:-
//If it is 20 Jan 2017 then Trigger should throw an error when the user enters a quantity of more than 20
public class OpportunityLineItemHandler {
    public static void OpportunityLineItemmethod(list<OpportunityLineItem>OpportunityLineItemlist)
    {
        try{
            set<Id>opportunityidset=new set<id>();
            set<Id>productidset=new set<id>();
            if(OpportunityLineItemlist.size()>0)
            { 
            for(OpportunityLineItem oliobj:OpportunityLineItemlist) 
            {
                opportunityidset.add(oliobj.OpportunityId);//oli opportunity id
                productidset.add(oliobj.Product2Id);//oli product id
            }
            }
            list<Opportunity>opportunitylist=new list<Opportunity>();
            opportunitylist=[select id from Opportunity where id in:opportunityidset limit 100];//opportunitylist
            list<Product2>Productlist=new list<Product2>();
            Productlist=[select id from Product2 where id in:productidset limit 100];//Productlist 
            if(OpportunityLineItemlist.size()>0){
            for(OpportunityLineItem oliobj:OpportunityLineItemlist){
                for(opportunity oppobj:opportunitylist){ 
                    for(Product2 productobj:Productlist){ 
                        date myDate = date.newInstance(2021, 04, 7);
                        Integer numberDays = myDate.day();
                        oliobj.OpportunityId=oppobj.id;
                        oliobj.Product2Id= productobj.id;
                        if(oliobj.OpportunityId==oppobj.id && oliobj.Product2Id==productobj.id &&oliobj.Quantity>=numberDays){ 
                            oliobj.Quantity.adderror('the user enters a quantity of more than '+numberDays);
                            }
                    }
                }
            }
            }
        }
        catch(Exception e)
        {
            system.debug(e.getLineNumber()+e.getMessage());
        }
    }
}