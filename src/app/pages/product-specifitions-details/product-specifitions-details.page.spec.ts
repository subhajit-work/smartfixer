import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductSpecifitionsDetailsPage } from './product-specifitions-details.page';

describe('ProductSpecifitionsDetailsPage', () => {
  let component: ProductSpecifitionsDetailsPage;
  let fixture: ComponentFixture<ProductSpecifitionsDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSpecifitionsDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSpecifitionsDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
