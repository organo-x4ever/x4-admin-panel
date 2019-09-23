import {Component} from '@angular/core';
import {ExamsApiService} from '../exam-api.service';
import {Router} from '@angular/router';
import {Exam} from '../exam.model';

@Component({
  selector: 'app-exam-form',
  template: `
      <mat-card>
      <h2>New Exam</h2>
        <mat-form-field class="full-width">
          <input matInput
                 placeholder="Title"
                 (keyup)="updateTitle($event)">
        </mat-form-field>

        <mat-form-field class="full-width">
          <input matInput
                 placeholder="Description"
                 (keyup)="updateDescription($event)">
        </mat-form-field>

        <button mat-raised-button
                color="primary"
                (click)="saveExam()">
          Save Exam
        </button>
    </mat-card>
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
