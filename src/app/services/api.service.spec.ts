import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make GET request for getUser', () => {
    const username = 'faisalshk';
    const dummyUser = {
      /* your dummy user data */
      login: 'faisalshk',
      id: 86406064,
      node_id: 'MDQ6VXNlcjg2NDA2MDY0',
      avatar_url: 'https://avatars.githubusercontent.com/u/86406064?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/faisalshk',
      html_url: 'https://github.com/faisalshk',
      followers_url: 'https://api.github.com/users/faisalshk/followers',
      following_url:
        'https://api.github.com/users/faisalshk/following{/other_user}',
      gists_url: 'https://api.github.com/users/faisalshk/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/faisalshk/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/faisalshk/subscriptions',
      organizations_url: 'https://api.github.com/users/faisalshk/orgs',
      repos_url: 'https://api.github.com/users/faisalshk/repos',
      events_url: 'https://api.github.com/users/faisalshk/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/faisalshk/received_events',
      type: 'User',
      site_admin: false,
      name: 'Faisal Shaikh',
      company: 'TIMSCDR',
      blog: '',
      location: null,
      email: null,
      hireable: null,
      bio: null,
      twitter_username: null,
      public_repos: 7,
      public_gists: 0,
      followers: 0,
      following: 0,
      created_at: '2021-06-24T09:03:52Z',
      updated_at: '2023-11-29T20:07:49Z',
    };

    service.getUser(username).subscribe(
      (user) => {
        expect(user).toEqual(dummyUser);
        console.log(user);
        console.log(dummyUser);
      },
      (error) => {
        // This callback will be called if the HTTP request fails
        fail('HTTP request failed');
      }
    );

    const req = httpTestingController.expectOne(
      `https://api.github.com/users/${username}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(dummyUser);
  });

  it('should make GET request for getUserRepos', () => {
    const username = 'testuser';
    const pageNumber = 1;
    const dummyRepos = [
      {
        /* your dummy repo data */
        html_url: 'www.html_url.com',
        name: 'Test User Repository',
        description: 'Test User Description',
        topics: ['JavaScript', 'Angular', 'TypeScript'],
      },
    ];

    service.getUserRepos(username, pageNumber).subscribe((repos) => {
      expect(repos).toEqual(dummyRepos);
    });

    const req = httpTestingController.expectOne(
      `https://api.github.com/users/${username}/repos?page=${pageNumber}&per_page=10`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(dummyRepos);
  });

  it('should make GET request for getUserRepos with empty page number', () => {
    const username = 'testuser';
    const dummyRepos = [
      {
        /* your dummy repo data */
        html_url: 'www.html_url.com',
        name: 'Test User Repository',
        description: 'Test User Description',
        topics: ['JavaScript', 'Angular', 'TypeScript'],
      },
    ];

    // Omitting the page number parameter to simulate an empty page number
    service.getUserRepos(username).subscribe((repos) => {
      expect(repos).toEqual(dummyRepos);
    });

    const req = httpTestingController.expectOne(
      `https://api.github.com/users/${username}/repos?page=&per_page=10`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(dummyRepos);
  });
});
