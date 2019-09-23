import {Component} from '@angular/core';
import {ExamsApiService} from '../exam-api.service';
import {Router} from '@angular/router';
import {Exam} from '../exam.model';

@Component({
  selector: 'app-exam-form',
  template: `
      <div>
          <h2>New Exam</h2>
          <label for="exam-title">Title</label>
          <input id="exam-title" (keyup)="updateTitle($event)">
          <label for="exam-description">Description</label>
          <input id="exam-description" (keyup)="updateDescription($event)">
          <button mat-raised-button color="accent" (click)="saveExam()">Save Exam</button>
      </div>
  `,
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent {

  exam: Exam = {
    title: '',
    description: ''
  };

  constructor(private examsApi: ExamsApiService, private router: Router) {
  }

  updateTitle(event: any) {
    this.exam.title = event.target.value;
  }

  updateDescription(event: any) {
    this.exam.description = event.target.value;
  }

  saveExam() {
    this.examsApi
      .saveExam(this.exam)
      .subscribe(
        () => this.router.navigate(['/']),
        error => alert(error.message)
      );
  }
}
