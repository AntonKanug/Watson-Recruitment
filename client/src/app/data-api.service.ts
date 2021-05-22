import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class DataApiService {
	constructor(private http: HttpClient) { }

	/**
   * GET TTS
   */
	watsonTTS(text: string): Observable<any> {
		return this.http.get<any>
			(`http://localhost:8080/api/watson/tts?text=${text}.`).pipe(
				catchError(async (error) => console.log(error))
			);
	}

	getToken(): Observable<any> {
		return this.http.get<any>
			(`http://localhost:8080/api/speech-to-text/token`).pipe(
				catchError(async (error) => console.log(error))
			);
	}

	watsonSTT(blob): Observable<any> {
		const fd = new FormData();
		fd.append('blobData', blob);
		return this.http.put<any>(`http://localhost:8080/api/watson/stt`, fd)
			.pipe(
				catchError(async (error) => console.log(error))
			);
  }

  addAppliaction(application): Observable<any> {
		return this.http.put<any>(`http://localhost:8080/api/application/add`, application, httpOptions).pipe(
				catchError(async (error) => console.log(error))
			);
  }

  addApplicant(applicant): Observable<any> {
		return this.http.put<any>(`http://localhost:8080/api/applicant/add`, applicant, httpOptions).pipe(
				catchError(async (error) => console.log(error))
			);
  }

	getApplications(): Observable<any> {
		return this.http.get<any>
			(`http://localhost:8080/api/applications`).pipe(
				catchError(async (error) => console.log(error))
			);
  }

  getApplicationByID(id): Observable<any> {
		return this.http.get<any>
			(`http://localhost:8080/api/applications/${id}`).pipe(
				catchError(async (error) => console.log(error))
			);
  }

  getApplicantsByAppID(id): Observable<any> {
		return this.http.get<any>
			(`http://localhost:8080/api/applicants/${id}`).pipe(
				catchError(async (error) => console.log(error))
			);
  }

  getApplicantByID(id): Observable<any> {
		return this.http.get<any>
			(`http://localhost:8080/api/applicant/${id}`).pipe(
				catchError(async (error) => console.log(error))
			);
  }
}
