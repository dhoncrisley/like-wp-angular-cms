import { Directive, ElementRef, OnInit, Input, Renderer2, Renderer } from '@angular/core';

@Directive({
    selector: "[looper]"
})
export class TestDirective implements OnInit {
    constructor(public el: ElementRef, public renderer: Renderer) {}

    @Input() looper: string;

    ngOnInit(){
        // Use renderer to render the emelemt with styles
        console.log('testDirective invoked')
        this.renderer.setElementAttribute(this.el.nativeElement, '*ngFor', 'let post of posts');
        if(this.looper) {
            console.log('hide');
        }
    }

}
