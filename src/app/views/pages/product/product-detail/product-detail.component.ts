import { Product } from "../../../../shared/models/product";
import { ProductOptions } from "../../../../shared/models/productOptions";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../../../shared/services/product.service";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private sub: any;
  product: Product;
  productOption: ProductOptions[]
  selectedOption: number
  productOptionName: string
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastrService: ToastrService,
    private router: Router,
  ) {
    this.product = new Product();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      const id = params.id; // (+) converts string 'id' to a number
      this.getProductDetail(id);
    });
  }

  getProductDetail(id: string) {
    const x = this.productService.getProductById(id);
    x.snapshotChanges().subscribe(
      (product) => {
        const y = { ...(product.payload.toJSON() as Product), $key: id };
        this.product = y;
      },
      (error) => {
        this.toastrService.error("Error while fetching Product Detail", error);
      }
    );
  }

  addToCart(product: Product) {
    var quantity = parseInt((document.getElementById("quantity") as HTMLInputElement).value);
    var noteForSeller = ((document.getElementById("noteForSeller") as HTMLInputElement).value).toString()
    if (noteForSeller.trim().length > 0) {
      product.noteForSeller = noteForSeller
    }
    // if (this.selectedOption) {
    //   this.product.productPrice = this.selectedOption
    //   console.log(this.selectedOption)
    // }
    this.productService.addToCart(product, quantity);
  }
  onChange(deviceValue) {
    this.product.productName = deviceValue.options[deviceValue.options.selectedIndex].text;
    this.product.productPrice = deviceValue.value;
  }
  purchase(product: Product) {
    var quantity = parseInt((document.getElementById("quantity") as HTMLInputElement).value);
    var noteForSeller = ((document.getElementById("noteForSeller") as HTMLInputElement).value).toString()
    if (noteForSeller.trim().length > 0) {
      product.noteForSeller = noteForSeller
    }
    this.productService.addToCart(product, quantity)
    setTimeout(() => {
      this.router.navigateByUrl('/checkouts');
    }, 2000);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
