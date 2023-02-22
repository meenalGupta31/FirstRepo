({
    helper1 : function(component, event, helper) {
          try{
        $A.util.toggleClass(component.find('resultsDiv'), 'slds-is-open');
        $A.util.removeClass(component.find('objectDataDiv'), 'slds-is-open');
        var objectList = component.get('v.objectList');
        objectList.push( {label:'Accounts', APIName:'Account', fieldName: 'Name', iconName: 'standard:account'},
                        {label:'Asset Relationships', APIName:'AssetRelationship', fieldName: 'AssetRelationshipNumber', iconName: 'standard:asset_relationship'},
                        {label:'Assets', APIName:'Asset', fieldName: 'Name', iconName: 'standard:asset_object'},
                        {label:'Assigned Resources', APIName:'AssignedResource', fieldName: 'AssignedResourceNumber', iconName: 'standard:assigned_resource'},
                        {label:'Campaigns', APIName:'Campaign', fieldName: 'Name', iconName: 'standard:campaign'},
                        {label:'Cases', APIName:'Case', fieldName: 'CaseNumber', iconName: 'standard:case'},
                        {label:'Communication Subscription Consents', APIName:'CommSubscriptionConsent', fieldName: 'Name', iconName: 'custom:custom15'},
                        {label:'Contact Requests', APIName:'ContactRequest', fieldName: 'Name', iconName: 'standard:contact_request'},
                        {label:'Contracts', APIName:'Contract', fieldName: 'Name', iconName: 'standard:contract'},
                        {label:'Credit Memos', APIName:'CreditMemo', fieldName: 'DocumentNumber', iconName: 'standard:maintenance_plan'},
                        {label:'Invoices', APIName:'Invoice', fieldName: 'DocumentNumber', iconName: 'standard:maintenance_plan'},
                        {label:'List Emails', APIName:'ListEmail', fieldName: 'FromName', iconName: 'standard:list_email'},
                        {label:'Locations', APIName:'Location', fieldName: 'Name', iconName: 'standard:location'},
                        {label:'Opportunities', APIName:'Opportunity', fieldName: 'Name', iconName: 'standard:opportunity'},
                        {label:'Orders', APIName:'Order', fieldName: 'Name', iconName: 'standard:orders'},
                        {label:'Party Consents', APIName:'PartyConsent', fieldName: 'Name', iconName: 'standard:individual'},
                        {label:'Process Exceptions', APIName:'ProcessException', fieldName: 'ProcessExceptionNumber', iconName: 'standard:process_exception'},
                        {label:'Resource Absences', APIName:'ResourceAbsence', fieldName: 'AbsenceNumber', iconName: 'standard:resource_absence'},
                        {label:'Return Order Line Items', APIName:'ReturnOrderLineItem', fieldName: 'ReturnOrderLineItemNumber', iconName: 'standard:return_order_line_item'},
                        {label:'Return Orders', APIName:'ReturnOrder', fieldName: 'ReturnOrderNumber', iconName: 'standard:return_order'},
                        {label:'Service Appointments', APIName:'ServiceAppointment', fieldName: 'AppointmentNumber', iconName: 'standard:service_appointment'},
                        {label:'Service Resources', APIName:'ServiceResource', fieldName: 'Name', iconName: 'standard:service_resource'},
                        {label:'Solutions', APIName:'Solution', fieldName: 'SolutionName', iconName: 'standard:solution'} );
        component.set('v.objectList', objectList);
        component.set('v.selectedObject', component.get('v.objectList')[0]);
      
        var acc = component.get('v.record');
              console.log('acc'+acc);
            var action = component.get("c.fetchRec");
            action.setParams({ 
                    "objId": acc
                });
            action.setCallback(this, function(response) {    
        	var result = response.getReturnValue();
                console.log('result'+result);
        	if(response.getState() === 'SUCCESS') {
                 console.log('result'+result);
                component.set("v.selectedRecord",result);
            } 
                else{
                    console.log('error'+response.getError());
                }
            });
             $A.enqueueAction(action);
        }
       	catch(Ex){
                console.log('Exceptions :: '+Ex);
            }
    },
    
	searchRecordsHelper : function(component, event, helper) {
		$A.util.removeClass(component.find("Spinner"), "slds-hide");
        component.set('v.message', '');
        component.set('v.recordsList', null);
        var selectedObject = component.get('v.selectedObject');
 
		// Calling Apex Method
    	var action = component.get('c.fetchRecords');
        action.setParams({
            'objectName' : selectedObject.APIName,
            'filterField' : selectedObject.fieldName,
            'searchString' : component.get('v.searchString')
        });
        action.setCallback(this,function(response){    
        	var result = response.getReturnValue();
        	if(response.getState() === 'SUCCESS') {
                // To check if any records are found for searched keyword
    			if(result.length > 0) {
					component.set('v.recordsList', result);        
    			} else {
    				component.set('v.message', 'No Records Found');
    			}
        	} else if(response.getState() === 'INCOMPLETE') {
                component.set('v.message','No Server Response or client is offline');
            } else if(response.getState() === 'ERROR') {
                // If server throws any error
                var errors = response.getError();
                if (errors && errors[0] && errors[0].message) {
                    component.set('v.message', errors[0].message);
                }
            } 
            // To open the drop down list of records
            $A.util.addClass(component.find('resultsDiv'), 'slds-is-open');
        	$A.util.addClass(component.find("Spinner"), "slds-hide");
        });
        $A.enqueueAction(action);
	}
})