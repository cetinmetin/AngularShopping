import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from "@angular/core";
import { Product } from "../../../../shared/models/product";

@Component({
  selector: "app-cart-calculator",
  templateUrl: "./cart-calculator.component.html",
  styleUrls: ["./cart-calculator.component.scss"],
})
export class CartCalculatorComponent implements OnInit, OnChanges {
  @Input() products: Product[];

  totalValue = 0;
  totalValueFloat = 0;
  shipment = 0
  subTotal = 0
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const dataChanges: SimpleChange = changes.products;

    const products: Product[] = dataChanges.currentValue;
    this.totalValueFloat = 0;
    this.subTotal = 0
    products.forEach((product) => {
      this.totalValueFloat += + product.productPrice
    });
    this.subTotal = Number(this.totalValueFloat.toFixed(1))
    if (this.totalValueFloat < 50) {
      setTimeout(function () {
        var button = document.querySelector(".ng-tns-c105-0 .container .ng-trigger-fadeAnimation .ng-star-inserted .container .row .col-4 app-cart-calculator .mb-3 .btn-success")
        button.innerHTML = "Alışverişi Tamamlamak İçin 50 TL ve Üzeri Ürün Satın Alınız";
        button.className = "btn btn-danger";
        button.setAttribute("disabled", "true")
      }, 100)
    }
    else if (this.totalValueFloat >= 50 && this.totalValueFloat < 100) {
      this.shipment = 7
    }
    else if (this.totalValueFloat >= 100 && this.totalValueFloat < 150) {
      this.shipment = 10
    }
    else if (this.totalValueFloat >= 150 && this.totalValueFloat < 200) {
      this.shipment = 15
    }
    else if (this.totalValueFloat >= 200) {
      this.shipment = 0
    }
    this.totalValue = Number(this.totalValueFloat.toFixed(1)) + this.shipment
    localStorage.setItem("shipment", this.shipment.toString());
  }

  ngOnInit() { }
}
