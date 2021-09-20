function Validate(good) {
    if (typeof good.item !== "string" || typeof good.type !== "string") {
        return false;
    }
	weightOrquantity = "weight" in good ? "weight" : "quantity";
	if (typeof good[weightOrquantity] !== "number" ) {
        return false;
    }
	pricePerKiloOrquantity = "pricePerKilo" in good ? "pricePerKilo" : "pricePerItem";
	if (good[pricePerKiloOrquantity].slice(0,1) != "$" || isNaN(Number(good[pricePerKiloOrquantity].slice(1).replace(',', '.')))) {
		return false;
	}
}

function ShopStocktaking(goods) {
    quantity = 0;
    weight = 0;
    CheapestOrange = 0;
    type = "";
    costApples = 0;
    costPineapples = 0;
    costWatermelons = 0;
    costOranges = 0;

    for (var i = 0; i < goods.length; i++) {
		Validate(goods[i]);
        if (goods[i].item == "watermelon") {
            quantity = quantity + goods[i].quantity;
            costWatermelons = costWatermelons + Number(goods[i].pricePerItem.slice(1).replace(',', '.')) * goods[i].quantity;
        }

        if (goods[i].item == "pineapple") {
            costPineapples = costPineapples + Number(goods[i].pricePerItem.slice(1).replace(',', '.')) * goods[i].quantity;
        }
        if (goods[i].item == "apple") {
            weight = weight + goods[i].weight;
            costApples = costApples + Number(goods[i].pricePerKilo.slice(1).replace(',', '.')) * goods[i].weight;
        }

        if (goods[i].item == "orange") {
            costOranges = costOranges + Number(goods[i].pricePerKilo.slice(1).replace(',', '.')) * goods[i].weight;
            if (CheapestOrange == 0) {
                CheapestOrange = Number(goods[i].pricePerKilo.slice(1).replace(',', '.'));
                type = goods[i].type;
            } else {
                if (CheapestOrange > Number(goods[i].pricePerKilo.slice(1).replace(',', '.')))
                    CheapestOrange = Number(goods[i].pricePerKilo.slice(1).replace(',', '.'));
                type = goods[i].type;
            }

        }


    }

    goods.sort(function(a, b) {
        if (a.item > b.item) {
            return 1;
        }
        if (a.item < b.item) {
            return -1;
        }
        // a должно быть равным b
        return 0;
    });

    console.log(goods);
    goods.sort(function(a, b) {
        paramA = "pricePerKilo" in a ? "pricePerKilo" : "pricePerItem";
        paramB = "pricePerKilo" in b ? "pricePerKilo" : "pricePerItem";

        if (Number(a[paramA].slice(1).replace(',', '.')) > Number(b[paramB].slice(1).replace(',', '.'))) {

            return 1;
        }
        if (Number(a[paramA].slice(1).replace(',', '.')) < Number(b[paramB].slice(1).replace(',', '.'))) {

            return -1;
        }
        // a должно быть равным b

        return 0;
    });

    console.log(goods);

    console.log('Watermelons - $' + quantity);
    console.log('Apples - $' + weight);
    console.log('The cheapest orange type is: $' + type);
    console.log('Apples - $' + costApples.toFixed(2) + ', Pineapples - $' + costPineapples.toFixed(2) + ', Watermelons - $' + costWatermelons.toFixed(2) + ',  Oranges - $' + costOranges.toFixed(2));
}

goods = [
    {"item":"apple","type":"Fuji","weight":10,"pricePerKilo":"$3"},
  {"item":"orange","type":"Clementine","weight":6,"pricePerKilo":"$7"},
  {"item":"watermelon","type":"Nova","quantity":1,"pricePerItem":"$5"},
  {"item":"orange","type":"Navel","weight":6,"pricePerKilo":"$7"},
  {"item":"pineapple","type":"Queen","quantity":4,"pricePerItem":"$15"},
  {"item":"pineapple","type":"Pernambuco","quantity":3,"pricePerItem":"$12"},
  {"item":"apple","type":"Cameo","weight":6,"pricePerKilo":"$7"},
  {"item":"watermelon","type":"Trio","quantity":2,"pricePerItem":"$9"},
  {"item":"pineapple","type":"Red Spanish","quantity":3,"pricePerItem":"$9,99"},
  {"item":"watermelon","type":"Millionaire","quantity":2,"pricePerItem":"$7"},
  {"item":"orange","type":"Tangerine","weight":4,"pricePerKilo":"$4,99"},
  {"item":"apple","type":"Jazz","weight":4,"pricePerKilo":"$5"},
]
ShopStocktaking(goods);
