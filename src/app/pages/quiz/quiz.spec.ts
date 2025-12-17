import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Quiz } from './quiz';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Quiz', () => {
  let component: Quiz;
  let fixture: ComponentFixture<Quiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, Quiz],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Quiz);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create the quiz component', () => {
    expect(component).toBeTruthy();
  });

  it('should start with score 0', () => {
    expect(component.score).toBe(0);
  });

  it('should increment score when correct answer is validated', () => {
    component.questions = [
      {
        text: 'Q1', options: ['A'], correctAnswer: 0,
        id: 0,
        theme: ''
      }
    ];
    component.selectedOptionIndex = 0;
    component.validateAnswer();
    expect(component.score).toBe(1);
  });
});  