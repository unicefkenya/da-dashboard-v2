import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { DashboardV2Component } from "./dashboard-v2.component";
import { ChartModule } from '@sisitech/charts';
import { environment } from 'src/environments/environment'

const authConfig = {
    APIEndpoint: environment.APIEndpointNoSlash,
    version: "api/v1",
    clientId: environment.APIClientID,
}

const Dashboardv2Routes: Routes = [
    {
        path: '',
        component: DashboardV2Component
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(Dashboardv2Routes),
        SharedModule,
        ChartModule
    ],
    declarations: [
        DashboardV2Component
    ], providers: [
        { provide: 'config', useValue: authConfig || {} }
    ],
})
export class DashboardV2Module { }