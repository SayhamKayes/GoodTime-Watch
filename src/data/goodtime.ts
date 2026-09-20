import { WatchProduct, UpcomingWatch, DeliveredWatch, SiteInfo } from "../types";

export const SITE_INFO: SiteInfo = {
  name: "Goodtime Watch SG",
  domain: "https://goodtimewatchsg.com/",
  email: "goodtimewatchsg@gmail.com",
  phoneDisplay: "01327-426905",
  phoneIntl: "+8801327426905",
  whatsappNumber: "8801327426905",
  whatsappLink: "https://wa.me/8801327426905",
  location: "Dhaka, Bangladesh",
  announcement: "Complimentary Insured Delivery on Selected Orders across Bangladesh"
};

export const ALL_PRODUCTS: WatchProduct[] = [
  {
    "id": "rolex-submariner-date",
    "brandId": "rolex",
    "brandName": "Rolex",
    "name": "Submariner",
    "model": "Date 41mm",
    "reference": "126610LN",
    "price": 1450000,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Automatic",
    "caseMaterial": "Oystersteel",
    "strapMaterial": "Oystersteel",
    "dialColor": "Black",
    "caseSizeMm": 41,
    "waterResistance": "300m",
    "images": [
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1639736922209-793b59a41572?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "Enquire",
    "isNew": false,
    "isBestSeller": true,
    "isLuxury": true,
    "styles": [
      "Diver",
      "Classic"
    ],
    "tags": [
      "diver",
      "automatic"
    ],
    "description": "The archetypal dive watch — a black dial, ceramic bezel and Oyster bracelet that has defined the genre for decades.",
    "rating": 4.9,
    "reviewsCount": 12
  },
  {
    "id": "rolex-datejust-36",
    "brandId": "rolex",
    "brandName": "Rolex",
    "name": "Datejust",
    "model": "36",
    "reference": "126234",
    "price": 1250000,
    "compareAtPrice": null,
    "gender": "unisex",
    "movement": "Automatic",
    "caseMaterial": "Oystersteel",
    "strapMaterial": "Oystersteel",
    "dialColor": "Blue",
    "caseSizeMm": 36,
    "waterResistance": "100m",
    "images": [
      "https://images.unsplash.com/photo-1730757679771-b53e798846cf?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1639006570490-79c0c53f1080?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "Enquire",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": true,
    "styles": [
      "Classic",
      "Elegant"
    ],
    "tags": [
      "dress",
      "automatic"
    ],
    "description": "Elegance distilled — the Datejust 36 pairs a sunray blue dial with the celebrated Jubilee-style bracelet.",
    "rating": 4.9,
    "reviewsCount": 8
  },
  {
    "id": "omega-speedmaster-professional",
    "brandId": "omega",
    "brandName": "OMEGA",
    "name": "Speedmaster",
    "model": "Professional",
    "reference": "310.30.42.50.01.001",
    "price": 1050000,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Manual Winding",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Stainless Steel",
    "dialColor": "Black",
    "caseSizeMm": 42,
    "waterResistance": "50m",
    "images": [
      "https://images.unsplash.com/photo-1636639818651-d97365346a5c?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600003014637-ff82a275e191?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": true,
    "isBestSeller": true,
    "isLuxury": true,
    "styles": [
      "Chronograph",
      "Classic"
    ],
    "tags": [
      "chronograph",
      "sport"
    ],
    "description": "The Moonwatch. A black dial, tachymeter bezel and legendary hand-wound movement — the definitive chronograph.",
    "rating": 4.9,
    "reviewsCount": 21,
    "video360": "/360_motion_1.mp4"
  },
  {
    "id": "omega-seamaster-diver-300m",
    "brandId": "omega",
    "brandName": "OMEGA",
    "name": "Seamaster",
    "model": "Diver 300M",
    "reference": "210.30.42.20.01.001",
    "price": 980000,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Stainless Steel",
    "dialColor": "Black",
    "caseSizeMm": 42,
    "waterResistance": "300m",
    "images": [
      "https://images.unsplash.com/photo-1659461279680-a9cfd7e75bf4?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1633869699811-cd4f63049b36?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": true,
    "isLuxury": true,
    "styles": [
      "Diver",
      "Sport"
    ],
    "tags": [
      "diver",
      "automatic"
    ],
    "description": "A professional diver with 300m water resistance, helium escape valve and laser-etched wave dial.",
    "rating": 4.8,
    "reviewsCount": 15
  },
  {
    "id": "omega-seamaster-aqua-terra",
    "brandId": "omega",
    "brandName": "OMEGA",
    "name": "Seamaster",
    "model": "Aqua Terra",
    "reference": "220.10.41.21.02.001",
    "price": 890000,
    "compareAtPrice": null,
    "gender": "unisex",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Leather",
    "dialColor": "Silver",
    "caseSizeMm": 41,
    "waterResistance": "150m",
    "images": [
      "https://images.unsplash.com/photo-1623998021661-dc7555b2213d?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": true,
    "styles": [
      "Dress",
      "Classic"
    ],
    "tags": [
      "dress",
      "automatic"
    ],
    "description": "Teak-patterned dial, co-axial automatic movement and 150m water resistance — the everyday luxury watch.",
    "rating": 4.8,
    "reviewsCount": 9
  },
  {
    "id": "omega-constellation",
    "brandId": "omega",
    "brandName": "OMEGA",
    "name": "Constellation",
    "model": "Co-Axial 29mm",
    "reference": "131.20.29.20.55.001",
    "price": 750000,
    "compareAtPrice": null,
    "gender": "women",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel & Gold",
    "strapMaterial": "Stainless Steel",
    "dialColor": "White",
    "caseSizeMm": 29,
    "waterResistance": "50m",
    "images": [
      "https://images.unsplash.com/photo-1602268394804-6a31d350d862?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1751437774882-deeea4352018?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": true,
    "isBestSeller": false,
    "isLuxury": true,
    "styles": [
      "Elegant",
      "Classic"
    ],
    "tags": [
      "dress",
      "automatic"
    ],
    "description": "A refined ladies' Constellation with a white dial, gold accents and the signature claw bezel.",
    "rating": 4.8,
    "reviewsCount": 6
  },
  {
    "id": "tudor-black-bay-58",
    "brandId": "tudor",
    "brandName": "Tudor",
    "name": "Black Bay",
    "model": "58",
    "reference": "79030B",
    "price": 480000,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Stainless Steel",
    "dialColor": "Black",
    "caseSizeMm": 39,
    "waterResistance": "200m",
    "images": [
      "https://images.unsplash.com/photo-1639736922209-793b59a41572?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1642025425263-0127eeca3bc0?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": true,
    "isLuxury": true,
    "styles": [
      "Diver",
      "Sport"
    ],
    "tags": [
      "diver",
      "automatic"
    ],
    "description": "The modern diver's benchmark — 39mm case, gilt accents and in-house automatic movement.",
    "rating": 4.8,
    "reviewsCount": 11
  },
  {
    "id": "tudor-black-bay-chrono",
    "brandId": "tudor",
    "brandName": "Tudor",
    "name": "Black Bay",
    "model": "Chrono",
    "reference": "79360N",
    "price": 520000,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Fabric",
    "dialColor": "Black",
    "caseSizeMm": 41,
    "waterResistance": "200m",
    "images": [
      "https://images.unsplash.com/photo-1609587312208-cea54be969e7?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1657900791906-4b7e8bfcb0d7?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "Enquire",
    "isNew": true,
    "isBestSeller": false,
    "isLuxury": true,
    "styles": [
      "Chronograph",
      "Sport"
    ],
    "tags": [
      "chronograph",
      "automatic"
    ],
    "description": "A chronograph with genuine racing pedigree — column-wheel movement and snowflake hands.",
    "rating": 4.7,
    "reviewsCount": 5
  },
  {
    "id": "tag-heuer-carrera",
    "brandId": "tag-heuer",
    "brandName": "TAG Heuer",
    "name": "Carrera",
    "model": "Chronograph",
    "reference": "CBN2A1A",
    "price": 420000,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Stainless Steel",
    "dialColor": "Silver",
    "caseSizeMm": 42,
    "waterResistance": "100m",
    "images": [
      "https://images.unsplash.com/photo-1600003014637-ff82a275e191?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": true,
    "isLuxury": true,
    "styles": [
      "Chronograph",
      "Sport"
    ],
    "tags": [
      "chronograph",
      "automatic"
    ],
    "description": "Motorsport heritage in a modern package — a silver dial chronograph with 100m water resistance.",
    "rating": 4.7,
    "reviewsCount": 8
  },
  {
    "id": "tag-heuer-aquaracer",
    "brandId": "tag-heuer",
    "brandName": "TAG Heuer",
    "name": "Aquaracer",
    "model": "Professional 300",
    "reference": "WBP2110",
    "price": 380000,
    "compareAtPrice": 410000,
    "gender": "men",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Rubber",
    "dialColor": "Black",
    "caseSizeMm": 43,
    "waterResistance": "300m",
    "images": [
      "https://images.unsplash.com/photo-1595520407624-66b24f015830?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1659461278051-699550cc6aec?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": true,
    "styles": [
      "Diver",
      "Sport"
    ],
    "tags": [
      "diver",
      "automatic"
    ],
    "description": "A professional-grade diver with a black dial, rubber strap and 300m rating.",
    "rating": 4.6,
    "reviewsCount": 6
  },
  {
    "id": "longines-master-collection",
    "brandId": "longines",
    "brandName": "Longines",
    "name": "Master Collection",
    "model": "Chronograph",
    "reference": "L2.773.4",
    "price": 320000,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Leather",
    "dialColor": "Silver",
    "caseSizeMm": 40,
    "waterResistance": "30m",
    "images": [
      "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": true,
    "isLuxury": true,
    "styles": [
      "Dress",
      "Classic"
    ],
    "tags": [
      "dress",
      "chronograph",
      "automatic"
    ],
    "description": "Longines' signature — a silver barleycorn dial chronograph with blued steel hands.",
    "rating": 4.7,
    "reviewsCount": 9
  },
  {
    "id": "longines-conquest",
    "brandId": "longines",
    "brandName": "Longines",
    "name": "Conquest",
    "model": "Automatic",
    "reference": "L3.777.4",
    "price": 280000,
    "compareAtPrice": 310000,
    "gender": "men",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Leather",
    "dialColor": "Black",
    "caseSizeMm": 41,
    "waterResistance": "100m",
    "images": [
      "https://images.unsplash.com/photo-1548171916-c0dea7f94ca6?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1777457900943-7fd2f7c42529?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": true,
    "styles": [
      "Sport",
      "Classic"
    ],
    "tags": [
      "sport",
      "automatic"
    ],
    "description": "A versatile sports watch with 100m water resistance and classic lines.",
    "rating": 4.6,
    "reviewsCount": 5
  },
  {
    "id": "cartier-tank-must",
    "brandId": "cartier",
    "brandName": "Cartier",
    "name": "Tank",
    "model": "Must Large",
    "reference": "WSTA0041",
    "price": 780000,
    "compareAtPrice": null,
    "gender": "unisex",
    "movement": "Quartz",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Leather",
    "dialColor": "White",
    "caseSizeMm": 33,
    "waterResistance": "30m",
    "images": [
      "https://images.unsplash.com/photo-1786052348000-58d9171b9eee?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1772949400424-c64bfb7bdbd2?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "Enquire",
    "isNew": false,
    "isBestSeller": true,
    "isLuxury": true,
    "styles": [
      "Classic",
      "Elegant",
      "Minimal"
    ],
    "tags": [
      "dress"
    ],
    "description": "The definitive rectangular watch — Roman numerals, blue cabochon crown, timeless line.",
    "rating": 4.9,
    "reviewsCount": 7
  },
  {
    "id": "cartier-santos",
    "brandId": "cartier",
    "brandName": "Cartier",
    "name": "Santos",
    "model": "De Cartier",
    "reference": "WSSA0030",
    "price": 820000,
    "compareAtPrice": null,
    "gender": "unisex",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Stainless Steel",
    "dialColor": "Black",
    "caseSizeMm": 40,
    "waterResistance": "100m",
    "images": [
      "https://images.unsplash.com/photo-1772949399884-01ec45bc5763?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1670404160620-a3a86428560e?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "Enquire",
    "isNew": true,
    "isBestSeller": false,
    "isLuxury": true,
    "styles": [
      "Classic",
      "Statement"
    ],
    "tags": [
      "dress",
      "automatic"
    ],
    "description": "The watch that started it all in 1904 — square case, exposed screws, effortless presence.",
    "rating": 4.9,
    "reviewsCount": 4
  },
  {
    "id": "breitling-navitimer",
    "brandId": "breitling",
    "brandName": "Breitling",
    "name": "Navitimer",
    "model": "B01 43",
    "reference": "AB0138",
    "price": 560000,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Leather",
    "dialColor": "Black",
    "caseSizeMm": 43,
    "waterResistance": "30m",
    "images": [
      "https://images.unsplash.com/photo-1723561230205-3a8f566f8ba9?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1609587312208-cea54be969e7?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": true,
    "isBestSeller": false,
    "isLuxury": true,
    "styles": [
      "Chronograph",
      "Classic"
    ],
    "tags": [
      "chronograph",
      "automatic"
    ],
    "description": "The pilot's chronograph with the famous circular slide rule — an aviation legend.",
    "rating": 4.8,
    "reviewsCount": 6
  },
  {
    "id": "breitling-superocean",
    "brandId": "breitling",
    "brandName": "Breitling",
    "name": "Superocean",
    "model": "Automatic 42",
    "reference": "A17366",
    "price": 520000,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Rubber",
    "dialColor": "Black",
    "caseSizeMm": 42,
    "waterResistance": "500m",
    "images": [
      "https://images.unsplash.com/photo-1659461279680-a9cfd7e75bf4?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595520407624-66b24f015830?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": true,
    "styles": [
      "Diver",
      "Sport"
    ],
    "tags": [
      "diver",
      "automatic"
    ],
    "description": "500m of water resistance in a bold, professional dive package.",
    "rating": 4.7,
    "reviewsCount": 4
  },
  {
    "id": "grand-seiko-snowflake",
    "brandId": "grand-seiko",
    "brandName": "Grand Seiko",
    "name": "Snowflake",
    "model": "SBGA211",
    "reference": "SBGA211",
    "price": 520000,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Spring Drive",
    "caseMaterial": "Titanium",
    "strapMaterial": "Titanium",
    "dialColor": "White",
    "caseSizeMm": 41,
    "waterResistance": "100m",
    "images": [
      "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1657900785870-dd29fa61c84f?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "Low Stock",
    "isNew": true,
    "isBestSeller": true,
    "isLuxury": true,
    "styles": [
      "Dress",
      "Minimal"
    ],
    "tags": [
      "dress"
    ],
    "description": "The famous Snowflake — a hand-finished white dial over titanium, powered by Spring Drive.",
    "rating": 4.9,
    "reviewsCount": 10
  },
  {
    "id": "grand-seiko-heritage-gmt",
    "brandId": "grand-seiko",
    "brandName": "Grand Seiko",
    "name": "Heritage",
    "model": "GMT SBGM221",
    "reference": "SBGM221",
    "price": 460000,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Leather",
    "dialColor": "Ivory",
    "caseSizeMm": 39,
    "waterResistance": "30m",
    "images": [
      "https://images.unsplash.com/photo-1657900785870-dd29fa61c84f?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1682510306438-d2ead349aab3?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": true,
    "styles": [
      "Dress",
      "Classic"
    ],
    "tags": [
      "dress",
      "automatic"
    ],
    "description": "An ivory-dialled GMT dress watch with Zaratsu-polished case — understated perfection.",
    "rating": 4.8,
    "reviewsCount": 5
  },
  {
    "id": "seiko-presage-cocktail",
    "brandId": "seiko",
    "brandName": "Seiko",
    "name": "Presage",
    "model": "Cocktail Time",
    "reference": "SRPB41",
    "price": 42000,
    "compareAtPrice": null,
    "gender": "unisex",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Leather",
    "dialColor": "Blue",
    "caseSizeMm": 40,
    "waterResistance": "50m",
    "images": [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": true,
    "isLuxury": false,
    "styles": [
      "Dress",
      "Classic",
      "Elegant"
    ],
    "tags": [
      "dress",
      "automatic"
    ],
    "description": "A sunburst blue dial inspired by Tokyo cocktail bars — the best dress watch under ৳50,000.",
    "rating": 4.8,
    "reviewsCount": 18
  },
  {
    "id": "seiko-prospex-diver",
    "brandId": "seiko",
    "brandName": "Seiko",
    "name": "Prospex",
    "model": "Diver SRPD",
    "reference": "SRPD55K1",
    "price": 48000,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Stainless Steel",
    "dialColor": "Black",
    "caseSizeMm": 42,
    "waterResistance": "200m",
    "images": [
      "https://images.unsplash.com/photo-1633869699811-cd4f63049b36?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1659461278051-699550cc6aec?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": true,
    "isLuxury": false,
    "styles": [
      "Diver",
      "Sport"
    ],
    "tags": [
      "diver",
      "automatic"
    ],
    "description": "A 200m automatic diver with lume that lasts all night — the enthusiast's first choice.",
    "rating": 4.7,
    "reviewsCount": 14
  },
  {
    "id": "seiko-5-sports",
    "brandId": "seiko",
    "brandName": "Seiko",
    "name": "Seiko 5",
    "model": "Sports Automatic",
    "reference": "SRPE55K1",
    "price": 18500,
    "compareAtPrice": 21500,
    "gender": "men",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Stainless Steel",
    "dialColor": "Black",
    "caseSizeMm": 40,
    "waterResistance": "100m",
    "images": [
      "https://images.unsplash.com/photo-1659461278051-699550cc6aec?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1654527412602-9c47da3769df?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": true,
    "isLuxury": false,
    "styles": [
      "Sport",
      "Classic"
    ],
    "tags": [
      "sport",
      "automatic"
    ],
    "description": "The gateway automatic — 40mm case, 100m rating and legendary value.",
    "rating": 4.6,
    "reviewsCount": 22
  },
  {
    "id": "seiko-presage-cocktail-rose",
    "brandId": "seiko",
    "brandName": "Seiko",
    "name": "Presage",
    "model": "Cocktail Time Rose",
    "reference": "SRPE47J1",
    "price": 45000,
    "compareAtPrice": null,
    "gender": "women",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Leather",
    "dialColor": "Rose",
    "caseSizeMm": 34,
    "waterResistance": "50m",
    "images": [
      "https://images.unsplash.com/photo-1751437774882-deeea4352018?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1760532467646-b9e466403862?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": false,
    "styles": [
      "Elegant",
      "Classic",
      "Fashion"
    ],
    "tags": [
      "dress",
      "automatic"
    ],
    "description": "A 34mm rose-dial Presage with a textured \"cocktail\" dial — refined and distinctly feminine.",
    "rating": 4.7,
    "reviewsCount": 7
  },
  {
    "id": "seiko-astron-gps",
    "brandId": "seiko",
    "brandName": "Seiko",
    "name": "Astron",
    "model": "GPS Solar",
    "reference": "SSH093J1",
    "price": 118000,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Solar GPS",
    "caseMaterial": "Titanium",
    "strapMaterial": "Titanium",
    "dialColor": "Blue",
    "caseSizeMm": 40,
    "waterResistance": "100m",
    "images": [
      "https://images.unsplash.com/photo-1777457900943-7fd2f7c42529?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1657900791906-4b7e8bfcb0d7?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": true,
    "isBestSeller": false,
    "isLuxury": false,
    "styles": [
      "Sport",
      "Classic"
    ],
    "tags": [
      "sport",
      "solar"
    ],
    "description": "GPS time correction anywhere on Earth, powered by light — Seiko's technological flagship.",
    "rating": 4.6,
    "reviewsCount": 4
  },
  {
    "id": "tissot-prx-powermatic",
    "brandId": "tissot",
    "brandName": "Tissot",
    "name": "PRX",
    "model": "Powermatic 80",
    "reference": "T137.407.11.041.00",
    "price": 78000,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Stainless Steel",
    "dialColor": "Blue",
    "caseSizeMm": 40,
    "waterResistance": "100m",
    "images": [
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": true,
    "isBestSeller": true,
    "isLuxury": false,
    "styles": [
      "Sport",
      "Classic",
      "Dress"
    ],
    "tags": [
      "sport",
      "automatic"
    ],
    "description": "The integrated-bracelet phenomenon — 80-hour power reserve and vintage 1978 charm.",
    "rating": 4.8,
    "reviewsCount": 16
  },
  {
    "id": "tissot-le-locle",
    "brandId": "tissot",
    "brandName": "Tissot",
    "name": "Le Locle",
    "model": "Powermatic 80",
    "reference": "T006.407.11.033.00",
    "price": 62000,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Leather",
    "dialColor": "Silver",
    "caseSizeMm": 39,
    "waterResistance": "30m",
    "images": [
      "https://images.unsplash.com/photo-1700762118431-ee3a19c75ebc?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548171916-c0dea7f94ca6?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": false,
    "styles": [
      "Dress",
      "Classic"
    ],
    "tags": [
      "dress",
      "automatic"
    ],
    "description": "Named after Tissot's home town — a guilloché silver dial and leaf hands, pure Swiss classicism.",
    "rating": 4.6,
    "reviewsCount": 8
  },
  {
    "id": "tissot-gentleman",
    "brandId": "tissot",
    "brandName": "Tissot",
    "name": "Gentleman",
    "model": "Powermatic 80",
    "reference": "T127.407.11.031.00",
    "price": 68000,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Stainless Steel",
    "dialColor": "Blue",
    "caseSizeMm": 40,
    "waterResistance": "100m",
    "images": [
      "https://images.unsplash.com/photo-1657900791906-4b7e8bfcb0d7?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1777457900943-7fd2f7c42529?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": false,
    "styles": [
      "Dress",
      "Classic"
    ],
    "tags": [
      "dress",
      "automatic"
    ],
    "description": "A versatile everyday automatic — dress it up or down, it never looks out of place.",
    "rating": 4.6,
    "reviewsCount": 6
  },
  {
    "id": "tissot-pr100-lady",
    "brandId": "tissot",
    "brandName": "Tissot",
    "name": "PR 100",
    "model": "Lady",
    "reference": "T101.910.11.036.00",
    "price": 45000,
    "compareAtPrice": 52000,
    "gender": "women",
    "movement": "Quartz",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Mesh",
    "dialColor": "Silver",
    "caseSizeMm": 36,
    "waterResistance": "100m",
    "images": [
      "https://images.unsplash.com/photo-1760532467646-b9e466403862?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506193095-80bc749473f2?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": false,
    "styles": [
      "Elegant",
      "Classic",
      "Minimal"
    ],
    "tags": [
      "dress"
    ],
    "description": "A refined 36mm ladies' quartz with a sleek mesh bracelet and 100m water resistance.",
    "rating": 4.5,
    "reviewsCount": 5
  },
  {
    "id": "citizen-tsuyosa",
    "brandId": "citizen",
    "brandName": "Citizen",
    "name": "Tsuyosa",
    "model": "Automatic",
    "reference": "NJ0150-81E",
    "price": 36000,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Stainless Steel",
    "dialColor": "Black",
    "caseSizeMm": 40,
    "waterResistance": "50m",
    "images": [
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": true,
    "isBestSeller": true,
    "isLuxury": false,
    "styles": [
      "Dress",
      "Classic"
    ],
    "tags": [
      "dress",
      "automatic"
    ],
    "description": "Citizen's integrated-bracelet automatic — the best-value everyday watch in its class.",
    "rating": 4.7,
    "reviewsCount": 12
  },
  {
    "id": "citizen-promaster-diver",
    "brandId": "citizen",
    "brandName": "Citizen",
    "name": "Promaster",
    "model": "Diver Eco-Drive",
    "reference": "BN0151-09L",
    "price": 42000,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Eco-Drive (Solar)",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Rubber",
    "dialColor": "Blue",
    "caseSizeMm": 44,
    "waterResistance": "200m",
    "images": [
      "https://images.unsplash.com/photo-1654527412602-9c47da3769df?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1633869699811-cd4f63049b36?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": false,
    "styles": [
      "Diver",
      "Sport"
    ],
    "tags": [
      "diver",
      "solar"
    ],
    "description": "An ISO-certified 200m diver powered by any light — no battery changes, ever.",
    "rating": 4.6,
    "reviewsCount": 9
  },
  {
    "id": "citizen-eco-drive-classic",
    "brandId": "citizen",
    "brandName": "Citizen",
    "name": "Eco-Drive",
    "model": "Classic",
    "reference": "BM7431-51L",
    "price": 28000,
    "compareAtPrice": 32000,
    "gender": "unisex",
    "movement": "Eco-Drive (Solar)",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Leather",
    "dialColor": "Gold",
    "caseSizeMm": 38,
    "waterResistance": "50m",
    "images": [
      "https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": false,
    "styles": [
      "Classic",
      "Elegant"
    ],
    "tags": [
      "dress",
      "solar"
    ],
    "description": "A slim, light-powered classic in gold tone — effortless and dependable.",
    "rating": 4.5,
    "reviewsCount": 7
  },
  {
    "id": "orient-bambino",
    "brandId": "orient",
    "brandName": "Orient",
    "name": "Bambino",
    "model": "Version 2",
    "reference": "FAC00009N0",
    "price": 22500,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Leather",
    "dialColor": "White",
    "caseSizeMm": 40,
    "waterResistance": "30m",
    "images": [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548171916-c0dea7f94ca6?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": true,
    "isLuxury": false,
    "styles": [
      "Dress",
      "Classic"
    ],
    "tags": [
      "dress",
      "automatic"
    ],
    "description": "The beloved entry-level automatic dress watch — domed crystal, vintage proportions.",
    "rating": 4.7,
    "reviewsCount": 19
  },
  {
    "id": "orient-kamasu",
    "brandId": "orient",
    "brandName": "Orient",
    "name": "Kamasu",
    "model": "Diver",
    "reference": "RA-AA0001B19B",
    "price": 24500,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Stainless Steel",
    "dialColor": "Red",
    "caseSizeMm": 41,
    "waterResistance": "200m",
    "images": [
      "https://images.unsplash.com/photo-1659461278051-699550cc6aec?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1633869699811-cd4f63049b36?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": false,
    "styles": [
      "Diver",
      "Sport"
    ],
    "tags": [
      "diver",
      "automatic"
    ],
    "description": "Sapphire crystal, in-house movement, 200m rating — unbeatable at this price.",
    "rating": 4.6,
    "reviewsCount": 11
  },
  {
    "id": "orient-sun-and-moon",
    "brandId": "orient",
    "brandName": "Orient",
    "name": "Sun & Moon",
    "model": "Version 4",
    "reference": "RA-AK0304N10B",
    "price": 26000,
    "compareAtPrice": null,
    "gender": "unisex",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Leather",
    "dialColor": "White",
    "caseSizeMm": 42,
    "waterResistance": "50m",
    "images": [
      "https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1700762118431-ee3a19c75ebc?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": false,
    "styles": [
      "Classic",
      "Dress"
    ],
    "tags": [
      "dress",
      "automatic"
    ],
    "description": "A poetic day/night indicator over a guilloché dial — Orient's most charming complication.",
    "rating": 4.6,
    "reviewsCount": 8
  },
  {
    "id": "hamilton-khaki-field",
    "brandId": "hamilton",
    "brandName": "Hamilton",
    "name": "Khaki Field",
    "model": "Automatic 38mm",
    "reference": "H70455533",
    "price": 68000,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Leather",
    "dialColor": "Black",
    "caseSizeMm": 38,
    "waterResistance": "100m",
    "images": [
      "https://images.unsplash.com/photo-1700130007227-92e7040d22b7?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1642025425263-0127eeca3bc0?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": true,
    "isBestSeller": false,
    "isLuxury": false,
    "styles": [
      "Sport",
      "Classic"
    ],
    "tags": [
      "field",
      "automatic"
    ],
    "description": "The original military field watch — legible, rugged and endlessly versatile.",
    "rating": 4.7,
    "reviewsCount": 6
  },
  {
    "id": "hamilton-jazzmaster",
    "brandId": "hamilton",
    "brandName": "Hamilton",
    "name": "Jazzmaster",
    "model": "Viewmatic",
    "reference": "H32515555",
    "price": 75000,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Leather",
    "dialColor": "Silver",
    "caseSizeMm": 40,
    "waterResistance": "50m",
    "images": [
      "https://images.unsplash.com/photo-1642025421684-7881ee163b59?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1682510306438-d2ead349aab3?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": false,
    "styles": [
      "Dress",
      "Classic"
    ],
    "tags": [
      "dress",
      "automatic"
    ],
    "description": "Smooth jazz in watch form — a silver guilloché dial under a sapphire crystal.",
    "rating": 4.6,
    "reviewsCount": 4
  },
  {
    "id": "rado-captain-cook",
    "brandId": "rado",
    "brandName": "Rado",
    "name": "Captain Cook",
    "model": "Automatic",
    "reference": "R32500303",
    "price": 260000,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Automatic",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Leather",
    "dialColor": "Green",
    "caseSizeMm": 42,
    "waterResistance": "300m",
    "images": [
      "https://images.unsplash.com/photo-1682510306438-d2ead349aab3?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1633869699811-cd4f63049b36?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": true,
    "styles": [
      "Diver",
      "Sport"
    ],
    "tags": [
      "diver",
      "automatic"
    ],
    "description": "A green-dial dive icon reborn with modern materials and 300m capability.",
    "rating": 4.7,
    "reviewsCount": 5
  },
  {
    "id": "rado-true-square",
    "brandId": "rado",
    "brandName": "Rado",
    "name": "True Square",
    "model": "Open Heart",
    "reference": "R27073702",
    "price": 240000,
    "compareAtPrice": null,
    "gender": "unisex",
    "movement": "Automatic",
    "caseMaterial": "High-Tech Ceramic",
    "strapMaterial": "Ceramic",
    "dialColor": "Black",
    "caseSizeMm": 38,
    "waterResistance": "50m",
    "images": [
      "https://images.unsplash.com/photo-1642025421684-7881ee163b59?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": true,
    "isBestSeller": false,
    "isLuxury": true,
    "styles": [
      "Minimal",
      "Statement"
    ],
    "tags": [
      "dress",
      "automatic"
    ],
    "description": "A monobloc ceramic square case with an open-heart dial — architecture for the wrist.",
    "rating": 4.6,
    "reviewsCount": 3
  },
  {
    "id": "casio-vintage-a168",
    "brandId": "casio",
    "brandName": "Casio",
    "name": "Vintage",
    "model": "A168",
    "reference": "A168WA-1",
    "price": 3200,
    "compareAtPrice": null,
    "gender": "unisex",
    "movement": "Quartz Digital",
    "caseMaterial": "Resin",
    "strapMaterial": "Stainless Steel",
    "dialColor": "Digital",
    "caseSizeMm": 36,
    "waterResistance": "Water Resistant",
    "images": [
      "https://images.unsplash.com/photo-1630452561211-f2914f5a2f68?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605583972719-30bd2ca0705a?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": true,
    "isLuxury": false,
    "styles": [
      "Classic",
      "Minimal"
    ],
    "tags": [
      "digital"
    ],
    "description": "The retro icon — a digital classic with an electro-luminescent backlight.",
    "rating": 4.7,
    "reviewsCount": 25
  },
  {
    "id": "casio-edifice",
    "brandId": "casio",
    "brandName": "Casio",
    "name": "Edifice",
    "model": "Chronograph",
    "reference": "EFR-S108D",
    "price": 14500,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Quartz",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Stainless Steel",
    "dialColor": "Blue",
    "caseSizeMm": 42,
    "waterResistance": "100m",
    "images": [
      "https://images.unsplash.com/photo-1605583972719-30bd2ca0705a?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595520407624-66b24f015830?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": false,
    "styles": [
      "Sport",
      "Classic"
    ],
    "tags": [
      "chronograph",
      "sport"
    ],
    "description": "Slim, sharp and sapphire-crystalled — Casio's motorsport-inspired line.",
    "rating": 4.5,
    "reviewsCount": 9
  },
  {
    "id": "casio-vintage-gold",
    "brandId": "casio",
    "brandName": "Casio",
    "name": "Vintage",
    "model": "Gold A168",
    "reference": "A168WG-9",
    "price": 3500,
    "compareAtPrice": 4500,
    "gender": "unisex",
    "movement": "Quartz Digital",
    "caseMaterial": "Resin",
    "strapMaterial": "Stainless Steel",
    "dialColor": "Digital",
    "caseSizeMm": 36,
    "waterResistance": "Water Resistant",
    "images": [
      "https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630452561211-f2914f5a2f68?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": false,
    "styles": [
      "Fashion",
      "Statement"
    ],
    "tags": [
      "digital"
    ],
    "description": "The gold-tone classic that became a fashion statement — retro in the best way.",
    "rating": 4.6,
    "reviewsCount": 13
  },
  {
    "id": "gshock-ga2100-casioak",
    "brandId": "g-shock",
    "brandName": "G-SHOCK",
    "name": "GA-2100",
    "model": "\"CasiOak\"",
    "reference": "GA-2100-1A1",
    "price": 18500,
    "compareAtPrice": null,
    "gender": "unisex",
    "movement": "Quartz",
    "caseMaterial": "Carbon Core Guard Resin",
    "strapMaterial": "Resin",
    "dialColor": "Black",
    "caseSizeMm": 45,
    "waterResistance": "200m",
    "images": [
      "https://images.unsplash.com/photo-1543956872-37cfc5474a71?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576420469977-7275a9dc1ccc?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": true,
    "isBestSeller": true,
    "isLuxury": false,
    "styles": [
      "Sport",
      "Statement"
    ],
    "tags": [
      "sport",
      "digital"
    ],
    "description": "The \"CasiOak\" — octagonal bezel, carbon core, and slim 11.8mm profile.",
    "rating": 4.8,
    "reviewsCount": 20
  },
  {
    "id": "gshock-dw5600",
    "brandId": "g-shock",
    "brandName": "G-SHOCK",
    "name": "DW-5600",
    "model": "Classic",
    "reference": "DW-5600E-1",
    "price": 12500,
    "compareAtPrice": null,
    "gender": "unisex",
    "movement": "Quartz Digital",
    "caseMaterial": "Resin",
    "strapMaterial": "Resin",
    "dialColor": "Digital",
    "caseSizeMm": 43,
    "waterResistance": "200m",
    "images": [
      "https://images.unsplash.com/photo-1605583972719-30bd2ca0705a?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630452561211-f2914f5a2f68?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": true,
    "isLuxury": false,
    "styles": [
      "Sport",
      "Classic"
    ],
    "tags": [
      "sport",
      "digital"
    ],
    "description": "The original 1983 square — the definitive G-SHOCK and a design icon.",
    "rating": 4.8,
    "reviewsCount": 17
  },
  {
    "id": "gshock-mudmaster",
    "brandId": "g-shock",
    "brandName": "G-SHOCK",
    "name": "Mudmaster",
    "model": "GG-B100",
    "reference": "GG-B100-1A3",
    "price": 42000,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Quartz",
    "caseMaterial": "Carbon Core Guard Resin",
    "strapMaterial": "Resin",
    "dialColor": "Black",
    "caseSizeMm": 55,
    "waterResistance": "200m",
    "images": [
      "https://images.unsplash.com/photo-1576420469891-b303889e81bf?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1700130007227-92e7040d22b7?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "Low Stock",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": false,
    "styles": [
      "Sport",
      "Statement"
    ],
    "tags": [
      "sport",
      "digital",
      "field"
    ],
    "description": "Mud-resistant, shock-proof, built for the wildest environments on Earth.",
    "rating": 4.7,
    "reviewsCount": 8
  },
  {
    "id": "gshock-gma-s2100",
    "brandId": "g-shock",
    "brandName": "G-SHOCK",
    "name": "GMA-S2100",
    "model": "\"CasiOak\" S",
    "reference": "GMA-S2100-7A",
    "price": 17500,
    "compareAtPrice": null,
    "gender": "women",
    "movement": "Quartz",
    "caseMaterial": "Carbon Core Guard Resin",
    "strapMaterial": "Resin",
    "dialColor": "White",
    "caseSizeMm": 42,
    "waterResistance": "200m",
    "images": [
      "https://images.unsplash.com/photo-1759166447139-b816226ca312?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576420469977-7275a9dc1ccc?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": true,
    "isBestSeller": false,
    "isLuxury": false,
    "styles": [
      "Sport",
      "Fashion",
      "Statement"
    ],
    "tags": [
      "sport",
      "digital"
    ],
    "description": "The compact CasiOak in white — full G-SHOCK toughness in a smaller frame.",
    "rating": 4.6,
    "reviewsCount": 6
  },
  {
    "id": "fossil-grant-chronograph",
    "brandId": "fossil",
    "brandName": "Fossil",
    "name": "Grant",
    "model": "Chronograph",
    "reference": "FS5151",
    "price": 16500,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Quartz",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Leather",
    "dialColor": "Brown",
    "caseSizeMm": 44,
    "waterResistance": "50m",
    "images": [
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": false,
    "styles": [
      "Chronograph",
      "Classic"
    ],
    "tags": [
      "chronograph",
      "dress"
    ],
    "description": "Fossil's signature chronograph — Roman numerals, brown leather, everyday character.",
    "rating": 4.5,
    "reviewsCount": 10
  },
  {
    "id": "fossil-minimalist",
    "brandId": "fossil",
    "brandName": "Fossil",
    "name": "Minimalist",
    "model": "FS5453",
    "reference": "FS5453",
    "price": 14500,
    "compareAtPrice": 16500,
    "gender": "unisex",
    "movement": "Quartz",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Leather",
    "dialColor": "White",
    "caseSizeMm": 44,
    "waterResistance": "50m",
    "images": [
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1723561230205-3a8f566f8ba9?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": true,
    "isLuxury": false,
    "styles": [
      "Minimal",
      "Classic"
    ],
    "tags": [
      "dress"
    ],
    "description": "Clean lines, slim case, zero clutter — minimalism done right.",
    "rating": 4.5,
    "reviewsCount": 14
  },
  {
    "id": "fossil-carlie",
    "brandId": "fossil",
    "brandName": "Fossil",
    "name": "Carlie",
    "model": "Mini",
    "reference": "ES4446",
    "price": 15500,
    "compareAtPrice": null,
    "gender": "women",
    "movement": "Quartz",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Stainless Steel",
    "dialColor": "White",
    "caseSizeMm": 28,
    "waterResistance": "30m",
    "images": [
      "https://images.unsplash.com/photo-1728759440467-d710b7073761?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506193095-80bc749473f2?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": false,
    "styles": [
      "Elegant",
      "Fashion",
      "Minimal"
    ],
    "tags": [
      "dress"
    ],
    "description": "A delicate 28mm ladies' piece with a mother-of-pearl-style dial.",
    "rating": 4.4,
    "reviewsCount": 8
  },
  {
    "id": "michael-kors-bradshaw",
    "brandId": "michael-kors",
    "brandName": "Michael Kors",
    "name": "Bradshaw",
    "model": "Rose Gold",
    "reference": "MK5896",
    "price": 24500,
    "compareAtPrice": null,
    "gender": "women",
    "movement": "Quartz",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Stainless Steel",
    "dialColor": "Rose Gold",
    "caseSizeMm": 43,
    "waterResistance": "100m",
    "images": [
      "https://images.unsplash.com/photo-1772949399823-dcd1678fcce7?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1772949399808-7020b02896b9?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": true,
    "isLuxury": false,
    "styles": [
      "Fashion",
      "Statement",
      "Elegant"
    ],
    "tags": [
      "fashion"
    ],
    "description": "Runway glamour with chronograph function — Michael Kors' most loved silhouette.",
    "rating": 4.6,
    "reviewsCount": 11
  },
  {
    "id": "michael-kors-pyper",
    "brandId": "michael-kors",
    "brandName": "Michael Kors",
    "name": "Pyper",
    "model": "Gold",
    "reference": "MK2895",
    "price": 22500,
    "compareAtPrice": null,
    "gender": "women",
    "movement": "Quartz",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Stainless Steel",
    "dialColor": "Gold",
    "caseSizeMm": 38,
    "waterResistance": "50m",
    "images": [
      "https://images.unsplash.com/photo-1772949399808-7020b02896b9?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1751437774882-deeea4352018?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": false,
    "styles": [
      "Fashion",
      "Minimal",
      "Elegant"
    ],
    "tags": [
      "fashion"
    ],
    "description": "A sleek gold-tone three-hand with a clean dial — effortless everyday glamour.",
    "rating": 4.5,
    "reviewsCount": 7
  },
  {
    "id": "emporio-armani-ar1954",
    "brandId": "emporio-armani",
    "brandName": "Emporio Armani",
    "name": "Classic",
    "model": "AR1954",
    "reference": "AR1954",
    "price": 26500,
    "compareAtPrice": null,
    "gender": "men",
    "movement": "Quartz",
    "caseMaterial": "Stainless Steel",
    "strapMaterial": "Leather",
    "dialColor": "Gold",
    "caseSizeMm": 43,
    "waterResistance": "50m",
    "images": [
      "https://images.unsplash.com/photo-1772949400424-c64bfb7bdbd2?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602268394804-6a31d350d862?q=80&w=900&auto=format&fit=crop"
    ],
    "availability": "In Stock",
    "isNew": false,
    "isBestSeller": false,
    "isLuxury": false,
    "styles": [
      "Dress",
      "Fashion"
    ],
    "tags": [
      "dress",
      "fashion"
    ],
    "description": "Italian tailoring for the wrist — gold tone, black dial, quiet confidence.",
    "rating": 4.5,
    "reviewsCount": 5
  }
];

export const NEW_ARRIVALS: WatchProduct[] = ALL_PRODUCTS.filter(p => p.isNew || p.isBestSeller).slice(0, 16);

export const UPCOMING_WATCHES: UpcomingWatch[] = [
  {
    "id": "upc-rolex-gmt-pepsi",
    "brand": "Rolex",
    "model": "GMT-Master II Pepsi Jubilee",
    "reference": "126710BLRO",
    "expectedArrival": "Arriving End of This Month",
    "statusBadge": "In Transit",
    "estimatedPriceBDT": 2350000,
    "movement": "Rolex Calibre 3285 Automatic",
    "caseSize": "40mm",
    "dialColor": "Black Dial with Red/Blue Cerachrom Bezel",
    "description": "The quintessential dual time-zone pilot icon. Featuring red and blue Cerachrom ceramic bezel and five-link Jubilee bracelet. Full set with box and papers.",
    "image": "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=900&auto=format&fit=crop",
    "keyFeature": "Bidirectional 24-hr Cerachrom bezel & 70-hr power reserve"
  },
  {
    "id": "upc-patek-aquanaut",
    "brand": "Patek Philippe",
    "model": "Aquanaut Extra Flat",
    "reference": "5167A-001",
    "expectedArrival": "Arriving in 2 Weeks",
    "statusBadge": "Arriving Soon",
    "estimatedPriceBDT": 6200000,
    "movement": "Calibre 26-330 S C Self-winding",
    "caseSize": "40.8mm",
    "dialColor": "Embossed Black Dial",
    "description": "Modern, sporty elegance inspired by the Nautilus. High-grade stainless steel case paired with composite tropical black strap and sapphire crystal exhibition caseback.",
    "image": "https://images.unsplash.com/photo-1697866226888-bc6980506420?q=80&w=900&auto=format&fit=crop",
    "keyFeature": "120m water resistant sports luxury icon"
  },
  {
    "id": "upc-omega-snoopy",
    "brand": "OMEGA",
    "model": "Speedmaster Silver Snoopy Award 50th Anniv.",
    "reference": "310.32.42.50.02.001",
    "expectedArrival": "Batch Allocation in 3 Weeks",
    "statusBadge": "Pre-Booking Open",
    "estimatedPriceBDT": 1850000,
    "movement": "Co-Axial Master Chronometer Calibre 3861",
    "caseSize": "42mm",
    "dialColor": "Silver with Blue Subdials & Ag/Blue Bezel",
    "description": "One of the most sought-after modern Speedmasters. Features an animated caseback with Snoopy travelling in the command and service module over the Moon.",
    "image": "https://images.unsplash.com/photo-1636639818651-d97365346a5c?q=80&w=900&auto=format&fit=crop",
    "keyFeature": "Photorealistic Earth disc rotating per minute on caseback"
  },
  {
    "id": "upc-ap-royal-oak",
    "brand": "Audemars Piguet",
    "model": "Royal Oak Selfwinding 41mm",
    "reference": "15500ST.OO.1220ST.01",
    "expectedArrival": "Next Month Allocation",
    "statusBadge": "Pre-Booking Open",
    "estimatedPriceBDT": 4800000,
    "movement": "Manufacture Calibre 4302 Automatic",
    "caseSize": "41mm",
    "dialColor": "Blue Grande Tapisserie Dial",
    "description": "The iconic octagonal bezel with exposed hexagonal white gold screws. Signature integrated bracelet and blue Grande Tapisserie dial.",
    "image": "https://images.unsplash.com/photo-1670404160620-a3a86428560e?q=80&w=900&auto=format&fit=crop",
    "keyFeature": "Integrated bracelet & 70-hour power reserve"
  },
  {
    "id": "upc-tissot-prx-chrono",
    "brand": "Tissot",
    "model": "PRX Automatic Chronograph Valjoux",
    "reference": "T137.427.11.011.00",
    "expectedArrival": "In Transit from Switzerland",
    "statusBadge": "In Transit",
    "estimatedPriceBDT": 195000,
    "movement": "Valjoux A05.H31 Automatic",
    "caseSize": "42mm",
    "dialColor": "Panda Dial (White / Blue Subdials)",
    "description": "Classic 1970s sports chronograph design powered by the robust Valjoux calibre with a 60-hour extended power reserve.",
    "image": "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=900&auto=format&fit=crop",
    "keyFeature": "Panda dial chronograph with integrated steel bracelet"
  },
  {
    "id": "upc-seiko-prospex-diver",
    "brand": "Seiko",
    "model": "Prospex 1965 Heritage Diver Special Edition",
    "reference": "SPB143J1",
    "expectedArrival": "Arriving This Week",
    "statusBadge": "Arriving Soon",
    "estimatedPriceBDT": 125000,
    "movement": "Calibre 6R35 Automatic (70hr Reserve)",
    "caseSize": "40.5mm",
    "dialColor": "Sunburst Charcoal Grey",
    "description": "A modern re-interpretation of Japan first dive watch from 1965. Curved sapphire crystal, DiaShield hard coating, and 200m ISO water resistance.",
    "image": "https://images.unsplash.com/photo-1633869699811-cd4f63049b36?q=80&w=900&auto=format&fit=crop",
    "keyFeature": "70-hour power reserve & LumiBrite indices"
  }
];

export const DELIVERED_WATCHES: DeliveredWatch[] = [
  {
    "id": "del-1",
    "brand": "Rolex",
    "model": "Submariner Date 41mm Oystersteel",
    "reference": "126610LN",
    "soldPriceBDT": 1450000,
    "deliveryLocation": "Gulshan-2, Dhaka",
    "deliveredDate": "Delivered Recently",
    "image": "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=900&auto=format&fit=crop",
    "clientName": "Tahmid R. Chowdhury",
    "clientReview": "Acquired this Submariner Date from Goodtime Watch SG. The piece was 100% brand new in box with green seal and stamped warranty card. Prompt direct delivery right to my residence in Gulshan. Outstanding professionalism.",
    "rating": 5,
    "verifiedPurchase": true
  },
  {
    "id": "del-2",
    "brand": "OMEGA",
    "model": "Speedmaster Professional Moonwatch",
    "reference": "310.30.42.50.01.001",
    "soldPriceBDT": 1050000,
    "deliveryLocation": "Banani, Dhaka",
    "deliveredDate": "Delivered Recently",
    "image": "https://images.unsplash.com/photo-1636639818651-d97365346a5c?q=80&w=900&auto=format&fit=crop",
    "clientName": "Saiful Islam",
    "clientReview": "Had been looking for the new Master Chronometer Moonwatch for months. Goodtime Watch SG confirmed availability and delivered it within 24 hours. The condition is pristine. Highly recommended watch source in Bangladesh!",
    "rating": 5,
    "verifiedPurchase": true
  },
  {
    "id": "del-3",
    "brand": "Tudor",
    "model": "Black Bay 58 Gilt Dial",
    "reference": "79030B",
    "soldPriceBDT": 480000,
    "deliveryLocation": "Nasirabad, Chattogram",
    "deliveredDate": "Delivered Recently",
    "image": "https://images.unsplash.com/photo-1639736922209-793b59a41572?q=80&w=900&auto=format&fit=crop",
    "clientName": "Barrister Rafiqul Alam",
    "clientReview": "Purchased through their WhatsApp concierge and shipped safely via secured insured courier to Chattogram. Unboxing was an absolute pleasure. Everything matched the photos and serial number verified.",
    "rating": 5,
    "verifiedPurchase": true
  },
  {
    "id": "del-4",
    "brand": "Cartier",
    "model": "Santos De Cartier Large Model",
    "reference": "WSSA0030",
    "soldPriceBDT": 820000,
    "deliveryLocation": "Dhanmondi, Dhaka",
    "deliveredDate": "Delivered Recently",
    "image": "https://images.unsplash.com/photo-1772949399884-01ec45bc5763?q=80&w=900&auto=format&fit=crop",
    "clientName": "Nafis Mahmud",
    "clientReview": "Exchanged an older chronograph and upgraded to the Santos De Cartier. The valuation of my trade-in watch was very fair and transparent, and the difference was easily settled. Seamless service!",
    "rating": 5,
    "verifiedPurchase": true
  },
  {
    "id": "del-5",
    "brand": "Grand Seiko",
    "model": "Snowflake Titanium Spring Drive",
    "reference": "SBGA211",
    "soldPriceBDT": 520000,
    "deliveryLocation": "Uttara, Dhaka",
    "deliveredDate": "Delivered Recently",
    "image": "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?q=80&w=900&auto=format&fit=crop",
    "clientName": "Dr. K. Zaman",
    "clientReview": "The sweeping blue seconds hand on the Snowflake is pure poetry. Watch was presented in its original double box with all Japanese documentation. Trustworthy and reliable luxury horology partner.",
    "rating": 5,
    "verifiedPurchase": true
  },
  {
    "id": "del-6",
    "brand": "Seiko",
    "model": "Presage Cocktail Time Blue Sunburst",
    "reference": "SRPB41",
    "soldPriceBDT": 42000,
    "deliveryLocation": "Sylhet Sadar",
    "deliveredDate": "Delivered Recently",
    "image": "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=900&auto=format&fit=crop",
    "clientName": "Tanvir Ahmed",
    "clientReview": "Super fast response on WhatsApp. Verified the serial number, received authentic warranty booklet and delivery took only 2 days to Sylhet. Will definitely buy my next automatic watch from here.",
    "rating": 5,
    "verifiedPurchase": true
  }
];
