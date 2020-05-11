import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor() { }

    public descargarArchivo(nombre: string, archivo: BlobPart, contentType: string, extension: string) {
        // const downloadedFile = new Blob([archivo], { type: contentType });
        // const a = document.createElement('a');
        // a.setAttribute('style', 'display:none;');
        // document.body.appendChild(a);
        // a.download = nombre;
        // a.href = 'data:attachment/xlsx,' + URL.createObjectURL(downloadedFile);
        // a.target = '_blank';
        // a.click();
        // document.body.removeChild(a);


        if (window.navigator.msSaveOrOpenBlob) {
            var blob = this.b64toBlob(archivo, "data:application/" + extension);
            navigator.msSaveBlob(blob, nombre);
        }
        else {
            var a = document.createElement('a');
            a.style.cssText = 'display:none;';
            document.body.appendChild(a);
            a["download"] = nombre;
            a.href = 'data:application/' + extension + ';base64,' + archivo;
            a.click();
            document.body.removeChild(a);
        }
    }

    public b64toBlob(b64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    };

    public generatePassword(length: number) {
        length = !length ? 256 : length;
        let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*}{[].;'¿?=)(/&%$#!-",
            retVal = "";
        for (var i = 1, n = charset.length; i <= length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
            //if ((i % 64) == 0) retVal += '\n';
        }
        return retVal;
    }

    public generateGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 50 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
