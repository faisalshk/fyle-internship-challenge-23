# Fyle Frontend Challenge

Sucessfully!!, Designed an Angular 14+ single-page application (SPA) that takes a GitHub username as input and displays the public Github repositories belonging to the user.

Sucessfully!!, Implemented Skeleton loader

Sucessfully!!, Implemented Server-side Pagination

there are three components beside parent component(app.component), the search component, profile component and repository component.

the search component handles the input field when ever the user clicks the search button the Api call will be made in the profile component and the respository component And when the Api call is being made the skeleton lodaer is displayed, and when the data is received the loader will be removed

# Pagination

the pagination is handled in the the repository component, the pagination is server side and only displays 10 repository per page, when ever the user clicks on the next or previous or any of the pagination number the api call will be made and only 10 repository will be called.

Note: the API call will be made every time the user clicks the pagination buttons, also the skelton loader will appear while the api call is being made.

# Caching
Caching for the whole application is done with the help of localstorage.

In the Profile component when the user first searches for github the user, the application will first check in the localstorage if the profile data of the github user is available, if it is available it will then render that data in the template and if it is not available in the localstorage then the application will make the API request for the user and then pushes the user data in the profileData array which is stored in the localstorage. The user data in the localstorage is stored with the key "profileData".

In the Repository component there is a "cacheKey" which has username, pagenumber and pageSize eg - "johnpapa_1_10", this key is used to store the data in the localstorage. When the user searches for the github user the repository component will first check if the data of the cacheKey i.e "johnpapa_1_10" is available in the localstorage or not, if the data related to that key is available then that data will be used in the HTML template and if the data of that key is not available then the repository component will make the API request and then stores the data of that key in the localstorage. This will help us to prevent making repetative API request.

# Unit Testing:

The unit testing is done only for the Search Component and the API service.
To Run unit testing for the component and service and also to see the code coverage report provided by angular use this command

### component testing

ng test --include='src/app/search/search.component.spec.ts' --code-coverage

### api service testing

ng test --include='src/app/services/api.service.spec.ts' --code-coverage
