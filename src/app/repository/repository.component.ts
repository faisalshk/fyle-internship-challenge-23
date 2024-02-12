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
  @Input() totalPages: number = 0;
  repos: any[] = [];
  error: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnChanges() {
    console.log(this.username);
    if (this.username) {
      this.loader = true;
      this.error = false;
      this.apiService.getUserRepos(this.username, this.pageNumber).subscribe(
        (response: any) => {
          this.repos = response;
          this.loader = false;
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
  //Previous Page
  prevPage() {
    this.pageNumber--;
    this.loader = true;
    this.apiService
      .getUserRepos(this.username, this.pageNumber)
      .subscribe((response: any) => {
        this.repos = response;
        this.loader = false;
      });
  }
  //Next Page
  nextPage() {
    this.pageNumber++;
    this.loader = true;
    this.apiService
      .getUserRepos(this.username, this.pageNumber)
      .subscribe((response: any) => {
        this.repos = response;
        this.loader = false;
      });
  }

  iterate(count: number): number[] {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(i);
    }
    return result;
  }

  pageClick(e: any) {
    this.pageNumber = Number(e.target.innerHTML);
    this.loader = true;
    console.log(typeof this.pageNumber);
    this.apiService
      .getUserRepos(this.username, this.pageNumber)
      .subscribe((response: any) => {
        this.repos = response;
        this.loader = false;
      });
  }
}
