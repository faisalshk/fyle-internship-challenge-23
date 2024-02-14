import { Component, Input, Output } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
})
export class RepositoryComponent {
  @Input() username: string = '';
  @Input() loader: boolean = false;
  @Input() pageNumber: number = 1;
  @Input() totalRepos: number = 0;
  repos: any[] = [];
  error: boolean = false;
  pageSizeOptions: number[] = [10, 20, 50, 100];
  selectedPageSize: number = 10;
  totalPages: number = 1;

  constructor(private apiService: ApiService) {}

  ngOnChanges() {
    if (this.username) {
      this.loader = true;
      this.error = false;
      this.selectedPageSize = 10;
      this.pageNumber = 1;

      const cacheKey = this.getCacheKey();

      //check if the data is in the localstorage or not
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        // if the data is available then set that data as the repos data
        this.repos = JSON.parse(cachedData);

        this.loader = false;

        this.totalPages = Math.ceil(this.totalRepos / this.selectedPageSize);
        if (this.totalPages > 10) this.totalPages = 10;

        console.log(this.totalPages);
        if (this.totalPages > 10) this.totalPages = 10;
      } else {
        this.apiService
          .getUserRepos(this.username, this.pageNumber, this.selectedPageSize)
          .subscribe(
            (response: any) => {
              this.repos = response;
              this.loader = false;
              // if there is a new data then cached that data in to the local storage with the cacheKey as the key and the respponse as the value
              localStorage.setItem(cacheKey, JSON.stringify(response));

              this.totalPages = Math.ceil(
                this.totalRepos / this.selectedPageSize
              );

              console.log(this.totalPages);

              if (this.totalPages > 10) this.totalPages = 10;

              console.log(this.repos);
              console.log(this.totalPages);
            },
            (error) => {
              console.log('Error fetching repository data:', error);
              this.loader = false;
              this.error = true;
              this.repos = [];
            }
          );
      }
    }
  }

  //Previous Page
  prevPage() {
    this.pageNumber--;
    this.loader = true;
    const cacheKey = this.getCacheKey();
    this.getRepoData(
      cacheKey,
      this.username,
      this.pageNumber,
      this.selectedPageSize
    );
  }

  //Next Page
  nextPage() {
    this.pageNumber++;
    this.loader = true;
    const cacheKey = this.getCacheKey();
    this.getRepoData(
      cacheKey,
      this.username,
      this.pageNumber,
      this.selectedPageSize
    );
  }

  //function used to loop over the totalpages for pgination
  iterate(count: number): number[] {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(i);
    }
    return result;
  }

  // when click on the pagination numbers
  pageClick(e: any) {
    //get the tagret element and set it to the pageNumber
    this.pageNumber = Number(e.target.innerHTML);
    this.loader = true;
    const cacheKey = this.getCacheKey();
    this.getRepoData(
      cacheKey,
      this.username,
      this.pageNumber,
      this.selectedPageSize
    );
  }

  // when the page size is changed
  onPageSizeChange() {
    // Reset to first page when page size changes
    this.pageNumber = 1;
    this.loader = true;
    const cacheKey = this.getCacheKey();
    this.getRepoData(
      cacheKey,
      this.username,
      this.pageNumber,
      this.selectedPageSize
    );
  }

  //cache key
  // this key will help us to cache the data of a spcific user
  getCacheKey() {
    return `${this.username}_${this.pageNumber}_${this.selectedPageSize}`;
  }

  //helper function
  getRepoData(cacheKey: any, username: string, pageNumber: any, pageSize: any) {
    //check if the data is in the localstorage or not
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      // if the data is available then set that data as the repos data
      this.repos = JSON.parse(cachedData);

      this.loader = false;

      this.totalPages = Math.ceil(this.totalRepos / this.selectedPageSize);

      if (this.totalPages > 10) this.totalPages = 10;
    } else {
      // if the data is not in the localstorage then make the api call for that data
      this.apiService.getUserRepos(username, pageNumber, pageSize).subscribe(
        (response: any) => {
          this.repos = response;

          this.totalPages = Math.ceil(this.totalRepos / this.selectedPageSize);

          if (this.totalPages > 10) this.totalPages = 10;

          this.loader = false;

          localStorage.setItem(cacheKey, JSON.stringify(response));
        },
        (error) => {
          console.log('Error fetching repository data:', error);
          this.loader = false;
          this.error = true;
          this.repos = [];
        }
      );
    }
  }
}
