$(document).ready(function() {
    $.ajax({
        url:'http://157.230.17.132:4027/sales',
        method:'GET',
        success: function(data) {
            //console.log(data);
            var venditePerMese = {
                    'gennaio': 0,
                    'febbraio': 0,
                    'marzo': 0,
                    'aprile': 0,
                    'maggio': 0,
                    'giugno': 0,
                    'luglio': 0,
                    'agosto': 0,
                    'settembre': 0,
                    'ottobre': 0,
                    'novembre': 0,
                    'dicembre': 0
            };
            var dati = data;
            for (var i = 0; i < dati.length; i++) {
                var datiCliente = dati[i];
                //console.log(datiClienti[i]);
                var nomiClienti = datiCliente.salesman;
                var vendutoClienti = datiCliente.amount;
                var dataVendita = datiCliente.date;
                var mesiVendita = moment(dataVendita, 'DD/MM/YYYY').format("MMMM");
                // console.log(mesiVendita);
                if ( vendutoClienti === undefined){
                    vendutoClienti = 0;
                }
                // console.log(vendutoClienti);
                venditePerMese[mesiVendita] += vendutoClienti;
                // console.log(venditePerMese);
            }

            var venduto =[];
            for (var key in venditePerMese) {
                // console.log(key);
                venduto.push(venditePerMese[key]);
            } console.log(venduto);
            return venduto;





        }
    });
    // var ctx = $('#ChartBool');
    // var chart = new Chart(ctx, {
    //     type: 'line',
    //     data: venduto,
    //     options: options
    // });

    var ctx = $('#ChartBool');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Gennaio' , 'Febbraio' , 'Marzo' , 'Aprile' , 'Maggio' , 'Giugno' ,'Luglio' ,'Agosto' , 'Settembre' , 'Ottobre' , 'Novembre' , 'Dicembre'],
            datasets: [{
                label: 'Vendite Annuali',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: venduto,
            }],
        },
    });


});
