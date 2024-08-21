import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddImportComponent } from '../add-import/add-import.component';

@Component({
  selector: 'app-import-help',
  templateUrl: './import-help.component.html',
  styleUrls: ['./import-help.component.scss']
})
export class ImportHelpComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddImportComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
