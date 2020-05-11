import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-login-layout',
    templateUrl: './login-layout.component.html',
    styleUrls: []
})
export class LoginLayoutComponent implements OnInit {

    constructor(@Inject(DOCUMENT) private _document ) { }

    ngOnInit() {
        this._document.body.classList.add('body-login');
    }
}
