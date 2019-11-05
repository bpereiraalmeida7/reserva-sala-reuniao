import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradorCreateComponent } from './colaborador-create.component';

describe('ColaboradorCreateComponent', () => {
  let component: ColaboradorCreateComponent;
  let fixture: ComponentFixture<ColaboradorCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColaboradorCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaboradorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
