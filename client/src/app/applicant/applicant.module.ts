import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicantRoutingModule } from './applicant-routing.module';
import { InterviewComponent } from './interview/interview.component';

import {
  AccordionModule,
  SelectModule,
  DialogModule,
  GridModule,
  CheckboxModule,
  ButtonModule,
  PlaceholderModule,
  ModalModule,
  TagModule,
  NotificationModule,
  LoadingModule,
  InlineLoadingModule,
  CodeSnippetModule,
  InputModule,
  RadioModule,
  SkeletonModule,
} from 'carbon-components-angular';


import {
  MicrophoneFilledModule,
  MicrophoneModule,
  SendAltModule
} from '@carbon/icons-angular';


@NgModule({
  declarations: [InterviewComponent],
  imports: [
	CommonModule,
	ApplicantRoutingModule,
	AccordionModule,
	SelectModule,
	DialogModule,
	GridModule,
	CheckboxModule,
	ButtonModule,
	PlaceholderModule,
	ModalModule,
	TagModule,
	NotificationModule,
	LoadingModule,
	InlineLoadingModule,
	CodeSnippetModule,
	InputModule,
	RadioModule,
	MicrophoneFilledModule,
  MicrophoneModule,
  SkeletonModule,
  SendAltModule
  ]
})
export class ApplicantModule { }
