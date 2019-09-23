import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatInputModule, MatToolbarModule} from '@angular/material';

import * as Auth0 from 'auth0-web';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {ExamsApiService} from './exam-api.service';
import {ExamsComponent} from './exams/exams.component';
import {ExamFormComponent} from './exam-form/exam-form.component';
import {RouterModule, Routes} from '@angular/router';
import {CallbackComponent} from './callback/callback.component';
import {AboutComponent} from './about/about.component';

const appRoutes: Routes = [
  {path: 'callback', component: CallbackComponent},
  {path: 'new-exam', component: ExamFormComponent},
  {path: 'about', component: AboutComponent},
  {path: '', component: ExamsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ExamsComponent,
    ExamFormComponent,
    CallbackComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(
      appRoutes
    ),
    NoopAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule
  ],
  providers: [ExamsApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    Auth0.configure({
      domain: 'deolgurpreet.auth0.com',
      audience: 'python-angular',
      clientID: 'OaRuRQK1t9w469i64zrfKZAgq0YYrPs6',
      redirectUri: 'http://localhost:4200/callback',
      scope: 'openid profile manage:exams'
    });
  }
}
