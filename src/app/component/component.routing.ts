import { Routes } from '@angular/router';
import { PersonaldetailsComponent } from './personaldetails/personaldetails/personaldetails.component';
import { JobComponent } from './job/job/job.component';
import { ContributionComponent } from './contribution/contribution/contribution.component';
import { PensionpotComponent } from './pensionpot/pensionpot/pensionpot.component';
import { DefinedContributionComponent } from './DefinedContribution/defined-contribution/defined-contribution.component';
import { MegasavingComponent } from './DefinedContribution/defined-contribution/megasaving/megasaving/megasaving.component';
import { MyinvestmentComponent } from './myinvestment/myinvestment/myinvestment.component';
import { DreamfundComponent } from './DefinedContribution/defined-contribution/dreamfund/dreamfund/dreamfund.component';
import { DefinedbenifitComponent } from './definedbenifit/definedbenifit/definedbenifit.component';
import { ComplianceComponent } from './compliance/compliance/compliance.component';
import { HowtoinvestComponent } from './howtoinvest/howtoinvest/howtoinvest.component';
import { HelpComponent } from './help/help/help.component';

export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'personal-details',
				component: PersonaldetailsComponent
			},
			{
				path: 'job',
				component: JobComponent
			},
			{
				path: 'contribution',
				component: ContributionComponent
			},
			{
				path: 'pension-pot',
				component: PensionpotComponent
			},
			{
				path: 'defined-contribution',
				component: DefinedContributionComponent
			},
			{
				path: 'megasaving',
				component: MegasavingComponent
			},
			{
				path: 'my-investment',
				component: MyinvestmentComponent
			},
			{
				path: 'dreamfund',
				component: DreamfundComponent
			},
			{
				path: 'definedbenifit',
				component: DefinedbenifitComponent
			},
			{
				path: 'compliance',
				component: ComplianceComponent
			},
			{
				path: 'Howtoinvest',
				component: HowtoinvestComponent
			},
			{
				path: 'help',
				component: HelpComponent
			}
		]
	}
];
