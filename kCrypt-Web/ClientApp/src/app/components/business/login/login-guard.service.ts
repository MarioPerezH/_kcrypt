import { Injectable } from "@angular/core";
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable, from } from "rxjs";
import { SessionService } from "src/app/services/session/session-service.service";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root"
})
// export class LoginGuardService implements CanActivate, CanActivateChild {
export class LoginGuardService implements CanActivate {
    constructor(private router: Router, private session: SessionService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // if (!this.session.getGuid()) {
        //     environment.callbackRedirectLogOut(()=> this.router, environment.LOGOUT_URL);
        // } else if (!this.session.sessionExist() && !!this.session.getGuid()) {
        //     this.router.navigate(["/perfilando/" + this.session.getGuid()]);
        //     return false;
        // } else {
        //     return true;
        // }
        return null;
    }

    // canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //   //TODO: aca falta sin el token no es valido, mandarlo al login....O TAL VEZ ESTO DEBE HACERSE EN EL INTERCEPTOR....
    //   if (!this.session.sessionExist()) {
    //     this.router.navigate(["/login"]);
    //     return false;
    //   } else {
    //     return this.sistemaServiceProxy.validarPermisoPantalla(
    //       next.routeConfig.path
    //     );
    //   }
    // }

}
