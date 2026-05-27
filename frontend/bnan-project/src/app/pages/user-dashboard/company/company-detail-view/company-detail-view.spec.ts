import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailView } from './company-detail-view';

describe('CompanyDetailView', () => {
  let component: CompanyDetailView;
  let fixture: ComponentFixture<CompanyDetailView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyDetailView],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyDetailView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
