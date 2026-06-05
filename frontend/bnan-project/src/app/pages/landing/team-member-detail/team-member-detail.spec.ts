import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberDetail } from './team-member-detail';

describe('TeamMemberDetail', () => {
  let component: TeamMemberDetail;
  let fixture: ComponentFixture<TeamMemberDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamMemberDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamMemberDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
