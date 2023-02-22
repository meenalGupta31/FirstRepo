import SAMPLEMC from "@salesforce/messageChannel/MyMessageChannel__c";
import { createMessageContext, publish, releaseMessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import { LightningElement, track } from 'lwc';

export default class LMCWebComponentDemo extends LightningElement {
    @track receivedMessage = '';
    @track myMessage = 'Sample Message';
    subscription = null;
    context = createMessageContext();

    constructor() {
        super();
    }

    /*handleChange(event) {
        this.myMessage = event.target.value;
    }*/

    publishMC() {
        const message = {
            messageToSend: this.myMessage,
            sourceSystem: "From LWC"
        };
        publish(this.context, SAMPLEMC, message);
    }

    subscribeMC() {
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(this.context, SAMPLEMC, (message) => {
            this.displayMessage(message);
        });
     }
 
     unsubscribeMC() {
         unsubscribe(this.subscription);
         this.subscription = null;
     }

     displayMessage(message) {
         this.receivedMessage = message ? JSON.stringify(message, null, '\t') : 'no message payload';
     }

     disconnectedCallback() {
         releaseMessageContext(this.context);
     }

}