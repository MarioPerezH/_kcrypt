import { Injectable, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/empty';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { SessionService } from '../session/session-service.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
    constructor(private sessionService: SessionService, private router: Router, private cookieService: CookieService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const request = this.constructHeader(req);
        // return next.handle(request);
        return next.handle(request).pipe(
            tap(evt => { }),
            catchError((error: any) => {
                if (error) {
                    let msg = "";
                    if (error.error && error.error.mensaje) {
                        msg = error.error.mensaje;
                    }
                    if (error.status === 400 || error.status === 401 || error.status === 403) {
                        const pos = error.url.indexOf("/api/login/authenticate");
                        this.sessionService.logout();

                        if (pos <= 0) {
                            // TODO: No me convence esto, quizas el error 403 hay que enviar solo una alerta......
                            this.router.navigate(["/login"]);
                        } else {
                            return next.handle(request);
                        }
                    } else if(error.status === 500) {
                        return throwError(error);
                    }else{
                        return next.handle(request);
                    }
                }
                return of(error);
            })
        );
        //   FIXME: HAY QUE ARREGLAR EL INTERCEPTOR PARA ANGULAR 8
        //   const request = this.constructHeader(req);
        // .do((event: HttpResponse<any>) => {
        //     this.startDetections(event);
        // })
        // .catch((error: HttpErrorResponse, caught) => {
        //     if (error) {
        //         let msg = '';
        //         if (error.error && error.error.mensaje) {
        //             msg = error.error.mensaje;
        //         }

        //         if (error.status === 400 || error.status === 401 || error.status === 403) {
        //             const pos = error.url.indexOf('/api/login/authenticate');
        //             this.tokenActual = null;
        //             this.sessionService.logout();

        //             if (pos <= 0) {
        //                 // TODO: No me convence esto, quizas el error 403 hay que enviar solo una alerta......
        //                 this.router.navigate(['/login']);
        //             } else {
        //                 return next.handle(request);
        //             }
        //         } else {
        //             return next.handle(request);
        //         }
        //     }
        //     return new Array();
        // });
    }

    private constructHeader(req: HttpRequest<any>): HttpRequest<any> {
        const session = this.sessionService.getSession();
        const token = (!!session ? session.token : null);
        
        if (token) {
            const headers = req.headers.set('Authorization', 'Bearer ' + token);
            const newHeader = req.clone({ headers, withCredentials : environment.production });
            return newHeader;
        } else {
            return req;
        }

    }

    private startDetections(event: HttpResponse<any>) {
        this.detectToken(event);
        this.detectHeader(event);
    }

    private detectToken(event: HttpResponse<any>) {
        if (event.body) {

        }
    }

    private detectHeader(event: HttpResponse<any>) {
        if (event.body) {

        }
    }


}
