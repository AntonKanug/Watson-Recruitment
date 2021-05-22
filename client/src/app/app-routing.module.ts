import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{
		path: 'applicant',
		loadChildren: () => import('./applicant/applicant.module').then(m => m.ApplicantModule),
  },
  {
		path: 'applications',
		loadChildren: () => import('./recruiter/recruiter.module').then(m => m.RecruiterModule),
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
