import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListView } from './client-list-view';

describe('ClientListView', () => {
  let component: ClientListView;
  let fixture: ComponentFixture<ClientListView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientListView],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientListView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
