import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-actions',
  templateUrl: './search-actions.component.html',
  styleUrls: ['./search-actions.component.css'],
})
export class SearchActionsComponent {
  @Input() label = 'Actions';

  @Input() resetLabel = 'Reset';

  @Input() searchLabel = 'Search';

  @Input() resetDisabled = false;

  @Input() searchDisabled = false;

  @Output() reset = new EventEmitter<MouseEvent>();

  @Output() search = new EventEmitter<MouseEvent>();

  onReset(event: MouseEvent): void {
    this.reset.emit(event);
  }

  onSearch(event: MouseEvent): void {
    this.search.emit(event);
  }
}
