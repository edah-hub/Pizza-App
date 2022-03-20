// Constructor
$(document).ready(function () {
    function Pizza(size, crustType, toppings, quantity, isDelivery) {
        this.size = size;
        this.crustType = crustType;
        this.toppings = toppings;
        this.quantity = quantity;
        this.isDelivery = isDelivery;
    

    }
    Pizza.prototype.deliveryPrice = 150;
    Pizza.prototype.orderTotal = 0;


    Pizza.prototype.pizzaSizePrices = [
        { size: "small", price: 550 },
        { size: "medium", price: 850 },
        { size: "large", price: 1050 },
        { size: "extraLarge", price: 1200 }
    ];
    Pizza.prototype.toppingsPrices = [
        { name: "pepperoni", price: 60 },
        { name: "mushrooms", price: 80 },
        { name: "onions", price: 50 },
        { name: "sausage", price: 70 },
        { name: "extraCheese", price: 100 },
        { name: "blackOlives", price: 80 },
        { name: "greenPeppers", price: 80 }
    ];