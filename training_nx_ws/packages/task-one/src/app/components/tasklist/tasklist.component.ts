import { Component, Input, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
@Component({
  selector: 'app-task',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
})
export class TasklistComponent implements OnInit {
  customers: Array<any> = [];
  selectedCustomers: Array<any> = [];
  customersFilter: Array<any> = [];
  genders: Array<any> = [];
  selectedGender: unknown;
  nationalities: Array<any> = [];
  selectedNationality: unknown;
  cols!: any[];
  exportColumns!: any[];
  _selectedColumns !: any[];
  constructor(private listService: ListService) {}

  ngOnInit(): void {
    this.listService.getElemnts().subscribe((e) => {
      this.customers = e['results'];
      this.customersFilter = this.customers;
      this.genders = Array.from(
        new Set(this.customers.map((x) => x['gender']))
      );

      this.nationalities = Array.from(
        new Set(this.customers.map((x) => x['location']['country']))
      );

      console.log('elements : ', this.customers);
      console.log('genders : ', this.genders);
      console.log('natinalities : ', this.nationalities);
    });

    this.cols = [
      { field: 'name', secondIndex: 'title', header: 'Mr/Mrs' },
      { field: 'name', secondIndex: 'first', header: 'First Name' },
      { field: 'name', secondIndex: 'last', header: 'Last Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'location', secondIndex: 'country', header: 'location.country' },
      { field: 'email', header: 'E-mail' },
      { field: 'dob', secondIndex: 'age', header: 'Current Age' },
      {
        field: 'registered',
        secondIndex: 'age',
        header: 'Registration Seniority',
      },
      { field: 'phone', header: 'Phone number' },
      { field: 'picture', secondIndex: 'thumbnail', header: 'Picture' },
    ];
    this.exportColumns = this.customersFilter.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
    this.selectedColumns = this.cols;
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col) => val.includes(col));
  }

  genderFiler() {
    this.customersFilter = this.customers.filter(
      (x) => x['gender'] == this.selectedGender
    );
  }

  nationalityFilter() {
    this.customersFilter = this.customers.filter(
      (x) => x['location']['country'] == this.selectedNationality
    );
  }
}
