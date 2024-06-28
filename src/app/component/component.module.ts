import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import {NgxPrintModule} from 'ngx-print';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { PersonaldetailsComponent } from './personaldetails/personaldetails/personaldetails.component';
import { JobComponent } from './job/job/job.component';
import { ContributionComponent } from './contribution/contribution/contribution.component';
import { PensionpotComponent } from './pensionpot/pensionpot/pensionpot.component';
import { DefinedContributionComponent } from './DefinedContribution/defined-contribution/defined-contribution.component';
import { MegasavingComponent } from './DefinedContribution/defined-contribution/megasaving/megasaving/megasaving.component';
import { MyinvestmentComponent } from './myinvestment/myinvestment/myinvestment.component';
import { NgxLoadingModule } from "ngx-loading";
import { DreamfundComponent } from './DefinedContribution/defined-contribution/dreamfund/dreamfund/dreamfund.component';
import { DefinedbenifitComponent } from './definedbenifit/definedbenifit/definedbenifit.component';
import { ComplianceComponent } from './compliance/compliance/compliance.component';
import { HowtoinvestComponent } from './howtoinvest/howtoinvest/howtoinvest.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { HelpComponent } from './help/help/help.component';















@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgImageSliderModule,
    NgxPrintModule,
  

    NgApexchartsModule,
    NgxLoadingModule.forRoot({})

  
  ],
  declarations: [

  

  
    PersonaldetailsComponent,
            JobComponent,
            ContributionComponent,
            PensionpotComponent,
            DefinedContributionComponent,
            MegasavingComponent,
            MyinvestmentComponent,
            DreamfundComponent,
            DefinedbenifitComponent,
            ComplianceComponent,
            HowtoinvestComponent,
            HelpComponent,

        
       
         
     
       
    
  ],
})
export class ComponentsModule { }
