import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'blue'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class DownloadsComponent implements OnInit {

  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  constructor() { }
  downloadsUrl = "api/v1/downloads"
  downloadArgs: any = {}
  refreshDuration: number = 10000
  downloadsHeaders = [
    'name',
    {
      name: "Active Filters",
      source: "args"
    },
    {
      name: "Rows",
      source: "rows_count"
    },
    {
      name: "Exported",
      source: 'exported_rows_count',
    },
    {
      name: "Completed %",
      source: 'completed_percentage',
    },
    {
      name: 'Download Link',
      type: "actions",
      data: [
        {
          name: "Click to Downloadda",
          type: "download",
          downloadUrl: "file",
          source: "status_display",
          cssClass: {
            source: "status",
            classes: {
              "D": "btn-outline-success",
              "F": "btn disabled btn-outline-danger",
              "Q": "btn disabled btn-outline-secondary",
              "P": "btn disabled btn-outline-info",
              "E": "btn disabled btn-outline-info",
              "default": "btn disabled btn-outline-secondary"
            }
          }
        }
      ]
    },
  ]
  ngOnInit() {
  }

  downloadsActions(event) {
  }

}
