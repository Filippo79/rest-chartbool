$(document).ready(function() {
    $.ajax({
        url:'http://157.230.17.132:4027/sales',
        method:'GET',
        data: {
            salesman: variabileNome.salesman,
            amount: variabileVenduto.amount,
            date: varabileData.date
        },
        sucess: function(data) {
            var datiClienti = data.response;
            for (var i = 0; i < datiClienti.length; i++) {
                var datiCliente = datiClienti[i];
                //console.log(datiClienti[i]);
                var nomeCliente = datiCliente.salesman;
                var vendutoCliente = datiCliente.amount;
                var dataVendita = datiCliente.date;
            }
        }
    });











    var ctx = $('#ChartBool');
    var chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });


});
