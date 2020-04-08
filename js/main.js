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
            //Estrarre tutte le chiavi di un oggetto e metterle in un array
            var listaMesi = Object.keys(venditePerMese);
            // console.log('risultato object.keys', listaMesi)
            //Estrarre tutti i valori di un oggetto e li mette in un array
            var fatturaMesi = Object.values(venditePerMese);
            // console.log('risultato object.values', fatturaMesi)

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
            } //console.log(venduto);


            var ctx = $('#ChartBool');
            var chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: listaMesi,
                    datasets: [{
                        label: 'Vendite Annuali',
                        backgroundColor: '',
                        borderColor: 'darkblue',
                        data: venduto,
                    }],
                },
            });

            // var ctx = $('#ChartBool');
            // var chart = new Chart(ctx, {
            //     type: 'pie',
            //     data: {
            //         datasets: [{
            //             data: venduto ,
            //             backgroundColor: ,
            //         }],
            //         labels:venduto
            //     }
            // });
        }
    });





});
