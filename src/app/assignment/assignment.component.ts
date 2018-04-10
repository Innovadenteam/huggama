import { Component, OnInit } from '@angular/core';

import { JanitorService } from 'app/common/service/janitor.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  janitors$;
  toiletList = [];
  selectedtoilets = [];
  dropdownSettings = {};

  constructor(
    private janitorService: JanitorService
  ) {

    this.janitors$ = janitorService.getJanitors();

    this.toiletList = [
      {'id': 1, 'itemName': 'G-A'},
      {'id': 2, 'itemName': 'G-B'},
      {'id': 3, 'itemName': 'G-C'},
      {'id': 4, 'itemName': '1-A'},
      {'id': 5, 'itemName': '1-B'},
      {'id': 6, 'itemName': '1-C'},
      {'id': 7, 'itemName': '1-D'},
      {'id': 8, 'itemName': '2-A'},
      {'id': 9, 'itemName': '2-B'},
      {'id': 10, 'itemName': '2-C'}
    ];

    this.dropdownSettings = {
      text: 'Select toilets',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass',
      singleSelection: false
    };
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedtoilets);
  }
  OnItemDeSelect(item: any) {
      console.log(item);
      console.log(this.selectedtoilets);
  }
  onSelectAll(items: any) {
      console.log(items);
  }
  onDeSelectAll(items: any) {
      console.log(items);
  }

  ngOnInit() {
  }

}
