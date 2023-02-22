({
    doInit: function(component, event, helper) {
        try{
        helper.getSObjectList(component);	
            console.log('record Id--->'+component.get('v.recordId'));
        }
        catch(err){
            console.log(err.message);
        }
    },
    handleItemRemove : function(component, event, helper) {
        try{
            var allItems = component.get('v.selectedRecord');
            var delItem = event.getSource().get("v.label");
            var emailsList = component.get("v.Emails");
            var item = {
                "label": delItem
            };
            for(var i=0; i<allItems.length; i++){
                if(allItems[i].label === item.label){ 
                    allItems.splice(i, 1);
                    emailsList.splice(i, 1);
                    break;
                }
            }
            component.set("v.selectedRecord",allItems);
        }
        catch(err){
            console.log(err);
        }
    },
    onCommit : function(component, event, helper) {  
        var text = component.get("v.strText");
        var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(text.match(mailformat)){
        var emailsList = component .get("v.Emails");
        var selectedRecList = component.get("v.selectedRecord");
        var item = {
            "label": text,
            "value": text.toString()
        };
        var count=1;
        for(var i=0; i<selectedRecList.length; i++){
            if(selectedRecList[i].value === item.value){
                count=0;
                break;
            }
        }
        if(count==1)
            selectedRecList.push(item);
        component.set("v.selectedRecord",selectedRecList);
        component.set("v.strText",null);
        component.set("v.displayDp",false);
        emailsList.push(text);
        }
        else{
            helper.ShowToastHelper(component, event,'Please enter valid Email address to commit!', 'error','Error');
        }
        
    },
    onBlur : function(component, event, helper) {
        component.set("v.displayDp",false);
    },
    searchRecords : function(component, event, helper) {
        try{
            var text = component.get("v.strText");
            var action = component.get("c.fetchRecords");
            action.setParams({
                'searchString' : text 
            });
            action.setCallback(this,function(response){    
                var result = response.getReturnValue();
                if(response.getState() === 'SUCCESS') {
                    if(result.length > 0)
                    {
                        component.set("v.displayDp",true);
                        component.set("v.objectsRecord",result);
                    }
                    else{
                        component.set("v.displayDp",false);
                    }
                }
            });
            $A.enqueueAction(action);
        }
        catch(err){
            console.log(err);
        }
    },
    selectItem : function(component, event, helper) {
        try{
            var objlist = component.get("v.objectsRecord");
            var selectedRecList = [];
            selectedRecList = component.get("v.selectedRecord");
            var emailsList = component .get("v.Emails");
            var newItem = event.currentTarget.id;
            var idSplit = newItem.split(' ');
            var item = {
                "label": objlist[idSplit[1]].name,
                "value": objlist[idSplit[1]].recordId,
                "iconname" : objlist[idSplit[1]].ObjType
            };
            var count=1;
            for(var i=0; i<selectedRecList.length; i++){
                if(selectedRecList[i].value === item.value){
                    count=0;
                    break;
                }
            }
            if(count==1)
                selectedRecList.push(item);
            component.set("v.selectedRecord",selectedRecList);
            component.set("v.strText","");
            emailsList.push(objlist[idSplit[1]].email);
        }
        catch(err){
            console.log(err);
        }
    },
    onCc : function(component, event, helper) {
        component.set("v.displayCc",true);
    },
    onSave : function(component, event, helper) {
        helper.onSend(component, event, helper);
    },
    
    openModel: function(component, event, helper) {
        component.set("v.openAttmenu", true);
    },
    attRemove : function(component, event, helper) {
        try{
            var allItems = component.get('v.addAttachmentPill');
            var delItem = event.getSource().get("v.label");
            var item = {
                "label": delItem
            };
            for(var i=0; i<allItems.length; i++){
                if(allItems[i].Title === item.label){ 
                    console.log(allItems[i].Title + item.label );
                    allItems.splice(i, 1);
                    break;
                }
            }
            component.set("v.addAttachmentPill",allItems);
        }
        catch(err){
            console.log(err);
        }
    },
    hideError : function(component, event, helper) {
        try{
            console.log('working');
            component.set("v.showError",false);
        }
        catch(err){
            console.log(err);
        }
    }
})