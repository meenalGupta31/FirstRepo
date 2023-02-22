import { api, LightningElement } from 'lwc';


export default class demoLwcComponent extends LightningElement {
   
    @api Message = '';
    @api MessageRecieved = ''; 

    handleLoad() {
        this.MessageRecieved = Message;    
    }

}