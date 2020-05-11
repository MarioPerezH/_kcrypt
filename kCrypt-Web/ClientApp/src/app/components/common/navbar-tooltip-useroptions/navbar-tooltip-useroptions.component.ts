import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session/session-service.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-navbar-tooltip-useroptions',
    templateUrl: './navbar-tooltip-useroptions.component.html',
    styleUrls: ['./navbar-tooltip-useroptions.component.css']
})
export class NavbarTooltipUseroptionsComponent implements OnInit {

    constructor(private router: Router,
        public session: SessionService) { }

    ngOnInit() {
    }

    public logout() {
        this.session.logout();
    }
    
    public obtenerNombreUsuario(){
        return this.session.getNombreUsuario();
    }
}
