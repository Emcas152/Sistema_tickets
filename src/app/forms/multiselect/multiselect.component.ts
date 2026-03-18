import { Component, OnInit } from '@angular/core';

interface ObjType {
  item_id: number; item_text: string;
}

@Component({
    selector: 'app-multiselect',
    templateUrl: './multiselect.component.html',
    styleUrls: ['./multiselect.component.css'],
    standalone: false
})
export class MultiselectComponent implements OnInit {
  dropdownList: ObjType[] = [];
  cities: ObjType[] = [];
  selectedItems: ObjType[] = [];
  singleselectedItem: ObjType | null = null;

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];

    this.cities = [...this.dropdownList];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];

    this.singleselectedItem = this.dropdownList.find((city) => city.item_text === 'Pune') ?? null;
  }
}
