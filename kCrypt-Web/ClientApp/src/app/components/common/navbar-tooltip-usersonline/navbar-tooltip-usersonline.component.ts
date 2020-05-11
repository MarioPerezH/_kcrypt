import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-tooltip-usersonline',
  templateUrl: './navbar-tooltip-usersonline.component.html',
  styleUrls: ['./navbar-tooltip-usersonline.component.css']
})
export class NavbarTooltipUsersonlineComponent implements OnInit {
    model: Model;
    constructor() {
        this.model = new Model();
        this.model.users = [];
    }

    ngOnInit() {
        this.addUser({
            userName: 'Mario P�rez',
            job: 'Lider T�cnico',
            isOnline: true,
            pathImage: 'http://demo.interface.club/limitless/demo/bs4/Template/global_assets/images/demo/users/face24.jpg'
        });
        this.addUser({
            userName: 'Mario P�rez',
            job: 'Lider T�cnico',
            isOnline: false,
            pathImage: 'http://demo.interface.club/limitless/demo/bs4/Template/global_assets/images/demo/users/face24.jpg'
        });
        this.addUser({
            userName: 'Mario P�rez',
            job: 'Lider T�cnico',
            isOnline: true,
            pathImage: 'http://demo.interface.club/limitless/demo/bs4/Template/global_assets/images/demo/users/face24.jpg'
        });
        this.addUser({
            userName: 'Mario P�rez',
            job: 'Lider T�cnico',
            isOnline: false,
            pathImage: 'http://demo.interface.club/limitless/demo/bs4/Template/global_assets/images/demo/users/face24.jpg'
        });
        this.addUser({
            userName: 'Mario P�rez',
            job: 'Lider T�cnico',
            isOnline: true,
            pathImage: 'http://demo.interface.club/limitless/demo/bs4/Template/global_assets/images/demo/users/face24.jpg'
        });
    }

    private addUser(user: IUser) {
        this.model.users.push(user);
    }
}

class Model {
    users: IUser[];
}

interface IUser {
    userName: string;
    job: string;
    isOnline: boolean;
    pathImage: string;
}