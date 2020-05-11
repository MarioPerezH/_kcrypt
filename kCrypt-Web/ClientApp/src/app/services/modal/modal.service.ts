import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';

declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private modal : HTMLElement;
    private componentRef: any = null;
    constructor(private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector) { }

    public open<T>(modalComponent: T, callbackSetParameters : (instance) => void) {
        this.close();

        const factory = this.componentFactoryResolver.resolveComponentFactory(<any>modalComponent);
        this.componentRef = factory.create(this.injector);

        this.appRef.attachView(this.componentRef.hostView);

        //this.componentRef.instance.setParameters(parameters);

        callbackSetParameters(this.componentRef.instance);

        this.modal = (this.componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        document.body.appendChild(this.modal);


        $(this.modal).find(".modal").modal({
            backdrop: 'static',
            keyboard: false
        });
    }

    public close() {
        if (this.componentRef) {
            this.appRef.detachView(this.componentRef.hostView);
            $(this.modal).find(".modal").modal('hide');
            this.componentRef.destroy();
        }
    }
}

