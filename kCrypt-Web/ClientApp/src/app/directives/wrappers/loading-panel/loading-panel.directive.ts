import { Directive, ElementRef, Input, SimpleChanges, Renderer2 } from '@angular/core';

@Directive({
    selector: '[loadingPanel]'
})
export class LoadingPanelDirective {
    private child: any;
    @Input('loadingPanel') isLoading: boolean;

    constructor(private element: ElementRef, private renderer: Renderer2) {
        this.renderer.addClass(this.element.nativeElement, "loading-hide-content");
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.isLoading.currentValue === null || changes.isLoading.currentValue === undefined) {
            this.renderer.removeClass(this.element.nativeElement, "loading-hide-content");
            return;
        }

        setTimeout(() => {
            this.renderer.addClass(this.element.nativeElement, "loading-hide-content");
        }, 1500);

    }
}

declare var $: any;
declare var DatatableResponsive: any;