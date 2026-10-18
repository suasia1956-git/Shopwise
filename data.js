export const products = [
  {id:1,name:"Wireless Headphones",category:"Electronics",price:2499,rating:4.5,icon:"🎧",color:"#dbe7ff",desc:"Over-ear Bluetooth headphones with 30-hour battery life."},
  {id:2,name:"Smart Watch",category:"Electronics",price:3999,rating:4.3,icon:"⌚",color:"#e3f6ec",desc:"Tracks steps, heart rate and sleep with a bright AMOLED display."},
  {id:3,name:"Mechanical Keyboard",category:"Electronics",price:3299,rating:4.7,icon:"⌨️",color:"#ece3ff",desc:"Hot-swappable switches and a compact 75% layout."},
  {id:4,name:"Running Shoes",category:"Fashion",price:2799,rating:4.4,icon:"👟",color:"#ffe8d9",desc:"Lightweight breathable shoes with extra cushioning."},
  {id:5,name:"Backpack",category:"Fashion",price:1499,rating:4.2,icon:"🎒",color:"#fff3cf",desc:"Water-resistant 25L backpack with a padded laptop sleeve."},
  {id:6,name:"Sunglasses",category:"Fashion",price:999,rating:4.0,icon:"🕶️",color:"#e1f1ff",desc:"UV400 polarized lenses in a durable frame."},
  {id:7,name:"Coffee Maker",category:"Home",price:4599,rating:4.6,icon:"☕",color:"#f1e5da",desc:"Programmable drip coffee maker with a thermal carafe."},
  {id:8,name:"Desk Lamp",category:"Home",price:1199,rating:4.1,icon:"💡",color:"#fff7c9",desc:"LED lamp with adjustable brightness and warm/cool modes."},
  {id:9,name:"Yoga Mat",category:"Fitness",price:899,rating:4.5,icon:"🧘",color:"#dff5e8",desc:"Non-slip 6mm mat that is easy to roll up and carry."},
  {id:10,name:"Dumbbell Set",category:"Fitness",price:3499,rating:4.4,icon:"🏋️",color:"#e6e9f2",desc:"Adjustable dumbbells from 2 to 20 kg."},
  {id:11,name:"Water Bottle",category:"Fitness",price:599,rating:4.6,icon:"🧴",color:"#d9f1f7",desc:"Insulated steel bottle that keeps drinks cold for 24 hours."},
  {id:12,name:"Bluetooth Speaker",category:"Electronics",price:1899,rating:4.3,icon:"🔊",color:"#fde1ec",desc:"Portable waterproof speaker with deep bass."}
];
export const categories = ["All", ...new Set(products.map(p => p.category))];
