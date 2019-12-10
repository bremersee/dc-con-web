import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DnsNodesComponent } from './dns-nodes.component';

describe('DnsNodesComponent', () => {
  let component: DnsNodesComponent;
  let fixture: ComponentFixture<DnsNodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DnsNodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DnsNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
