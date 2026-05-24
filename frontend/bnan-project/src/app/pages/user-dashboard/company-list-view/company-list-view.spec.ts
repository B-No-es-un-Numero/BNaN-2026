import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListView } from './company-list-view';

describe('CompanyListView', () => {
  let component: CompanyListView;
  let fixture: ComponentFixture<CompanyListView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyListView],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyListView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
