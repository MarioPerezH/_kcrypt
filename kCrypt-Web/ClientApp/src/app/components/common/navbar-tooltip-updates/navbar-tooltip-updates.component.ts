import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar-tooltip-updates',
    templateUrl: './navbar-tooltip-updates.component.html',
    styleUrls: ['./navbar-tooltip-updates.component.css']
})
export class NavbarTooltipUpdatesComponent implements OnInit {
    model: Model;
    constructor() {
        this.model = new Model();
        this.model.updates = [];
    }

    ngOnInit() {
        this.addUpdate({
            message: 'Add full font overrides for popovers and tooltips',
            pathIcon: 'http://demo.interface.club/limitless/demo/bs4/Template/global_assets/images/demo/users/face24.jpg',
            date: ''
        })

    }

    public addUpdate(update: IUpdate) {
        this.model.updates.push(update);
    }
}

class Model {
    updates: IUpdate[];
}

interface IUpdate {
    message: string;
    date: string,
    pathIcon: string;
}
