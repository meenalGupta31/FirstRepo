import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import { LightningElement, wire } from 'lwc';

export default class PublishCmp extends LightningElement {
    strText = '';
    @wire(CurrentPageReference) objpageReference;

    changeName(event){
        this.strText = event.target.value;
    }
    
    // This method will fire the event and pass strText as a payload.
    publishEvent(){
        fireEvent(this.objpageReference, 'sendNameEvent', this.strText);
    }
}