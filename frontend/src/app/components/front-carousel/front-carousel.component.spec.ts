import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontCarouselComponent } from './front-carousel.component';

describe('FrontCarouselComponent', () => {
  let component: FrontCarouselComponent;
  let fixture: ComponentFixture<FrontCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrontCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});