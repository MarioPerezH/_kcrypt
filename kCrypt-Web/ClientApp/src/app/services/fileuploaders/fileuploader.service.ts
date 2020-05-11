import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FileuploaderService {
    constructor() { }

    public removerInstancias() {
        Dropzone.instances = [];
    }

    public obtenerArchivos() {
        let archivos = [];
        Dropzone.instances.forEach(dropzone => {
            dropzone.getAcceptedFiles().forEach(archivo => {
                archivos.push(archivo);
            });
        });

        return archivos;
    }

    public obtenerArchivosRechazados(){
        let errores = [];
        Dropzone.instances.forEach(dropzone => {
            dropzone.getRejectedFiles().forEach(archivo => {
                errores.push(archivo);
            });
        });

        return errores;
    }
}

declare var $: any;
declare var Dropzone: any;