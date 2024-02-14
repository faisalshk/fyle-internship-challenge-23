import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchEvent with username and loading true on form submission', () => {
    const emitSpy = spyOn(component.searchEvent, 'emit');

    component.username = 'testUser';
    component.search();

    expect(emitSpy).toHaveBeenCalledWith({
      username: 'testUser',
      loading: true,
    });
    // resetting the username to empty string
    expect(component.username).toBe('');
  });

  it('should not emit search event when form is submitted with empty input', () => {
    const emitSpy = spyOn(component.searchEvent, 'emit');

    // obtaining the search button
    const searchButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );

    component.username = '';
    searchButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(emitSpy).not.toHaveBeenCalled();
  });
});
