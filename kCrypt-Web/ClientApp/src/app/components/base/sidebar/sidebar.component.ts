import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session/session-service.service';
import { Router } from '@angular/router';
import { ReportPBIXFDto } from 'src/app/services/proxy/proxy.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    constructor(private router: Router,
        public sessionService: SessionService) { }

    ngOnInit() {
        
    }

    public obtenerUrlLogo() {
        return this.sessionService.getSession().urllogo;
    }

    public isSelected(routerLink: string){
        return routerLink ===  this.router.url;
    }
}