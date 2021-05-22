import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
		ButtonModule,
		UIShellModule,
		LoadingModule,
		NotificationModule,
    GridModule,
    InputModule
} from 'carbon-components-angular';

@NgModule({
		declarations: [
				AppComponent
		],
		imports: [
				BrowserModule,
				AppRoutingModule,
				HttpClientModule,
				ButtonModule,
				UIShellModule,
				LoadingModule,
				NotificationModule,
        GridModule,
        InputModule
		],
		providers: [],
		bootstrap: [AppComponent]
})
export class AppModule { }
