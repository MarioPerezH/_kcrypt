import { Directive, Input, ElementRef, Renderer2, OnInit, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[datatable]'
})
export class DatatableDirective implements OnInit {

    @Input('datatable') propertyBinding: string;

    constructor(private element: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        $.extend($.fn.dataTable.defaults, {
            autoWidth: true,
            responsive: false,
            searching: true,
            pageLength: 25,
            columnDefs: [{
                orderable: false,
                //width: 100,
            }],
            dom: '<"datatable-header"fl><"datatable-scroll-wrap"t><"datatable-footer"ip>',
            language: {
                search: '<span>Filtro:</span> _INPUT_',
                searchPlaceholder: 'Ingrese texto...',
                lengthMenu: '<span>Show:</span> _MENU_',
                paginate: { 'first': 'First', 'last': 'Last', 'next': $('html').attr('dir') == 'rtl' ? '&larr;' : '&rarr;', 'previous': $('html').attr('dir') == 'rtl' ? '&rarr;' : '&larr;' },
                info: "Total registros: _TOTAL_ de _MAX_",
                sInfoEmpty:"Total registros: _TOTAL_ de _MAX_",
                sInfoFiltered:"",
                sZeroRecords:"No se encontraron coincidencias",
                emptyTable: "No existen registros disponibles"
            },

        });
        //$(this.element.nativeElement).DataTable();
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.propertyBinding.currentValue === null || changes.propertyBinding.currentValue === undefined) {
            $(this.element.nativeElement).DataTable().destroy();
            return;
        }
        setTimeout(() => {
            let $table = $(this.element.nativeElement);
            let $footInputs = $table.find('tfoot td').not(':last-child');

            $footInputs.each(function () {
                let value = $(this).html();

                if (!value) return;

                $(this).html(value.indexOf("input") > -1 ? value : '<input type="text" class="form-control input-sm" placeholder="' + value + '" />');
            });
            var table = $table.DataTable();

            if ($footInputs.length > 0) {
                table.columns().every(function () {
                    var that = this;
                    $('input', this.footer()).on('keyup change', function () {
                        that.search(this.value).draw();
                    });
                });
            }
        }, 50);

    }
}

declare var $: any;
declare var DatatableResponsive: any;