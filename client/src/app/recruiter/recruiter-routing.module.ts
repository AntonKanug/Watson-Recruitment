import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationComponent } from './application/application.component';
import { JobComponent } from './job/job.component';
import { ApplicantComponent } from './applicant/applicant.component';


const routes: Routes = [
  { path: '', component: ApplicationComponent },
  { path: ':id', component: JobComponent },
  { path: ':id/:appID', component: ApplicantComponent },

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RecruiterRoutingModule { }
