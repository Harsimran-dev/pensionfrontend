import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UseradminComponent } from './useradmin/useradmin/useradmin.component';
import { RouterModule } from '@angular/router';
import { AdminRoutes } from './admin.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxLoadingModule } from 'ngx-loading';
import { ViewuserComponent } from './viewuser/viewuser/viewuser.component';
import { AddcompanyComponent } from './addcompany/addcompany/addcompany.component';
import { AdminmessageComponent } from './adminmessage/adminmessage/adminmessage.component';



@NgModule({
  declarations: [
    UseradminComponent,
    ViewuserComponent,
    AddcompanyComponent,
    AdminmessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
 
    NgxLoadingModule.forRoot({})
  ]
})
export class AdminModule { }
