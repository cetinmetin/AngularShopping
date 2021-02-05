import { Product } from "../../../../../shared/models/product";
import { ProductService } from "../../../../../shared/services/product.service";
import { BillingService } from "../../../../../shared/services/billing.service";
import { ShippingService } from "../../../../../shared/services/shipping.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
declare var $: any;
@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.scss"],
})
export class ResultComponent implements OnInit {
  products: Product[];
  date: number;
  totalPrice = 0;
  shipment = 0;
  subTotal = 0;
  subTotalFloat=0;
  constructor(private productService: ProductService, private router: Router, private billingService: BillingService, private shippingService: ShippingService) {
    /* Hiding Billing Tab Element */
    document.getElementById("productsTab").style.display = "none";
    document.getElementById("shippingTab").style.display = "none";
    document.getElementById("billingTab").style.display = "none";
    document.getElementById("resultTab").style.display = "block";
    this.products = productService.getLocalCartProducts();

    this.products.forEach((product) => {
      this.subTotalFloat += +(product.productPrice)
    })
    this.subTotal = Number(this.subTotalFloat.toFixed(1))
    if (this.subTotal < 50) {
      setTimeout(function () {
        var button = document.querySelector(".ng-tns-c105-0 .container .ng-trigger-fadeAnimation app-checkout section .container .board .tab-content .ng-star-inserted .purchase")
        button.innerHTML = "Alışverişi Tamamlamak İçin 50 TL ve Üzeri Ürün Satın Alınız";
        button.className = "btn btn-danger btn-lg btn-block";
        button.setAttribute("disabled", "true")
      }, 100)
    }
    else if (this.subTotal >= 50 && this.subTotal < 100) {
      this.shipment = 7
    }
    else if (this.subTotal >= 100 && this.subTotal < 150) {
      this.shipment = 10
    }
    else if (this.subTotal >= 150 && this.subTotal < 200) {
      this.shipment = 15
    }
    else if (this.subTotal >= 200) {
      this.shipment = 0
    }
    this.totalPrice = Number((this.subTotal + this.shipment).toFixed(1))
    this.date = Date.now();
  }

  ngOnInit() { }

  downloadReceipt() {
    const data = document.getElementById("receipt");
    // console.log(data);

    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      const pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("inno-market-fatura.pdf"); // Generated PDF
    });
  }

  placeOrder() {
    this.shippingService.createshippings(JSON.parse(localStorage.getItem('shippingDetails')));
    this.billingService.createBillings(JSON.parse(localStorage.getItem('billingDetails')));
    localStorage.removeItem('shippingDetails');
    localStorage.removeItem('billingDetails');
    localStorage.removeItem('avct_item');
    localStorage.removeItem('shipment');
    this.router.navigate([
      "checkouts",
      { outlets: { checkOutlet: ["order-success"] } },
    ]);
  }

}
