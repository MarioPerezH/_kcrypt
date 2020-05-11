import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionService } from './services/session/session-service.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'xxx';
    subscription: Subscription;

    constructor(private router: Router, private sessionService: SessionService) {
        this.subscription = router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {

                if (!router.navigated) {
                    //this.sessionService.logout();
                }
            }
        });
    }
}
