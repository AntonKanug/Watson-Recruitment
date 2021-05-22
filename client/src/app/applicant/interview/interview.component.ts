import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { DataApiService } from '../../data-api.service';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { Applicant } from 'src/app/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-interview',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {
  record;
  url;
  error;
  stream: any;
  token: string;
  recording = false;
  disableButton = true;
  step = 1;
  entered = false;
  currentQuestion = 0;
  questions = [];
  applicant = new Applicant();
  applicationID = null;
  jobTitle = null;
  loading = false;
  submit = false;
  usingVoice = true;
  interviewTextbox: string = null;

  constructor(
    private domSanitizer: DomSanitizer,
    private dataService: DataApiService,
    private route: ActivatedRoute) { }


  ngOnInit() {
    this.applicationID = this.route.snapshot.paramMap.get('id');
    this.getQuestions(this.applicationID);
  }

  enterMessage() {
    if (this.interviewTextbox) {
      this.applicant.interviewAnswers.push(this.interviewTextbox);
      this.interviewTextbox = null;
      this.currentQuestion += 1;

      if (this.currentQuestion === (this.questions.length)) {
        this.disableButton = true;
        this.questions.push('Thank you for your answers. Click \'Next\' to go to the next step of the application.');
        this.playThanks();
      } else {
        this.playNextQuestion();
      }
    } else {
      this.questions.splice(this.currentQuestion, 0, 'Sorry, I do not understand. Please speak loud and clear!');
      this.questions.join();
      this.playCantHear();
    }
  }

  getQuestions(id) {
    this.dataService.getApplicationByID(id).subscribe((data) => {
      this.questions = data.questions;
      this.jobTitle = data.title;
    }, (error) => {
      console.log(error);
    });
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

	/**
   * Start recording.
   */
  initiateRecording() {
    this.recording = true;
    const mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }


	/**
   * Will be called automatically.
   */
  successCallback(stream) {
    const options = {
      mimeType: 'audio/wav',
      numberOfAudioChannels: 1
    };

    // Start Actually Recording
    const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }


  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
    this.url = null;
  }


  processRecording(blob) {
    this.url = URL.createObjectURL(blob);
    this.loading = true;
    this.dataService.watsonSTT(blob).subscribe(data => {
      this.loading = false;
      let text = '';
      data.results?.forEach(result => {
        console.log(result);

        text = text.concat(result.alternatives[0].transcript);
      });
      this.currentQuestion += 1;

      if (this.step === 5) {
        this.applicant.techAnswer = text;
      } else {
        this.applicant.interviewAnswers.push(text);
        if (this.currentQuestion === (this.questions.length)) {
          this.disableButton = true;
          this.questions.push('Thank you for your answers. Click \'Next\' to go to the next step of the application.');
          this.playThanks();
        }
        if (text.length) {
          this.playNextQuestion();
        } else {
          this.questions.splice(this.currentQuestion, 0, 'Sorry, I do not understand. Please speak loud and clear!');
          this.questions.join();
          this.playCantHear();
        }
      }

    });
  }

  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }

  playNextQuestion() {
    const audio = new Audio(`http://localhost:8080/api/audio/${this.applicationID}/${this.currentQuestion}`);
    audio.play();
  }

  playCantHear() {
    const audio = new Audio('http://localhost:8080/api/audio/1/cantHear');
    audio.play();
  }

  playThanks() {
    const audio = new Audio('http://localhost:8080/api/audio/1/thanks');
    audio.play();
  }


  back() {
    this.step -= 1;
  }

  next() {
    this.step += 1;
    if (this.step === 3) {
      this.playNextQuestion();
      this.disableButton = false;
    }
    if (this.step === 4) {
      this.initiateRecording();
    }
    if (this.step === 5) {
      this.stopRecording();
    }
  }

  /**
 * Accept the selected user requests
 */
  onSubmit() {
    this.applicant.applicationID = this.applicationID;
    this.dataService.addApplicant(this.applicant).subscribe((data) => {
      this.submit = true;
      setTimeout(() => this.submit = false, 8000);
    }, (error) => {
      console.log(error);
    });
  }
}
