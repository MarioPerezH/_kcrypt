import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class CipherService {
    public passwordCipher: string;

    constructor() { }

    public setPassword(password: string){
        this.passwordCipher = password;
    }

    public encrypt(value: string) {
        let encrypt = CryptoJS.AES.encrypt(value, this.passwordCipher).toString();
        return encrypt;
    }

    public decrypt(encrypted: string ) {
        let decrypt = CryptoJS.AES.decrypt(encrypted, this.passwordCipher).toString(CryptoJS.enc.Utf8);
        return decrypt;
    }

    public clearPassword(){
        this.passwordCipher = null;
    }
}
