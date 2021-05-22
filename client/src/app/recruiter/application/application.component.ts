import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataApiService } from '../../data-api.service';
import { Application } from 'src/app/models';

import {
  ModalService,
  AlertModalType,
  ModalButtonType
} from 'carbon-components-angular';

@Component({
  selector: 'app-application',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  openModal = false;
  application: Application = new Application();
  activeApplications = [];
  applicationID = null;
  submit = false;
  keyword;
  question;



  constructor(protected modalService: ModalService,
    private dataAPI: DataApiService) { }



  ngOnInit(): void {
    this.getApplications();
  }



  getApplications() {
    this.dataAPI.getApplications().subscribe((data) => {
      this.activeApplications = data;
    }, (error) => {
      console.log(error);
    });
  }


  
	/**
	 * Accept the selected user requests
	 */
  onSubmit() {
    console.log(this.application);

    this.dataAPI.addAppliaction(this.application).subscribe((data) => {
      this.openModal = false;
      this.application = new Application();
      this.getApplications();
      this.applicationID = data._id;
      this.submit = true;

      setTimeout(() => this.submit = false, 8000);
    }, (error) => {
      console.log(error);
    });
  }


}
