$(document).ready(function() {
    $.ajax({
        url:'http://157.230.17.132:4027/sales',
        method:'GET',
        success: function(data) {
            //console.log(data);
            var datiClienti = data;
            for (var i = 0; i < datiClienti.length; i++) {
                var datiCliente = datiClienti[i];
                //console.log(datiClienti[i]);
                var nomeCliente = datiCliente.salesman;
                var vendutoCliente = datiCliente.amount;
                var dataVendita = datiCliente.date;
            }
            // console.log(vendutoCliente);
            // console.log(dataVendita);
            // console.log(nomeCliente);
        }
    });




    /*var ctx = $('#ChartBool');
    var chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });*/


});
