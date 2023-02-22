({
     getSObjectList: function(component) {
        try{
            var action = component.get('c.getsEmails');
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var storeResponse = response.getReturnValue();
                    component.set('v.FromEmail',storeResponse.Email);
                    var options = [
                        { value: "Email", label: storeResponse.Name+'<'+storeResponse.Email+'>'}
                    ];
                    component.set("v.options", options);
                } });
            $A.enqueueAction(action);
        }
        catch(err){
            console.log(err.message);
        }
    },
    ShowToastHelper:function(component, event,message, type, title){
  	  var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": title,
                "message": message,
                "type" : type
            });
            toastEvent.fire();
  	},
    onSend : function(component, event, helper) {
        try{
            var emails = component.get("v.Emails");
            var ccemails = component.get("v.ccEmails");
            var bccemails = component.get("v.bccEmails");
            var subject = component.get("v.subject");
            var mailBody = component.get("v.mailBody");
            var recordId = component.get("v.recordId");
            console.log('recordId >>>'+recordId);
            var contIds = [];
            var attach = component.get("v.addAttachmentPill");
            for(var i=0;i<attach.length;i++)
                contIds.push(attach[i].ContentDocumentId);
            console.log(attach);
            var validEmails = [];
            var invalidEmails = [];
            var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if(emails.length > 0){
                for(var i=0; i<emails.length; i++){
                    if(emails[i].match(mailformat))
                        validEmails.push(emails[i]);
                    else
                        invalidEmails.push(emails[i]);
                }
            }
            if(ccemails.length > 0){
                for(var i=0; i<ccemails.length; i++){
                    if(ccemails[i].match(mailformat))
                        validEmails.push(ccemails[i]);
                    else
                        invalidEmails.push(ccemails[i]);
                }
            }
            if(bccemails.length > 0){
                for(var i=0; i<emails.length; i++){
                    if(bccemails[i].match(mailformat))
                        validEmails.push(bccemails[i]);
                    else
                        invalidEmails.push(bccemails[i]);
                }
            }
            if(invalidEmails.length > 0){
                helper.ShowToastHelper(component, event,'One or more Invalid EmailId Found!', 'error','Error');
            }
            else if( validEmails.length == 0 &&  invalidEmails.length == 0){
                helper.ShowToastHelper(component, event,'Add a recipient to send an email.', 'error','Error');
            }
                else if(subject == null){
                    helper.ShowToastHelper(component, event,'No subject found', 'error','Error');
                }
            else if(mbody == null){
                    helper.ShowToastHelper(component, event,'No Email Body found', 'error','Error');
                }
                    else{
                        var action = component.get("c.sendMailMethod");
                        action.setParams({
                            "recordId" : recordId,
                            "mToMail" : emails,
                            "mCcMail" : ccemails,
                            "mBccMail" : bccemails,
                            "mbody" : mailBody,
                            "mSubject" : subject,
                            "contentDocId" : contIds
                        })
                        action.setCallback(this,function(response){    
                            var result = response.getReturnValue();
                            if(response.getState() === 'SUCCESS') {
                                if(!$A.util.isUndefinedOrNull(result) && !$A.util.isEmpty(result))
                                {
                                    console.log(JSON.stringify(result));
                                    var toastEvent = $A.get("e.force:showToast");
                                    toastEvent.setParams({
                                        title : 'Success',
                                        message: 'Email sent.',
                                        duration:' 5000',
                                        key: 'info_alt',
                                        type: 'success',
                                        mode: 'pester'
                                    });
                                    toastEvent.fire();
                                    component.set("v.Emails",null);
                                    component.set("v.ccEmails",null);
                                    component.set("v.bccEmails",null);
                                    component.set("v.subject",null);
                                    component.set("v.mailBody",null);
                                    component.set("v.selectedRecord",null);
                                    component.set("v.addAttachmentPill",null);
                                    component.set('v.recordsId',null);
                                    component.set("showError",false);
                                }
                                else{
                                    helper.ShowToastHelper(component, event,'Something wrong found!', 'error','Error');
                                }
                            }
                            else{
                                console.log('No success');
                                helper.ShowToastHelper(component, event,'Something wrong found!', 'error','Error');
                            }
                        });
                        window.location.reload();
                        $A.enqueueAction(action);
                    }
        }
        catch(err){
            console.log(err);
        }
    }
})