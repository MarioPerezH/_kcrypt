import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavbarTooltipCountdowntimerComponent } from '../../common/navbar-tooltip-countdowntimer/navbar-tooltip-countdowntimer.component';

@Component({
    selector: 'app-home-layout',
    templateUrl: './home-layout.component.html',
    styleUrls: []
})
export class HomeLayoutComponent implements OnInit {

    constructor(@Inject(DOCUMENT) private _document) {

    }

    ngOnInit() {
        this._document.body.classList.remove('body-login');
    }

}
