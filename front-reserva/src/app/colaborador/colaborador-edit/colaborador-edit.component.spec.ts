import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradorEditComponent } from './colaborador-edit.component';

describe('ColaboradorEditComponent', () => {
  let component: ColaboradorEditComponent;
  let fixture: ComponentFixture<ColaboradorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColaboradorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaboradorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
