import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEditCreateComponent } from './post-edit-create.component';

describe('PostEditCreateComponent', () => {
  let component: PostEditCreateComponent;
  let fixture: ComponentFixture<PostEditCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostEditCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostEditCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
