import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import { LightningElement, wire } from 'lwc';

export default class SubscribeCmp extends LightningElement {
    strCapturedText = '';
    @wire(CurrentPageReference) pageRef;

    // This method will run once the component is rendered on DOM and will add the listener.
    connectedCallback(){
        registerListener('sendNameEvent', this.setCaptureText, this);
    }

    // This method will run once the component is removed from DOM.
    disconnectedCallback(){
        unregisterAllListeners(this);
    }

    // This method will update the value once event is captured.
    setCaptureText(objPayload){
        this.strCapturedText = objPayload;
    }

}