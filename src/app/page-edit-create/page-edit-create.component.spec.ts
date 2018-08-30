import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEditCreateComponent } from './page-edit-create.component';

describe('PageEditCreateComponent', () => {
  let component: PageEditCreateComponent;
  let fixture: ComponentFixture<PageEditCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageEditCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEditCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
