import { Routes } from '@angular/router';
import { UseradminComponent } from './useradmin/useradmin/useradmin.component';
import { ViewuserComponent } from './viewuser/viewuser/viewuser.component';
import { AddcompanyComponent } from './addcompany/addcompany/addcompany.component';
import { AdminmessageComponent } from './adminmessage/adminmessage/adminmessage.component';


export const AdminRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'useradmin',
				component: UseradminComponent
			},
			{
				path: 'viewuser/:id',
				component: ViewuserComponent
			  },
			  {
				path: 'addcompany',
				component: AddcompanyComponent
			  },
			  {
				path: 'messageuser/:id',
				component: AdminmessageComponent
			  }
			  
			  
		]
	}
];
