import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillListPage } from './bill-list.page';

describe('BillListPage', () => {
  let component: BillListPage;
  let fixture: ComponentFixture<BillListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BillListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
