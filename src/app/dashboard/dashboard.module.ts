import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { NgApexchartsModule } from "ng-apexcharts";
import { DashboardComponent } from "./dashboard.component";
import { PensiondashboardComponent } from './pensiondashboard/pensiondashboard/pensiondashboard.component';
import { InvestmentdashboardComponent } from './investmentdashboard/investmentdashboard/investmentdashboard.component';
import { ContributiondashboardComponent } from './contributiondashboard/contributiondashboard/contributiondashboard.component';
import { NocontributionComponent } from './nocontribution/nocontribution/nocontribution.component';






const routes: Routes = [
  {
    path: "",
    data: {
      title: "Dashboard",
      urls: [{ title: "Dashboard", url: "/dashboard" }, { title: "Dashboard" }],
    },
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgApexchartsModule,
  ],
  declarations: [
    DashboardComponent,
    PensiondashboardComponent,
    InvestmentdashboardComponent,
    ContributiondashboardComponent,
    NocontributionComponent,
 
 
  ],
})
export class DashboardModule {}
