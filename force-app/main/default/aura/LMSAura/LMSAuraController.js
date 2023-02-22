({
   /* handleMessage : function(component, event, helper) {
        try{    
            let payload = {
                Data: { value: "Sample Message",
                       channel: 'SampleChannel',
                       source: 'Aura' }
            };
            component.set('v.messageFromPublisher',JSON.stringify(payload));
            console.log('v.messageFromPublisher--->>'+component.get('v.messageFromPublisher'));
        }
        catch(exp){
            console.log(exp.message);
        }
    },*/
    publishMC: function(component, event, helper) {
        try{
            let payload = {
                Data: { value: "Sample Message",
                       channel: 'SampleChannel',
                       source: 'Aura' }
            };
            component.find("sampleMessageChannel").publish(payload);  
             component.set('v.messageFromPublisher',JSON.stringify(payload));
        } catch (error) {
            console.log(`Error—${error}`);
        }
    }
})