import { Directive, Input, ElementRef, SimpleChanges, Renderer2, EventEmitter, Output, Renderer } from '@angular/core';

@Directive({
    selector: '[selectBasicEventChange]'
})
export class SelectBasicDirective {
    constructor(private element: ElementRef, private renderer: Renderer2) {
        let bold = 'class="font-weight-semibold"';
        let callbackCustom = (item) => {
            let element = item.element,
                level = $(element).data('level'),
                xxx = $(element).data('level-xxx');

            if (!level) return item.text;

            let spaceLevel = '',
                cont = 1;

            while (cont <= +level) {
                spaceLevel += '&nbsp;&nbsp;&nbsp;'
                cont++;
            }

            // if (level == 1)
            //     return '<span class="font-weight-semibold">' + item.text + '</span>';
            // else
            return '<span ' + (xxx ? bold : '') + '>' + spaceLevel + item.text + '</span>';
        };

        $(this.element.nativeElement)
            .select2({
                placeholder: 'Seleccione',
                allowClear: true,
                templateResult: callbackCustom,
                //templateSelection: callbackCustom,
                escapeMarkup: function (m) { return m; }
            })
            .on('select2:select', (e) => {
                this.element.nativeElement.dispatchEvent(new Event('change'));
            })
            .on('select2:unselecting', (e) => {
                this.renderer.setProperty(this.element.nativeElement, 'value', "0: null");
                this.element.nativeElement.dispatchEvent(new Event('change'));
            });


    }
}
declare var $: any;