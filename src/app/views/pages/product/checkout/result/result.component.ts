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
  tax=0;
  constructor(private productService: ProductService,private router: Router, private billingService: BillingService,private shippingService: ShippingService) {
    /* Hiding Billing Tab Element */
    document.getElementById("productsTab").style.display = "none";
    document.getElementById("shippingTab").style.display = "none";
    document.getElementById("billingTab").style.display = "none";
    document.getElementById("resultTab").style.display = "block";

    this.products = productService.getLocalCartProducts();

    this.products.forEach((product) => {
      this.totalPrice += product.productPrice;
    });
    this.tax = this.totalPrice*0.18;
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
    this.router.navigate([
      "checkouts",
      { outlets: { checkOutlet: ["order-success"] } },
    ]);
  }

}
