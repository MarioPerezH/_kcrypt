import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/Common/utils.service';
import { SessionService } from 'src/app/services/session/session-service.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register-account-modal',
    templateUrl: './register-account-modal.component.html',
    styleUrls: ['./register-account-modal.component.css']
})
export class RegisterAccountModalComponent implements OnInit {
    public model: IModel;
    constructor(private utilService: UtilsService,
        private sessionService: SessionService,
        private router: Router) {

        this.model = <IModel>{
            generateCipherPassword: false,
            account: <IAccount>{}
        };
    }

    ngOnInit() {
    }

    public registerAccount() {
        if (this.model.account.Password !== this.model.account.RepeatPassword){
            this.model.error = "Las password ingresadas no coinciden.";
            return;
        }

        if(this.sessionService.existsProfile(this.model.account.Email)){
            this.model.error = "El usuario ya se encuentra registrado.";
            return;
        }

        let profile = this.sessionService.registerProfile({
            Email: this.model.account.Email,
            Password: this.model.account.Password,
            RepeatPassword: this.model.account.RepeatPassword,
            PrivateKeyPassword: this.model.account.PasswordCipher
        });

        if (!profile){
            this.model.error = "No fue posible crear el perfil. Comuniquese con el administrador.";
            return;
        }


        let result = this.sessionService.setProfileCurrentSession(profile.Id, this.model.account.Password);
        if (!result) {
            this.model.error = "No fue posible establecer la sesión de usuario. Comuniquese con el administrador.";
            return;
        }

        this.model.callbackFinish();
            this.router.navigate(["/wall"]);
    }

    public isValidForm() {
        if (!this.model.account.Email ||
            !this.model.account.Password ||
            !this.model.account.PasswordCipher ||
            !this.model.account.RepeatPassword)
            return false;

        return true;
    }

    public setParameters(callbackFinish: Function) {
        this.model.callbackFinish = callbackFinish;
    }

    public generateCipherPassword() {
        this.model.account.PasswordCipher =
            this.model.generateCipherPassword ?
                this.utilService.generatePassword(256) : '';
    }

    public close() {
        this.model.callbackFinish();
    }

    // public showRegisterState() {
    //     return this.model.registerState !== undefined;
    // }
}

interface IModel {
    generateCipherPassword: boolean;
    account: IAccount;
    callbackFinish: Function;
    //registerState: boolean;
    error: string;
}

interface IAccount {
    Email: string;
    Password: string;
    RepeatPassword: string;
    PasswordCipher: string;
}