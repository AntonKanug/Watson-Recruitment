import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterviewComponent } from './interview/interview.component';


const routes: Routes = [
    { path: ':id', component: InterviewComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApplicantRoutingModule { }
