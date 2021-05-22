import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataApiService } from 'src/app/data-api.service';
import '@carbon/charts/styles.css';

@Component({
  selector: 'app-applicant',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.scss']
})
export class ApplicantComponent implements OnInit {
  id;
  appID;
  loading = true;
  application;
  applicant;
  open = true;
  dateRange = null;
  time = null;
  date = null;

  times = [];


  constructor(private route: ActivatedRoute, private dataService: DataApiService) { }



  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.appID = this.route.snapshot.paramMap.get('appID');
    this.getApplication(this.id);
    this.getApplicant(this.appID);
  }


  updateRange(event) {
    this.date = event[0].toString().slice(0, 15);
  }



  addSlot() {
    this.times.push({ date: this.date, time: this.time });
  }


	/**
	 * Get application by id
	 */
  getApplication(id) {
    this.dataService.getApplicationByID(id).subscribe((data) => {
      this.application = data;
      this.loading = false;
      console.log(this.application);
    }, (error) => {
      console.log(error);
    });
  }



  /**
	 * Get applications answers by id
	 */
  getApplicant(appID) {
    this.dataService.getApplicantByID(appID).subscribe((data) => {
      this.applicant = data;
      console.log(this.applicant);
    }, (error) => {
      console.log(error);
    });
  }
}
