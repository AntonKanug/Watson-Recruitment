import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruiterRoutingModule } from './recruiter-routing.module';
import { ApplicationComponent } from './application/application.component';

import {
  AccordionModule,
  SelectModule,
  DialogModule,
  GridModule,
  CheckboxModule,
  ButtonModule,
  PlaceholderModule,
  ModalModule,
  TilesModule,
  TagModule,
  NotificationModule,
  LoadingModule,
  InlineLoadingModule,
  CodeSnippetModule,
  TableModule,
  InputModule,
  RadioModule,
  BreadcrumbModule,
  DatePickerModule,
  TimePickerModule
} from 'carbon-components-angular';


import {
  MicrophoneFilledModule,
  MicrophoneModule
} from '@carbon/icons-angular';

import { ChartsModule } from '@carbon/charts-angular';

import { JobComponent } from './job/job.component';
import { ApplicantComponent } from './applicant/applicant.component';

@NgModule({
	declarations: [ApplicationComponent, JobComponent, ApplicantComponent],
  imports: [
    CommonModule,
    RecruiterRoutingModule,
    AccordionModule,
    SelectModule,
    DialogModule,
    GridModule,
    CheckboxModule,
    ButtonModule,
    PlaceholderModule,
    ModalModule,
    TilesModule,
    TagModule,
    NotificationModule,
    LoadingModule,
    InlineLoadingModule,
    CodeSnippetModule,
    TableModule,
    InputModule,
    RadioModule,
    MicrophoneFilledModule,
    MicrophoneModule,
    BreadcrumbModule,
    ChartsModule,
    DatePickerModule,
    TimePickerModule
    ]
})
export class RecruiterModule { }
