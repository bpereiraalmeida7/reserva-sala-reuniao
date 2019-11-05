import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradorListComponent } from './colaborador-list.component';

describe('ColaboradorListComponent', () => {
  let component: ColaboradorListComponent;
  let fixture: ComponentFixture<ColaboradorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColaboradorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaboradorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
