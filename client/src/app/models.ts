import { StringTextModule } from '@carbon/icons-angular';



export class Applicant {
  _id?: String;
  firstName: String = null;
  lastName: String = null;
  number: String = null;
  email: String = null;
  country: String = null;
  skills: String = null;
  interviewAnswers: String[] = [];
  techAnswer: String;
  techAnsText: String = null;
  applicationID: String;
  analysis?: Object;

}



export class Application {
  _id?: String;
  title: String = null;
  questions: String[] = [];
  keywords: String[] = [];
}

