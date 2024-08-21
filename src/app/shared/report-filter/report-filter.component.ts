import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-filter',
  templateUrl: './report-filter.component.html',
  styleUrls: ['./report-filter.component.scss']
})
export class ReportFilterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  applyFilters(){
    
  }


  clearFilters(){

  }

  openPopup() {
    document.getElementById("modalcontainer")!.classList.add('show');
  }

  closePopup() {
    document.getElementById("modalcontainer")!.classList.remove('show');
  }

}
