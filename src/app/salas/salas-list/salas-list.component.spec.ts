import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasListComponent } from './salas-list.component';

describe('SalasListComponent', () => {
  let component: SalasListComponent;
  let fixture: ComponentFixture<SalasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
