import { LightningElement } from 'lwc';

export default class InputProgressBar extends LightningElement {
    
    progress(event){
        const custEvent = new CustomEvent(
            'callpasstoparent', {
                detail:{
                    ProgressValue:event.target.value ,
                    EventName : event.target.name
                }
            });
        this.dispatchEvent(custEvent);
    }
}