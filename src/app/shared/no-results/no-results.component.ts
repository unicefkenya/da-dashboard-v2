import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-results',
  templateUrl: './no-results.component.html',
  styleUrls: ['./no-results.component.scss']
})
export class NoResultsComponent implements OnInit {

  constructor() { }

  @Input()
  duration = ""
  ngOnInit() {
    // todo: enhanced based on use-cases: (404 | 200 - but 0 records)
  }

}
