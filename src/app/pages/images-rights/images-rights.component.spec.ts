import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesRightsComponent } from './images-rights.component';

describe('ImagesRightsComponent', () => {
  let component: ImagesRightsComponent;
  let fixture: ComponentFixture<ImagesRightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagesRightsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
