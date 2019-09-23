import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
      <h2>Online Exams</h2>
      <p>Online Exam Web Application using Angular and Python Flask.</p>
  `,
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
