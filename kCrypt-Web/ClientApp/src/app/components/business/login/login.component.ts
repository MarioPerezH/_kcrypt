import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "src/app/services/session/session-service.service";
import { ModalService } from 'src/app/services/modal/modal.service';
import { RegisterAccountModalComponent } from '../account/register-account-modal/register-account-modal.component';
import { UnlockAccountModalComponent } from '../account/unlock-account-modal/unlock-account-modal.component';
import { ProfileFDto } from 'src/app/services/Common/ObjectFDtos';

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {

    public model: IModel;

    constructor(private router: Router,
        private modalService: ModalService,
        private sessionService: SessionService) {

        this.model = <IModel>{};
    }

    ngOnInit() {
        let profile = this.sessionService.getLastProfileConnected();
        if (!!profile) {
            this.unLockAccountModal(profile);
            return;
        }

        this.model.showLogin = true;
    }

    public authenticate() {
        if (!this.model.email || !this.model.password) {
            this.model.error = "Todos los campos son obligatorios";
            return;
        }

        let result = this.sessionService.authenticate(this.model.email, this.model.password);
        if (!result) {
            this.model.password = "";
            this.model.error = "Usuario y/o password no son válidos.";
            return;
        }

        this.router.navigate(["/wall"]);
    }

    public registerNewAccountModal() {
        this.model.showLogin = false;
        this.modalService.open(RegisterAccountModalComponent, (instance) => {
            instance.setParameters(() => {
                this.model.showLogin = true;
                this.modalService.close();
            });
        });
    }

    public unLockAccountModal(profile: ProfileFDto) {
        this.model.showLogin = false;
        this.modalService.open(UnlockAccountModalComponent, (instance) => {
            instance.setParameters(profile, () => {
                this.model.showLogin = true;
                this.modalService.close()
            });
        });
    }
}

interface IModel {
    email: string;
    password: string;
    error: string;
    cargando: boolean;
    showLogin: boolean;
}