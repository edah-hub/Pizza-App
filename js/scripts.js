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
        { name: "vegtikka", price: 60 },
        { name: "chickentikka", price: 80 },
        { name: "periperi", price: 50 },
        { name: "bbq", price: 70 },
        { name: "boerewors", price: 100 },
        { name: "hawaiian", price: 80 },
        { name: "mushroom", price: 80 },
        { name: "regina", price: 80 }
    ];

    Pizza.prototype.getTotal = function () {
        let total = 0;

        if (this.size) {
            const pizzaSize = this.size;

            const size = Pizza.prototype.pizzaSizePrices.find(function (p) {
                return p.size === pizzaSize;
            });

            total = total + size.price;
        }

        if (this.toppings) {
            let toppingsTotal = 0;
            const pizzaToppings = this.toppings;

            for (let i = 0; i < pizzaToppings.length; i++) {
                const topping = Pizza.prototype.toppingsPrices.find(function (p) {
                    return p.name === pizzaToppings[i].trim();
                });

                toppingsTotal = toppingsTotal + topping.price;
            }

            total = total + toppingsTotal;
        }

        total = total * this.quantity;

        if (this.isDelivery === "yes") {
            total = total + Pizza.prototype.deliveryPrice;
        } else {
            total = total + 0;
        }

        Pizza.prototype.orderTotal = total;

        return total;
    }
    // create url search params
    const urlParams = new URLSearchParams(window.location.search);
    const pizzaName = urlParams.get("pizza");

      // Add pizza name to html
      $("#pizza-name").html(pizzaName);
      $("#summary").html(pizzaName);

       // Hide delivery address input
    $("#yes-delivery").hide();

    // Get input references
    let pizzaSize = "";
    let crustType = "";
    let delivery = "";
    let quantity = 1;
    let toppings = [];

    function totalHelper() {
        const newPizza = new Pizza(pizzaSize, crustType, toppings, quantity, delivery);
        const newTotal = newPizza.getTotal();

        $("#summary-total").html(`Total - Ksh. ${newTotal}`);
    }

       // Populate order summary
    // Update pizza size on summary section
    $("input[name=pizzaSizes]").change(function () {
        pizzaSize = $('input[name=pizzaSizes]:checked').val();

        $("#summary-size").html(`Size - ${pizzaSize}`);

        // Get new total
        totalHelper();
    });

      // Update crust type on summary section
      $("input[name=crustType]").change(function () {
        crustType = $('input[name=crustType]:checked').val();

        $("#summary-crust").html(`Crust - ${crustType}`);

        // Get new total
        totalHelper();
    });

     // Update toppings on summary section
     $("input[name=toppings]").change(function () {
        const newToppings = [];

        $.each($("input[name='toppings']:checked"), function () {
            // Add a space before the array item to allow for text wrapping
            newToppings.push(` ${$(this).val()}`);
        });

        toppings = newToppings;

        $("#summary-toppings").html(`Toppings - ${toppings}`);

        // Get new total
        totalHelper();
    });
