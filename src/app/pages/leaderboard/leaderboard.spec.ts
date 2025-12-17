import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Leaderboard } from './leaderboard';
import { RouterTestingModule } from '@angular/router/testing';

describe('Leaderboard', () => {
  let component: Leaderboard;
  let fixture: ComponentFixture<Leaderboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, Leaderboard],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Leaderboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
