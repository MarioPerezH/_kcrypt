import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeCl from '@angular/common/locales/es-CL';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { API_BASE_URL } from 'src/app/services/proxy/proxy.service';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { CookieService } from 'ngx-cookie-service';

import { NavbarComponent } from './components/base/navbar/navbar.component';
import { SidebarComponent } from './components/base/sidebar/sidebar.component';
import { HeaderComponent } from './components/base/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './components/base/footer/footer.component';
import { NavbarTooltipMessagesComponent } from './components/common/navbar-tooltip-messages/navbar-tooltip-messages.component';
import { NavbarTooltipUsersonlineComponent } from './components/common/navbar-tooltip-usersonline/navbar-tooltip-usersonline.component';
import { NavbarTooltipUseroptionsComponent } from './components/common/navbar-tooltip-useroptions/navbar-tooltip-useroptions.component';
import { NavbarTooltipUpdatesComponent } from './components/common/navbar-tooltip-updates/navbar-tooltip-updates.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoadingPanelDirective } from './directives/wrappers/loading-panel/loading-panel.directive';
import { DatatableDirective } from './directives/wrappers/datatable/datatable.directive';
import { LoadingPanelWaitDirective } from './directives/wrappers/loading-panel/loading-panel-wait.directive';
import { SelectBasicDirective } from './directives/wrappers/select/select-basic.directive';
import { LoginComponent } from './components/business/login/login.component';
import { LoginLayoutComponent } from './components/base/layout/login-layout.component';
import { HomeLayoutComponent } from './components/base/layout/home-layout.component';

// Servicios
import { SessionService } from './services/session/session-service.service';
import { ModalService } from './services/modal/modal.service';
import { InterceptorService } from './services/interceptor/interceptor.service';
import { NotificationService } from './services/notification/notification.service';
import { DropzoneDirective } from './directives/wrappers/fileuploaders/dropzone.directive';
import { FileuploaderService } from './services/fileuploaders/fileuploader.service';
import { NotFoundComponent } from './components/business/otros/not-found/not-found.component';
import { WallComponent } from './components/business/wall/wall.component';
import { GroupModalComponent } from './components/business/group/group-modal/group-modal.component';
import { SubgroupModalComponent } from './components/business/group/subgroup-modal/subgroup-modal.component';
import { SubgroupformatsComponent } from './components/business/group/subgroupformats/subgroupformats.component';
import { CipherService } from './services/cipher/cipher.service';
import { SubgroupformatsModalComponent } from './components/business/group/subgroupformats-modal/subgroupformats-modal.component';
import { NavbarTooltipCountdowntimerComponent } from './components/common/navbar-tooltip-countdowntimer/navbar-tooltip-countdowntimer.component';
import { RegisterAccountModalComponent } from './components/business/account/register-account-modal/register-account-modal.component';
import { UnlockAccountModalComponent } from './components/business/account/unlock-account-modal/unlock-account-modal.component';
import { CounterdownService } from './services/counter/counterdown.service';

registerLocaleData(localeCl, 'es-CL');

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        SidebarComponent,
        HeaderComponent,
        FooterComponent,
        NavbarTooltipMessagesComponent,
        NavbarTooltipUsersonlineComponent,
        NavbarTooltipUseroptionsComponent,
        NavbarTooltipUpdatesComponent,
        DatatableDirective,
        LoadingPanelDirective,
        LoadingPanelWaitDirective,
        SelectBasicDirective,
        LoginComponent,
        LoginLayoutComponent,
        HomeLayoutComponent,
        DropzoneDirective,
        NotFoundComponent,
        WallComponent,
        GroupModalComponent,
        SubgroupModalComponent,
        SubgroupformatsComponent,
        SubgroupformatsModalComponent,
        NavbarTooltipCountdowntimerComponent,
        RegisterAccountModalComponent,
        UnlockAccountModalComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        FilterPipeModule
    ],
    providers: [
        ModalService,
        SessionService,
        { provide: API_BASE_URL, useValue: environment.API_BASE_URL },
        { provide: LOCALE_ID, useValue: 'es-CL' },
        { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
        NotificationService,
        FileuploaderService,
        CookieService,
        CipherService,
        CounterdownService
    ],
    entryComponents:[
        GroupModalComponent,
        SubgroupModalComponent,
        SubgroupformatsModalComponent,
        RegisterAccountModalComponent,
        UnlockAccountModalComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
