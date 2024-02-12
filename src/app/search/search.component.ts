import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() searchEvent = new EventEmitter<{
    username: string;
    loading: boolean;
  }>();
  username: string = '';

  search() {
    const loading = true;
    console.log(this.username);
    this.searchEvent.emit({ username: this.username, loading });
    this.username = '';
  }
}
