import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/Common/utils.service';
import { SessionService } from 'src/app/services/session/session-service.service';
import { CounterdownService } from 'src/app/services/counter/counterdown.service';
import { count } from 'rxjs/operators';

@Component({
    selector: 'app-navbar-tooltip-countdowntimer',
    templateUrl: './navbar-tooltip-countdowntimer.component.html',
    styleUrls: ['./navbar-tooltip-countdowntimer.component.css']
})
export class NavbarTooltipCountdowntimerComponent implements OnInit {

    public model: IModel;

    constructor(private counterdownService: CounterdownService,
        private sessionService: SessionService) {

        this.model = <IModel>{};

        let session = this.sessionService.getSession();

        this.counterdownService.start(
            session.ActiveSessionDurationSeconds,
            () => this.sessionService.logout());

        this.counterdownService.model.counterdownObservable.subscribe(counter => {
            this.model.counter = counter;
            this.model.minutes = this.formatToMinutes(counter);
        });
    }

    public formatToMinutes(s) {
        return (s - (s %= 60)) / 60 + (9 < s ? ' : ' : ' : 0') + s;
    }

    ngOnInit() {

    }

    public getColor(count: number) {
        if (count >= 20) return "bg-success";
        if (count >= 10) return "bg-warning";
        if (count < 10) return "bg-danger";
    }

    public reset() {
        this.counterdownService.reset();
    }
}

interface IModel {
    counter: number;
    minutes: string;
}


