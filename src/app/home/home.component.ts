import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    showRequiredReg = false;
    stringToEncrypt = '';
    encryptedString = '';
    decryptedString = '';
    stringToDecrypt = '';

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.dataService.LoadUser()
            .catch((err) => {
                this.showRequiredReg = true;
               console.log(err);
            });
    }

    encryptString() {
        console.log("encrypting: ", this.stringToEncrypt);
        return this.dataService.encryptString(this.stringToEncrypt, 'v1')
            .then(data => {
                console.log("Encrypted:", data);
                this.encryptedString = data.stringChunk;
            })
    }

    decryptString() {
        console.log("decrypting: ", this.stringToDecrypt);
        return this.dataService.decryptString(this.stringToDecrypt)
            .then(data => {
                console.log("Encrypted:", data);
                this.decryptedString = data.stringChunk;
            })
    }
}
