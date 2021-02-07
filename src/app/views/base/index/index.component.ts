import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {
  carouselList = [
    {
      bannerImg: "./assets/banner_img/img_1.jpg",
      title: "Inno Market Açıldı!",
      description: "İndirimler ve Kampanyalar İçin Takipte Kalın",
    },
    {
      bannerImg: "./assets/banner_img/img_3.jpg",
      title: "Yeni Web Sitemiz ile Hizmetinizdeyiz",
      description:
        "Web sitemize özel fiyatlar",
    },
    {
      bannerImg: "./assets/banner_img/img_4.jpg",
      title: "Yeni ürünler",
      description: "Yeni ürünlerimizi Keşfedin",
    },
  ];

  constructor() {}

  ngOnInit() {}
}
