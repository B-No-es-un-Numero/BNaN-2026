import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailView } from './client-detail-view';

describe('ClientDetailView', () => {
  let component: ClientDetailView;
  let fixture: ComponentFixture<ClientDetailView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDetailView],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientDetailView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
