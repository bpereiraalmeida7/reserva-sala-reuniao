import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasCreateComponent } from './salas-create.component';

describe('SalasCreateComponent', () => {
  let component: SalasCreateComponent;
  let fixture: ComponentFixture<SalasCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalasCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
