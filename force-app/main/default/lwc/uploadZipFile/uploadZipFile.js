import uploadFile from '@salesforce/apex/UploadZipFile_apex.uploadFile';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { api, LightningElement } from 'lwc';
export default class UploadZipFile extends LightningElement { 
    @api recordId;
    fileData
    openfileUpload(event) {
        const file = event.target.files[0]
        console.log('file---->>'+JSON.stringify(file.name));
        var reader = new FileReader()
        reader.onload = () => {
            var base64 = reader.result.split(',')[1]
            console.log('base64'+base64);
            this.fileData = {
                'filename': file.name,
                'base64': base64,
                'recordId': this.recordId
            }
            console.log(this.fileData)
        }
        reader.readAsDataURL(file)
    }
    
    handleClick(){
        const {base64, filename, recordId} = this.fileData
        uploadFile({ base64, filename, recordId }).then(result=>{
            this.fileData = null
            let title = `${filename} uploaded successfully!!`
            this.toast(title)
        })
    }

    toast(title){
        const toastEvent = new ShowToastEvent({
            title, 
            variant:"success"
        })
        this.dispatchEvent(toastEvent)
    }
}