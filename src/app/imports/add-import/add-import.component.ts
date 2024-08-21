import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { options } from './options';

@Component({
  selector: 'app-add-import',
  templateUrl: './add-import.component.html',
  styleUrls: ['./add-import.component.scss']
})
export class AddImportComponent implements OnInit {

  // My Form
  formItems: any = options;
  url: string = "api/v1/schools-imports/"
  extra_fields: any
  originalInstance: any
  formGroupOrder = [
    ['name'],
    ['import_file'],
    ['update_learner']

  ]
  instance: any
  dialogTitle: any

  constructor(private router: Router, private dialogRef: MatDialogRef<AddImportComponent>, @Inject(MAT_DIALOG_DATA) data) {
    console.log(data)
    this.extra_fields = data
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  onValidatedData(data: any) {
    console.log(data)
  }
  onPostedData(data) {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  get isCleaning() {
    return this.router.url == "/imports/clean"
  }

  get isImport() {
    return this.router.url == "/imports/import"
  }


}
