import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QualityLifePage } from './quality-life.page';

describe('QualityLifePage', () => {
  let component: QualityLifePage;
  let fixture: ComponentFixture<QualityLifePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QualityLifePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
