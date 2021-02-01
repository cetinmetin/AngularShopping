import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ProductService } from "src/app/shared/services/product.service";
import { Product } from "src/app/shared/models/product";
import { ProductOptions } from "src/app/shared/models/productOptions";
declare var $: any;
declare var require: any;
declare var toastr: any;
const shortId = require("shortid");
const moment = require("moment");

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"],
})
export class AddProductComponent implements OnInit {
  product: Product = new Product();
  constructor(private productService: ProductService) { }
  quantityOfOptions = new Array()
  productOptions: ProductOptions[] = []
  productOption: ProductOptions
  ngOnInit() { }

  createProduct(productForm: NgForm) {
    for (let i = 0; i < parseInt((document.getElementById("quantityOfOption") as HTMLInputElement).value); i++) {
      const option: ProductOptions = {
        optionName: (document.getElementById("option" + (i + 1)) as HTMLInputElement).value,
        optionPrice: parseInt((document.getElementById("price" + (i + 1)) as HTMLInputElement).value)
      }
      this.productOptions.push({ optionName: option.optionName, optionPrice: option.optionPrice })
    }
    const payload: Product = {
      ...productForm.value,
      productId: "PROD_" + shortId.generate(),
      productAdded: moment().unix(),
      ratings: Math.floor(Math.random() * 5 + 1),
      favourite: false,
      productOption: this.productOptions
    };
    if (productForm.value.productImageUrl === undefined) {
      payload.productImageUrl =
        "http://via.placeholder.com/640x360/007bff/ffffff";
    }

    this.productService.createProduct(payload, () => {
      this.product = new Product();
      $("#exampleModalLong").modal("hide");
      toastr.success(
        "Ürün " + payload.productName + "Başarıyla Eklendi",
        "Ürün Oluşturma"
      );
    });
  }
  createOptions() {
    if (parseInt((document.getElementById("quantityOfOption") as HTMLInputElement).value) > 0) {
      for (let i = 0; i < parseInt((document.getElementById("quantityOfOption") as HTMLInputElement).value); i++) {
        this.quantityOfOptions.push(i + 1)
      }
    }
  }
}
