import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuardService } from './components/business/login/login-guard.service';
import { HomeLayoutComponent } from './components/base/layout/home-layout.component';
import { LoginLayoutComponent } from './components/base/layout/login-layout.component';
import { LoginComponent } from './components/business/login/login.component';
import { NotFoundComponent } from './components/business/otros/not-found/not-found.component';
import { WallComponent } from './components/business/wall/wall.component';
import { SubgroupformatsComponent } from './components/business/group/subgroupformats/subgroupformats.component';

export const routes: Routes = [
    {
        path: '',
        // canActivate: [LoginGuardService],
        // canActivateChild: [LoginGuard],
        component: HomeLayoutComponent,
        data: {
            title: 'Sistema Notificaciones'
        },
        children: [
            { path: '', redirectTo: 'wall', pathMatch: 'full' },
            { path: '404', component: NotFoundComponent },
            { path: 'wall', component: WallComponent },
            { path: 'formats', component: SubgroupformatsComponent }
        ]
    },
    {
        path: '',
        component: LoginLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: '**', component: LoginComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(<Routes>routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }

export interface IBreadcrumbs {
    name: string;
    pathRoute: string;
}

export interface IRoute {
    path: string;
    description?: string;
    component?: any;
    data?: IBreadcrumbs[];
    redirectTo?: string;
    pathMatch?: string;
}