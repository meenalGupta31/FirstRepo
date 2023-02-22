import { api, LightningElement, track } from 'lwc';

export default class ParentBarCmp extends LightningElement {
    @track barVal = 10;
    @api EventName;
    passToParent(event){
        this.barVal = event.detail.ProgressValue;
        this.EventName = event.detail.EventName;
    }
}