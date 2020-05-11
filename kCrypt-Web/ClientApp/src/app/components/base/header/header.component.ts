import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRoute, IBreadcrumbs } from '../../../app-routing.module';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    @Input() title: string;
    @Input() subtitle: string;

    model: Model;

    constructor(private router: ActivatedRoute) {

        this.model = new Model();

        this.model.routers = Object
            .keys(this.router.snapshot.data)
            .map((key) => {
                return this.router.snapshot.data[key];
            });

        this.model.description = (<IRoute><any>this.router.routeConfig).description;
    }

    ngOnInit() {
    }
}

class Model {
    routers: IBreadcrumbs[];
    description: string;
}