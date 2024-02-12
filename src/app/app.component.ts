import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  username: string = '';
  loader: boolean = false;
  totalPages: number = 1;
  pageNumber: number = 1;
  // constructor(private apiService: ApiService) {}

  setUsername(event: { username: string; loading: boolean }) {
    this.username = event.username;
    this.loader = event.loading;
    this.pageNumber = 1;
  }

  updateTotalPages(totalPages: number): void {
    this.totalPages = totalPages;
  }

  ngOnInit() {
    // this.apiService.getUser('johnpapa').subscribe(console.log);
  }
}
