import { Component, OnInit } from '@angular/core';
import { ProfileFDto } from 'src/app/services/Common/ObjectFDtos';
import { SessionService } from 'src/app/services/session/session-service.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-unlock-account-modal',
    templateUrl: './unlock-account-modal.component.html',
    styleUrls: ['./unlock-account-modal.component.css']
})
export class UnlockAccountModalComponent implements OnInit {
    public model: IModel;

    constructor(private sessionService: SessionService,
        private router: Router) {
        this.model = <IModel>{};
    }

    ngOnInit() {
    }

    public setParameters(profile: ProfileFDto, callbackFinish: Function) {
        this.model.profile = profile;
        this.model.callbackFinish = callbackFinish;
    }

    public close() {
        this.model.callbackFinish();
    }

    public authtenticate() {
        if (!this.model.password) {
            this.model.error = "Todos los campos son obligatorios.";
            return;
        }

        let result = this.sessionService.authenticate(this.model.profile.Email, this.model.password);
        if (!result) {
            this.model.error = "Password incorrecta para éste usuario";
            return;
        }

        this.close();
        this.router.navigate(["/wall"]);
    }
}

interface IModel {
    password: string;
    callbackFinish: Function;
    profile: ProfileFDto;
    error: string;
}