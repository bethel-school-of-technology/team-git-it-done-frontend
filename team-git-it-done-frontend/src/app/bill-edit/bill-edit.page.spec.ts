import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillEditPage } from './bill-edit.page';

describe('BillEditPage', () => {
  let component: BillEditPage;
  let fixture: ComponentFixture<BillEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BillEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
