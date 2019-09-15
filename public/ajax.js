
$(document).ready(function () {
    $("#portfolio").click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/simplerobinhood/portfolio",
            data: {
            },
            success: function (result) {
                //alert(result);

                result = makeTableHTML(JSON.parse(result)['results']);
                $('#portfolio_result').html(result);
            },
            error: function (result) {
                alert(result);
            }
        });
    });
});

$(document).ready(function () {
    $("#user").click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/simplerobinhood/user",
            data: {
            },
            success: function (result) {
                //alert(result);

                result = printYou(JSON.parse(result));

                $('#user_result').html(result);
            },
            error: function (result) {
                alert(result);
            }
        });
    });
});

$(document).ready(function () {
    $("#orders").click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/simplerobinhood/orders",
            data: {
            },
            success: function (result) {
                //alert(result);
                result = makeTableHTML(JSON.parse(result)['results']);
               
                $('#orders_result').html(result);
            },
            error: function (result) {
                alert(result);
            }
        });
    });
});


$(document).ready(function () {
    $("#place_order").click(function (e) {
        e.preventDefault();

        var ticker = $('input[name=ticker]').val();
        var quantity = $('input[name=quantity]').val();
        var bid_price = $('input[name=bid_price]').val();
        var instrument;

        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:8080/simplerobinhood/get_instrument",
            //contentType: "application/json",
            data: {
                symbol: ticker
            },
            dataType: "text",
            crossDomain: true,
            success: function (response) {
                //alert(response);
                instrument = JSON.parse(response)['results'][0]['url'];
                //alert(instrument);

                $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/simplerobinhood/place_order",
                    data: {
                        ticker,
                        quantity,
                        bid_price,
                        instrument
                    },
                    success: function (result) {
                        $('#place_order_result').html("Order placed.");
                    },
                    error: function (result) {
                        $('#place_order_result').html("Error: " + result);
                    }
                });

            },
            error: function (error) {
                // Log any error.
                console.log("Error getting instrument! " + error);
            }
        });




    });
});

function printYou(you) {

    var table = '';

    for (var k in you) {
        if (you[k] instanceof Object) {
            printYou(you[k]);
        } else {
            //alert(k + " = " + you[k]);

            table += "<tr>";
            table += "<td>";
            table += k;
            table += "</td>";
            table += "<td>";
            table += you[k];
            table += "</td>";
            table += "</tr>";

        }
    }

    return table;
}

function makeTableHTML(arr) {
    //var result = "<table border=1>";
    
    var table = '';
    table += "<thead> <tr>";
    for(var k in arr[0]){
        table += "<th>";
        table += k;
        table += "</th>";
    }
    table += "</tr></thead>";       
    
    for (i = 0; i < arr.length; i++)
    {
        table += "<tr>";
        for(var w in arr[i]){
            table += "<td>"+arr[i][w]+"</td>";
        }
        table += "</tr>";
    }
    //result += "</table>";

    return table;
}
