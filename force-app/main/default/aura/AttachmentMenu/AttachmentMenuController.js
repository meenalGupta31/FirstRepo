({
handleUploadFinished: function (component , event) {
try{
    var uploadedFiles = event.getParam("files");
    var addfiles = component.get("v.addAttachmentPill");
    console.log('addfiles--->>'+addfiles);
    var att = {
        "Title" : uploadedFiles[0].name,
        "ContentDocumentId" : uploadedFiles[0].documentId,
        "icon" : 'attachment'
    };
    addfiles.push(att);
    var attCount = addfiles.length;
    if(attCount<10){
        component.set("v.addAttachmentPill",addfiles);
        component.set("v.isModalOpen", false);
    }
    else{
        var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                title : 'Error',
                                message: "You can't add more than 10 attachments!",
                                duration:' 5000',
                                key: 'info_alt',
                                type: 'error',
                                mode: 'pester'
                            });
                            toastEvent.fire();
        component.set("v.isModalOpen", false);
    }
}
catch(err){
    console.log(err);
}
},

doInit : function(component, event, helper) {
try{
    var action = component.get("c.fetchContentDocuments");
    var attachments = component.get("v.addAttachmentPill");
    var attachmentscount = attachments.length;
    var checked = [];
    action.setCallback(this, function(a) {
        var returnValue = a.getReturnValue();
        var returnValueItems = [];
        if(!$A.util.isEmpty(returnValue)){
            for(var i=0;i<returnValue.length;i++){
                console.log(returnValue[i].Id);
                var icon = 'image';
                    if(returnValue[i].FileType == 'PDF')
                        icon = 'pdf';
                    if(returnValue[i].FileType == 'WORD_X')
                        icon = 'word';
                    if(returnValue[i].FileType == 'POWER_POINT_X')
                        icon = 'ppt';
                    if(returnValue[i].FileType == 'TEXT')
                        icon = 'txt';
                var old = returnValue[i].ContentModifiedDate;
                var newReturnValue={
                    "Title" : returnValue[i].Title,
                    "ContentModifiedDate" : old.slice(0,10) +' ',
                    "ContentSize" : ' '+(returnValue[i].ContentSize/1024).toFixed(2) + 'kb ',
                    "FileType" : ' '+returnValue[i].FileType,
                    "ContentDocumentId" : returnValue[i].ContentDocumentId,
                    "Id" : returnValue[i].Id,
                    "icon" : icon
                }
                returnValueItems.push(newReturnValue);

                checked.push('false');
            }
            component.set("v.ContentDocItems",returnValueItems);
            component.set("v.checked", checked);
            component.set("v.attachmentscount",attachmentscount);
        }else{
            alert("Failed to fetch content documents from apex");
        }
    });
    $A.enqueueAction(action)
}
catch(err){
    console.log(err);
}
},
forAttachmentPill : function(component, event, helper) {
try{
    var selecteditem = component.get("v.selecteditems");
    var items = component.get("v.addAttachmentPill");
    console.log('items---->>'+items);
     console.log('selecteditem---->>'+selecteditem);
    for(var i=0;i<selecteditem.length;i++){
        var attcount = items.length;
        if(attcount<10){
            var count=1;
            for(var j=0;j<items.length;j++){
                if(JSON.parse(JSON.stringify(selecteditem[i].ContentDocumentId)) == items[j].ContentDocumentId)
                    count=0;
            }
            if(count==1)
                items.push(selecteditem[i]);

            component.set("v.addAttachmentPill",items);
            component.set("v.isModalOpen", false);
            component.set("v.selecteditems",null);
        }
        else{
            console.log('More Tham 10');
            var toastEvent = $A.get("e.force:showToast");
                                            toastEvent.setParams({
                                                title : 'Error',
                                                message: "You can't add more than 10 attachments!",
                                                duration:' 5000',
                                                key: 'info_alt',
                                                type: 'error',
                                                mode: 'pester'
                                            });
                                            toastEvent.fire();
            component.set("v.isModalOpen", false);
            component.set("v.selecteditems",null);
        }
    }
}
catch(err){
    console.log(err);
}
},
closeModel: function(component, event, helper) {
component.set("v.isModalOpen", false);
},
openModel: function(component, event, helper) {
component.set("v.isModalOpen", true);
},
searchResult : function(component, event, helper) {
try{
    var action = component.get("c.searchContentDocuments");
    var inputstr = component.get("v.searchInput");
    console.log(typeof inputstr);
    if(inputstr != ""){
        action.setParams({
            "inputStr" : inputstr
        });
        action.setCallback(this, function(a) {
            var returnValue = a.getReturnValue();
            console.log(returnValue);
            var returnValueItems = [];
            if(!$A.util.isEmpty(returnValue)){
                component.set("v.inSearch",true);
                component.set("v.usualData",false);
                component.set("v.noSearchResult",false);
                for(var i=0;i<returnValue.length;i++){
                     var icon = 'image';
                    if(returnValue[i].FileType == 'PDF')
                        icon = 'pdf';
                    if(returnValue[i].FileType == 'WORD_X')
                        icon = 'word';
                    if(returnValue[i].FileType == 'POWER_POINT_X')
                        icon = 'ppt';
                    if(returnValue[i].FileType == 'TEXT')
                        icon = 'txt';
                    var old = returnValue[i].ContentModifiedDate;
                    var newReturnValue={
                        "Title" : returnValue[i].Title,
                        "ContentModifiedDate" : old.slice(0,10) +' ',
                        "ContentSize" : ' '+(returnValue[i].ContentSize/1024).toFixed(2) + 'kb ',
                        "FileType" : ' '+returnValue[i].FileType,
                        "icon" : icon,
                        "Id" : returnValue[i].Id
                    }
                    returnValueItems.push(newReturnValue);
                }
                component.set("v.searchedContentDocItems",returnValueItems);
            }else{
                component.set("v.inSearch",false);
                component.set("v.usualData",false);
                component.set("v.noSearchResult",true);
            }
        });
        $A.enqueueAction(action)
    }
    else{
        component.set("v.usualData",true);
        component.set("v.inSearch",false);
        component.set("v.noSearchResult",false);
    }
}
catch(err){
    console.log(err);
}
},
checkCB: function(component, event, helper) {
try{
    var items = component.get("v.addAttachmentPill");
    console.log('items'+items.length);
    if(items.length==10){
        console.log('More than 10');
        var toastEvent = $A.get("e.force:showToast");
                                            toastEvent.setParams({
                                                title : 'Error',
                                                message: "You can't add more than 10 attachments!",
                                                duration:' 5000',
                                                key: 'info_alt',
                                                type: 'error',
                                                mode: 'pester'
                                            });
                                            toastEvent.fire();
            component.set("v.isModalOpen", false);
    }
    var item = event.currentTarget.id;
    var t = component.get("v.checked");
    if(t[item] == 'false'){
        var selectedItemList = component.get("v.selecteditems");
        t[item] = 'true';
        component.set('v.checked', t);
        var data = component.get("v.ContentDocItems");
        selectedItemList.push(data[item]);
        var count = selectedItemList.length;
        if(count>0 && count<=10){
            component.set("v.addButton",false);
            component.set("v.attcount",count);
        }
        else{
            console.log('more than 10');
            component.set("v.addButton",true);
        }
    }
    else{
        var selectedItemList = component.get("v.selecteditems");
        t[item] = 'false';
        component.set('v.checked', t);
        var data = component.get("v.ContentDocItems");
        for(var i = 0; i<selectedItemList.length;i++){
            if(data[item].ContentDocumentId == selectedItemList[i].ContentDocumentId){
                selectedItemList.splice(i,1);
                var count = selectedItemList.length;
                }
        }
            component.set("v.attcount",count);
            if(count>0 && count<=10){
            component.set("v.addButton",false);
            }
            else
            component.set("v.addButton",true);
    }
}
catch(err){
    console.log(err);
}
},
onScroll :  function(c, e, h) {
           try{
           var height = 2000;

            if (document.getElementById("content").scrollTop == height){
            console.log(document.getElementById("content").clientHeight); //visible area
            console.log(document.getElementById('content').scrollHeight); //div area
                       console.log(document.getElementById("content").scrollTop);  //scrolled height from top
                       console.log(document.getElementById("content").offsetHeight );  //scrolled height from top
                console.log('height 250');
                height += 100;
            }
           }catch(err){
                console.log(err);
            }
           },
    selectItems  :  function(c, e, h) {
    console.log('select');
    },
})