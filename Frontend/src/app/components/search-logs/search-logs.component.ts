import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SearchFilter } from 'src/app/models/SearchFilter';

@Component({
  selector: 'app-search-logs',
  templateUrl: './search-logs.component.html',
  styleUrls: ['./search-logs.component.css']
})
export class SearchLogsComponent {
  @Output() search = new EventEmitter<SearchFilter>();
  form: FormGroup= new FormGroup({vehicle: new FormControl(),code: new FormControl(),from: new FormControl(),to:new FormControl()})
  constructor(private fb: FormBuilder) {}
  onInit(){
    this.form = this.fb.group({
      vehicle: [''],
      code: [''],
      from: [''],
      to: ['']
    });
  }

  onSubmit() {
    this.search.emit(this.form.value);
  }
}
