import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar-tooltip-messages',
    templateUrl: './navbar-tooltip-messages.component.html',
    styleUrls: ['./navbar-tooltip-messages.component.css']
})
export class NavbarTooltipMessagesComponent implements OnInit {
    model: Model;
    constructor() {
        this.model = new Model();
        this.model.messages = [];
    }

    ngOnInit() {
        this.addMessage({
            userName: 'Mario Pérez',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            date: '',
            pathImage: 'http://demo.interface.club/limitless/demo/bs4/Template/global_assets/images/demo/users/face24.jpg'
        });
        this.addMessage({
            userName: 'Mario Pérez',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            date: '',
            pathImage: 'http://demo.interface.club/limitless/demo/bs4/Template/global_assets/images/demo/users/face24.jpg'
        });
        this.addMessage({
            userName: 'Mario Pérez',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            date: '',
            pathImage: 'http://demo.interface.club/limitless/demo/bs4/Template/global_assets/images/demo/users/face24.jpg'
        });
        this.addMessage({
            userName: 'Mario Pérez',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            date: '',
            pathImage: 'http://demo.interface.club/limitless/demo/bs4/Template/global_assets/images/demo/users/face24.jpg'
        });
        this.addMessage({
            userName: 'Mario Pérez',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            date: '',
            pathImage: 'http://demo.interface.club/limitless/demo/bs4/Template/global_assets/images/demo/users/face24.jpg'

        });
    }

    public addMessage(message: IMessage) {
        this.model.messages.push(message);
    }
}

class Model {
    messages: IMessage[];
}

interface IMessage {
    userName: string;
    message: string;
    date: string;
    pathImage: string
}
