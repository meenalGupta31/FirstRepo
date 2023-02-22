import getRecord from '@salesforce/apex/getAccounts.get20Accounts';
import updateAccountList from '@salesforce/apex/getAccounts.updateAccountList';
import { api, LightningElement, wire } from 'lwc';

export default class DemoLwcComponent1 extends LightningElement {
    @api Message = '';
    @api MessageRecieved = ''; 
    data = [];
    error = [];
    accountList = [];

    //wire method
    @wire(getRecord, {})
    wiredAccount({ error, data }) {
        console.log('error-->>'+error);
        console.log('data-->>'+JSON.stringify(data));
        if (data) {
            console.log('data-->>');
            this.accountList = data;
            console.log('accountList-->>'+this.accountList);
        } else if (error) {
            this.error = error;
        }
    }
   
  /* JS method*/
    /*handleLoad() {
        try{
            console.log('Message-->>'+this.Message);
        }catch(error){
            console.log(error);
        }
    }*/

    /* JS method Promise*/
    handleMessage(event){
            console.log('message: '+ event.target.value);
            this.Message = event.target.value;
    }
    //imperative method
    onChangeAccountName(event){
        updateAccountList({ AccountId: event.target.name,AccountName : event.target.value })
        .then(result => {
            console.log('result-->>'+result);
            this.accountList = result;
        })
        .catch(error => {
            this.error = error;
        });
    }
}