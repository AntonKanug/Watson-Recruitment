import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataApiService } from '../../data-api.service';

@Component({
  selector: 'app-job',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  id: String;
  application = null;
  applicants  = null;
  loading = true;
  constructor(private route: ActivatedRoute, private dataService: DataApiService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getApplication(this.id);
    this.getApplicants(this.id);
  }

  getApplication(id) {
    this.dataService.getApplicationByID(id).subscribe((data) => {
      this.application = data;
      this.loading = false;

      console.log(this.application);
    }, (error) => {
      console.log(error);
    });
  }

  getApplicants(id) {
    this.dataService.getApplicantsByAppID(id).subscribe((data) => {
      this.applicants = data;
      console.log(this.applicants);
    }, (error) => {
      console.log(error);
    });
  }

}
