import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    swalInit: any;
    constructor() {
        // Defaults
        this.swalInit = swal.mixin({
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn btn-light'
        });
    }

    public Loading() {
        // this.swalInit({
        //     title: 'Cargando...',
        //     allowOutsideClick: false,
        //     allowEscapeKey: false,
        //     onOpen: () => {
        //         this.swalInit.showLoading();
        //     },
        // });
    }

    public Alert(title: string, message: string, titleButton: string) : Promise<boolean> {
        return this.swalInit({
            title: title,
            text: message,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: titleButton
        }).then(result=> result.value);
    }

    public Success(title: string, message: string){
        return this.swalInit({
            title: title,
            text: message,
            type: 'success',
            confirmButtonText: 'Cerrar'
        }).then(result=> result.value);
    }

    public Error(title: string, message: string){
        return this.swalInit({
            title: title,
            text: message,
            type: 'error',
            confirmButtonText: 'Cerrar'
        }).then(result=> result.value);
    }
}

declare var swal: any;