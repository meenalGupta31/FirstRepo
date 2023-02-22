import getContacts from '@salesforce/apex/getContactRelatedToAccount.getContactList';
import { api, LightningElement, track, wire } from 'lwc';
export default class GetContactRelatedToAccountCmp extends LightningElement {
    
    @track employeeData = [];  
    @api contactlist;
    @api Contacts;
    @api error;
   // @wire (getContacts) Contacts;
    employeeColumns = [
        { label: 'Contact Name', fieldName: 'Name' }
    ];

    @wire(getContacts, { })
    wiredAccount({error, data }) {
        if (data) {
            console.log('data->'+data);
            this.Contacts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
        }
    }
  }