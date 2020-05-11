import { Directive, Input, SimpleChanges, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[loadingPanelWait]'
})
export class LoadingPanelWaitDirective {
  @Input('loadingPanelWait') isLoading: boolean;
  constructor(private element: ElementRef, private renderer: Renderer2) { }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.isLoading.currentValue === null || changes.isLoading.currentValue === undefined) {
      this.renderer.addClass(this.element.nativeElement, "loading-hide-content");
      return;
    }

    setTimeout(() => {
      this.renderer.removeClass(this.element.nativeElement, "loading-hide-content");
    }, 1500);
  }
}
