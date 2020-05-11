import { Directive, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[uploader]'
})
export class DropzoneDirective implements OnInit {

    @Input('uploader-text') text: string;
    @Input('uploader-extension') extension: string;
    @Input('uploader-data') adiionalData: string;

    public dropzone: any;

    constructor(private element: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        let _aditionalData = this.adiionalData;

        Dropzone.autoDiscover = false;
        Dropzone.options.dropzoneSingle = {
            url: 'http://',
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 40, // MB
            maxFiles: 1,
            dictDefaultMessage: this.text,
            autoProcessQueue: false,
            previewTemplate: document.getElementById('template-preview').innerHTML,
            clickable: false,
            createImageThumbnails: false,
            acceptedFiles: this.extension,
            dictInvalidFileType: "El formato no es valido, elimine el archivo y vuelva a cargar",
            init: function () {
                this.on('addedfile', function (file) {
                    if (this.fileTracker) {
                        this.removeFile(this.fileTracker);
                    }

                    file["data"] = _aditionalData;
                    this.fileTracker = file;
                });
            }
        };

        $(this.element.nativeElement).dropzone(Dropzone.options.dropzoneSingle);
    }
}

declare var $: any;
declare var Dropzone: any;