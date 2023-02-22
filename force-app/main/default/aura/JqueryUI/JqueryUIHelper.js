({
    doInitHelper : function(c,e,h) {
        var action = c.get("c.JqueryUI_ApexMethod");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log('success');
                console.log('result'+response.getReturnValue());
                c.set('v.AccountList',response.getReturnValue());
                console.log('Account List--->>'+c.get('v.AccountList'));
            }
        });
        $A.enqueueAction(action);
    }
})