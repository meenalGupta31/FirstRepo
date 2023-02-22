import { LightningElement, wire } from 'lwc';

export default class Demo extends LightningElement {

    @wire(test,{})
    backendData({error, data}){
        if(data){

        }else{
        console.log('test');    
        }
    }
}