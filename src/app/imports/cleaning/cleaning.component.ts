import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddImportComponent } from '../add-import/add-import.component';
import { ImportHelpComponent } from '../import-help/import-help.component';

@Component({
  selector: 'app-cleaning',
  templateUrl: './cleaning.component.html',
  styleUrls: ['./cleaning.component.scss']
})

export class CleaningComponent implements OnInit {

  // importsUrl = "api/v1/schools-imports"
  refreshDuration: number = 10000
  commonHeaders = [
    {
      name: " Id",
      source: "id"
    },
    'name',
    'created',
    'update_learner',
    {
      name: "Rows",
      source: "rows_count"
    },
    {
      name: "Clean",
      source: 'is_clean',
    },
    {
      name: "Processed",
      source: 'imported_rows_count',
    },
    {
      name: "Duplicates",
      source: 'duplicates_count',
    },
    {
      name: "Errors",
      source: 'error_rows_count',
    },
  ]


  actionHeaders = [
    {
      name: "Status",
      source: 'step_display',
    },
    {
      name: 'Issues',
      source: "errors",
    },
    {
      name: 'Original File',
      type: "actions",
      data: [
        {
          name: "Click to Download",
          type: "download",
          downloadUrl: "import_file",
          cssClass: {
            source: "step",
            classes: {
              "default": "btn btn-outline-success"
            }
          }
        }
      ]
    },
    {
      name: 'Errors File',
      type: "actions",
      data: [
        {
          name: "Click to Download",
          type: "download",
          downloadUrl: "errors_file",
          // source: "step_display",
          cssClass: {
            source: "step",
            classes: {
              "default": "btn-outline-danger"
            }
          }
        }
      ]
    }
  ]

  importHeaders = [
    ...this.commonHeaders,
    {
      name: "Added Learners",
      source: 'new_students_created',
    },
    ...this.actionHeaders
  ]

  cleaningHeaders = [
    ...this.commonHeaders,
    ...this.actionHeaders
  ]

  name: string;
  importArgs: any = {}
  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.importArgs = { should_import: this.isImporting }
  }

  get importsUrl() {
    return `api/v1/schools-imports`
  }


  get action() {
    return this.isCleaning ? "Cleaning" : "Importing"
  }

  get isCleaning() {
    return this.router.url == "/imports/clean"
  }
  get isImporting() {
    return this.router.url == "/imports/import"
  }



  get headers() {
    if (this.isCleaning) {
      return this.cleaningHeaders
    }
    return this.importHeaders
  }

  downloadsActions(event) {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(AddImportComponent, {
      width: '500px'
      , data: { should_import: this.isImporting }
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.importArgs = { should_import: this.isImporting }

    })

  }

  openHelpDialog(): void {
    let dialogRef = this.dialog.open(ImportHelpComponent, {
      width: '500px'
    }
    );

    dialogRef.afterClosed().subscribe(result => {
    })

  }
}
