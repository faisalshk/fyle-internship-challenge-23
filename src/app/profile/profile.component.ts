import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @Input() username: string = '';
  data: any;
  totalPages = 1;
  error: string = '';
  @Input() loader: boolean = false;
  @Output() totalPagesChanged = new EventEmitter<number>();
  constructor(private apiService: ApiService) {}
  // user click event data
  ngOnChanges() {
    if (this.username) {
      this.loader = true;
      this.error = '';
      this.apiService.getUser(this.username).subscribe(
        (response: any) => {
          this.data = response;
          this.totalPages = Math.ceil(response.public_repos / 10);
          if (this.totalPages > 10) this.totalPages = 10;
          // Emit the total pages.....
          this.totalPagesChanged.emit(this.totalPages);
          this.loader = false;
        },
        (error) => {
          this.loader = false;
          this.error = error.error.message;
          console.error('Error fetching profile data:', error.error.message);
        }
      );
    }
  }
}
