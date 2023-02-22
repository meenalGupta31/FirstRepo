({
    newCaseAction : function(component, event, helper) {
        var homePageNewslabel = $A.get("$Label.c.HomePageNewsLabel");
        component.set('v.homePageNews', homePageNewslabel);
    }
})