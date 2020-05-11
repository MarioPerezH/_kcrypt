import { Injectable } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { SecurityServiceProxy, ReportPBIXFDto, ReportFDto } from '../proxy/proxy.service';
import { SessionDTO, ConfigurationFDto, GroupFDto, ProfileFDto, _kCrypt, RegisterProfileFDto, ConfigurationsEncryptedFDto } from '../Common/ObjectFDtos';
import { Router } from '@angular/router';
import { CipherService } from '../cipher/cipher.service';
import { UtilsService } from '../Common/utils.service';
import { CounterdownService } from '../counter/counterdown.service';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    public storageSession: string = "_kcrypt-session";
    public storage: string = "_kcrypt";

    constructor(private router: Router,
        private cipherService: CipherService,
        private utilService: UtilsService,
        private counterdownService: CounterdownService) {

    }

    public sessionExist(): boolean {
        const session = this.getSession();

        if (session != null
            && session.token != null
            && session.id != null
            && session.roles != null
            && session.name != null) {
            return true;
        } else {
            return false;
        }
    }

    public getDB() {
        let db = <_kCrypt>JSON.parse(this.getPersistanceMode().getItem(this.storage)) || <_kCrypt>{};

        if (!db.Profiles) {
            db.Profiles = [];
        }

        if (!db.ConfigurationsEncrypted) {
            db.ConfigurationsEncrypted = [];
        }

        return db;
    }

    public registerProfile(profile: RegisterProfileFDto) {
        let db = this.getDB();

        if (!!db.Profiles.find(p => p.Email === profile.Email)) return false;

        this.cipherService.setPassword(profile.Password);

        let idProfile = this.utilService.generateGuid(),
            newProfile = <ProfileFDto>{
                Id: idProfile,
                Email: profile.Email,
                PasswordEncrypted: this.cipherService.encrypt(profile.Password),
            },
            configuration = this.getNewConfigurationBase(idProfile),
            configurationJson = JSON.stringify(configuration),
            configurationEncrypt = <ConfigurationsEncryptedFDto>{
                IdProfile: idProfile,
                ConfigurationsEncrypted: this.cipherService.encrypt(configurationJson)
            };

        db.Profiles.push(newProfile);
        db.ConfigurationsEncrypted.push(configurationEncrypt);

        this.saveDB(db);

        return newProfile;
    }

    public saveDB(db: _kCrypt) {
        let jsonDB = JSON.stringify(db);

        this.getPersistanceMode().setItem(this.storage, jsonDB);
    }

    public existsProfile(username: string) {
        let db = this.getDB(),
            profile = db.Profiles.find(p => p.Email === username);

        return !!profile;
    }

    public getProfile(username: string, password: string) {
        let db = this.getDB();

        this.cipherService.setPassword(password);

        let profile = db.Profiles.find(p => {
            if (p.Email !== username) return false;

            let passwordDecrypt = this.cipherService.decrypt(p.PasswordEncrypted);
            if (!passwordDecrypt || passwordDecrypt !== password) return false;

            return true;
        });

        return profile;
    }

    public getSession(): SessionDTO {
        const session = <SessionDTO>JSON.parse(this.getPersistanceMode().getItem(this.storageSession));
        return session;
    }

    public setProfileCurrentSession(idProfile: number | string, password: string) {

        let db = this.getDB(),
            configurationEncrypt = db.ConfigurationsEncrypted.find(c => c.IdProfile === idProfile);

        if (!configurationEncrypt) return false;

        let configurationTemp = this.cipherService.decrypt(configurationEncrypt.ConfigurationsEncrypted);

        if (!configurationTemp) return false;

        let configuration = JSON.parse(configurationTemp);
        this.setSession(configuration);

        db.LastProfleConnect = idProfile;
        this.saveDB(db);

        this.counterdownService.clear();

        return true;
    }

    public getGuid() {
        return localStorage.getItem("guid");
    }

    public logout(): void {
        this.cipherService.clearPassword();
        this.clearSession();
        this.router.navigate(["/login"]);
    }

    public setSession(session: SessionDTO | ConfigurationFDto): void {
        let sessionJSON = JSON.stringify(session);

        this.getPersistanceMode().setItem(this.storageSession, sessionJSON);
        this.updateSessionToDB(session);
        this.counterdownService.reset();
    }

    public clearSession() {
        this.getPersistanceMode().setItem(this.storageSession, null);
    }

    public updateSessionToDB(session: SessionDTO | ConfigurationFDto) {
        let db = this.getDB(),
            configurationEncrypt = db.ConfigurationsEncrypted.find(c => c.IdProfile === session.IdProfile),
            configurationJSON = JSON.stringify(session);

        configurationEncrypt.ConfigurationsEncrypted = this.cipherService.encrypt(configurationJSON);
        this.saveDB(db);
    }

    public getNombreUsuario(): string {
        let db = this.getDB(),
            profile = db.Profiles.find(p => p.Id === db.LastProfleConnect);

        return profile.Email;
    }

    public getPersistanceMode() {
        return localStorage;
    }

    public getNewConfigurationBase(idProfile: number | string) {
        let configuration = <ConfigurationFDto>{};

        configuration.Id = this.utilService.generateGuid();
        configuration.IdProfile = idProfile;
        configuration.Groups = [];
        configuration.SubGroups = [];
        configuration.ActiveSessionDurationSeconds = 300;

        configuration.SubGroupFormats = [{
            Id: this.utilService.generateGuid(),
            Name: 'Credenciales Web',
            Fields: [{
                Id: this.utilService.generateGuid(),
                Name: 'Usuario',
                IsEncrypted: false,
                IsPassword: false
            }, {
                Id: this.utilService.generateGuid(),
                Name: 'Password',
                IsEncrypted: true,
                IsPassword: true
            }, {
                Id: this.utilService.generateGuid(),
                Name: 'Url Autentiacción',
                IsEncrypted: false,
                IsPassword: false
            }]
        }, {
            Id: this.utilService.generateGuid(),
            Name: 'Credenciales VPN',
            Fields: [{
                Id: this.utilService.generateGuid(),
                Name: 'Usuario',
                IsEncrypted: false,
                IsPassword: false
            }, {
                Id: this.utilService.generateGuid(),
                Name: 'Password',
                IsEncrypted: true,
                IsPassword: true
            }, {
                Id: this.utilService.generateGuid(),
                Name: 'IP Gateway',
                IsEncrypted: true,
                IsPassword: false
            }, {
                Id: this.utilService.generateGuid(),
                Name: 'Puerto',
                IsEncrypted: false,
                IsPassword: false
            }]
        }];

        return configuration;
    }

    public getLastProfileConnected() {
        let db = this.getDB(),
            idProfile = db.LastProfleConnect || 0,
            profile = db.Profiles.find(p => p.Id === idProfile);

        return profile;
    }

    public authenticate(username: string, password: string) {
        let profile = this.getProfile(username, password);
        if (!profile) return false;

        let result = this.setProfileCurrentSession(profile.Id, password);
        if (!result) return false;

        return true;
    }
}