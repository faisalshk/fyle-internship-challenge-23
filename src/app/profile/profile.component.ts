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
  cachedData: any[] = [];
  totalRepos = 1;
  error: string = '';
  @Input() loader: boolean = false;
  @Output() totalRepository = new EventEmitter<number>();

  constructor(private apiService: ApiService) {}

  //helper functions
  callUserData(username: string) {
    this.apiService.getUser(username).subscribe(
      (response: any) => {
        this.cachedData.push(response);
        localStorage.setItem('profileData', JSON.stringify(this.cachedData));
        this.data = response;
        this.totalRepos = response.public_repos;
        // Emit the total pages.....
        this.totalRepository.emit(this.totalRepos);
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        this.error = error.error.message;
        console.error('Error fetching profile data:', error.error.message);
      }
    );
  }

  // user click event data
  ngOnChanges() {
    if (this.username) {
      this.loader = true;
      this.error = '';

      //checking if the user data is in the localstorage or not (doing caching with the help of local storage)
      const cachedUserData = localStorage.getItem('profileData');

      if (cachedUserData) {
        this.cachedData = JSON.parse(cachedUserData);
        const userExists = this.cachedData.find(
          (data) => data.login === this.username
        );

        if (userExists) {
          console.log(userExists);
          this.data = userExists;
          this.totalRepos = this.data.public_repos;
          // Emit the total pages.....
          this.totalRepository.emit(this.totalRepos);
          this.loader = false;
          return;
        } else {
          this.callUserData(this.username);
        }
      } else {
        this.callUserData(this.username);
      }
    }
  }
}
