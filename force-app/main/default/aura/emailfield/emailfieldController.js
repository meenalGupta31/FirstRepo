({
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
                if(selectedRecList[i].value === item.value)
                    count=0;
            }
            if(count==1)
                selectedRecList.push(item);
            component.set("v.selectedRecord",selectedRecList);
            component.set("v.strText",null);
            component.set("v.displayDp",false);
            emailsList.push(text);
        }
        else{
            
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type" : "error",
                "title": "Error!",
                "message": "Please enter valid Email address to commit!."
            });
            toastEvent.fire();
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
                if(selectedRecList[i].value === item.value)
                    count=0;
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
    }
})