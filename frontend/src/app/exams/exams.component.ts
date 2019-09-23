import * as Auth0 from 'auth0-web';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Exam} from '../exam.model';
import {ExamsApiService} from '../exam-api.service';

@Component({
  selector: 'app-exams',
  template: `
      <h2>Exams</h2>
      <p>Choose an exam and start studying.</p>
      <div class="exams">
          <mat-card class="example-card" *ngFor="let exam of examsList" class="mat-elevation-z5">
              <mat-card-content>
                  <mat-card-title>{{exam.title}}</mat-card-title>
                  <mat-card-subtitle>{{exam.description}}</mat-card-subtitle>
                  <p>
                      {{exam.long_description}}
                  </p>
                  <button mat-raised-button color="accent">Start Exam</button>
                  <button mat-button color="warn" (click)="delete(exam.id)" *ngIf="isAdmin()">
                      Delete
                  </button>
              </mat-card-content>
          </mat-card>
      </div>
      <button mat-fab color="primary" *ngIf="authenticated"
              class="new-exam" routerLink="/new-exam">
          <i class="material-icons">note_add</i>
      </button>`,
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit, OnDestroy {

  examsListSubs: Subscription;
  examsList: Exam[];
  authenticated = false;

  constructor(private examsApi: ExamsApiService) {
  }

  ngOnInit() {
    this.examsListSubs = this.examsApi
      .getExams()
      .subscribe(res => {
          this.examsList = res;
        },
        console.error
      );
    const self = this;
    Auth0.subscribe((authenticated) => (self.authenticated = authenticated));
  }

  delete(examId: number) {
    this.examsApi
      .deleteExam(examId)
      .subscribe(() => {
        this.examsListSubs = this.examsApi
          .getExams()
          .subscribe(res => {
              this.examsList = res;
            },
            console.error
          );
      }, console.error);
  }

  isAdmin() {
    if (!Auth0.isAuthenticated()) {
      return false;
    }

    const roles = Auth0.getProfile()['http://127.0.0.1:4200/roles'];
    if (roles.includes('admin')) {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy() {
    this.examsListSubs.unsubscribe();
  }

}
