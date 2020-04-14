$(document).ready(function() {

    var baseUrl = 'http://157.230.17.132:4027/sales';
    stampaGrafici();


    $('#btn-invia').click(function(){
        var nomeVenditore = $('#venditore').val();
        var dataVenduto = $('#input-data').val();
        var dataVendutoFormattata = moment(dataVenduto, 'YYYY-MM-DD').format('DD/MM/YYYY');
        var venduto = parseInt($('#input-venduto').val());
        $.ajax({
            url: baseUrl,
            method: 'POST',
            data: {
                salesman: nomeVenditore,
                amount: venduto,
                date: dataVendutoFormattata
            },
            success: function (data) {
                console.log(data);
                stampaGrafici();
            },
            error: function (err) {
                alert('Ciao bello be !!!!!');
            }
        });
    });
    $('#btn-modifica').click(function(){
        var nomeVenditore = $('#venditore').val();
        var dataVenduto = $('#input-data').val();
        var dataVendutoFormattata = moment(dataVenduto, 'YYYY-MM-DD').format('DD/MM/YYYY');
        var venduto = parseInt($('#input-venduto').val());
        $.ajax({
            url: baseUrl,
            method: 'PUT',
            data: {
                salesman:nomeVenditore,
                amount: venduto,
                date: dataVendutoFormattata,
            },
            success: function (data) {
                console.log(data);
                stampaGrafici();
            },
            error: function (err) {
                alert('Ciao bello be!!!!!');
            }
        });
    });

    function stampaGrafici() {
        $.ajax ({
            url: baseUrl,
            method: 'GET',
            success: function (data) {
                var datiMensili = costruisceDatiMensili(data);
                creaGraficoLineChart(datiMensili.mesi, datiMensili.vendite);
                var fatturato = fatturatoTotale(data);
                var  datiVenditori = costruisceDatiVenditoriAnnuali(data, fatturato);
                creaGraficoPieChart(datiVenditori.venditori, datiVenditori.vendite);

            },
            error: function(err) {
                alert('Ciaoooo bello be!!!!!' + err);

            }
        });
    }

    function costruisceDatiMensili(vendite) {
        var venditeMensili = {
            gennaio: 0,
            febbraio: 0,
            marzo: 0,
            aprile: 0,
            maggio: 0,
            giugno: 0,
            luglio: 0,
            agosto: 0,
            settembre: 0,
            ottobre: 0,
            novembre: 0,
            dicembre: 0
        };
        // var arrayMonth = moment.months();//posso creare un array con i mesi anche con month
        // console.log(arrayMonth);
        for (var i = 0; i < vendite.length; i++) {
            var vendita = vendite[i];
            var dataVendita = vendita.date;
            var meseVendita = moment(dataVendita, 'DD/MM/YYYY').format('MMMM');//trasformo la data che mi arriva con moment nel formato MMMM solo mese
            venditeMensili[meseVendita] += parseInt(vendita.amount);// aggiungo al mese di venditeMensili (e quindi il mese modificato con moment) il valore vendita.amount
        }
        var arrayMesi =[];// array vuoti per chart JS
        var arrayVendite = [];
        for (var nomeMese in venditeMensili) {// ciclo all'interno oggetto venditeMensili
            arrayMesi.push(nomeMese);// inserisco in array vuoti ( mesi )
            arrayVendite.push(venditeMensili[nomeMese]);// inserisco in array vuoti (vendite)
        }
        return {// su return creo 2 oggetti con le chiavi da inserire po nella chiamata alla funzione per creare il grafico
            mesi: arrayMesi,
            vendite: arrayVendite
        };
    }

    function fatturatoTotale(vendite) {
    var fatturato = 0;
    for (var i = 0; i < vendite.length; i++) {
        var vendita = vendite[i];
        fatturato += parseInt(vendita.amount);
    }
    return fatturato;

    }

    function costruisceDatiVenditoriAnnuali(vendite, fatturatoComplessivoAziendale) {// funzione che costruisce un riepilogo vendite annualeper singolo venditore
        var venditeVenditori = {};//oggetto che rachiude la somma annuale di ogni singolo venditore
        for (var i = 0; i < vendite.length; i++) {//cicla all'interno dell'array nel get
            var vendita = vendite[i];//variabole (vendita) dettermina tutti i dati dell'array nel get
            var nomeVenditore = vendita.salesman;//creo un avariabile con il nome del venditore
            if (venditeVenditori[nomeVenditore] === undefined){// se la chiave con il nome del venditore non esiste la trasformo a 0
                venditeVenditori[nomeVenditore] = 0;
            }
            venditeVenditori[nomeVenditore] += parseInt(vendita.amount);//sommo le varie vendite  del singolo venditore
        }
        var arrayVenditori =[];// array vuoti per chart JS
        var arrayVendite = [];
        for (var nomeVenditore in venditeVenditori) {// ciclo all'interno oggetto venditeVenditori
            arrayVenditori.push(nomeVenditore);// inserisco in array vuoti ( venditori )
            var fatturatoPercentualeVenditore =((venditeVenditori[nomeVenditore] / fatturatoComplessivoAziendale) * 100).toFixed(2);
            arrayVendite.push(fatturatoPercentualeVenditore);// inserisco in array vuoti (vendite)
        }
        return {// su return creo 2 oggetti con le chiavi da inserire po nella chiamata alla funzione per creare il grafico
            venditori: arrayVenditori,
            vendite: arrayVendite
        };
    }

    function creaGraficoLineChart(arrayLabels, arrayData) {
        var ctx = $('#grafico-line');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: arrayLabels,
                datasets: [{
                    label: 'Vendite Mensili',
                    borderColor: 'darkblue',
                    lineTension: 0,
                    data: arrayData
                }]
            }
        });

    }

    function creaGraficoPieChart(arrayLabels, arrayData) {
        var ctx = $('#grafico-pie');
        var pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                datasets: [{
                    data: arrayData,
                    backgroundColor: ['Red','Yellow','Blue', 'orange','turquoise','slateblue'],
                    hoverBackgroundColor: ['lightcoral', 'palegoldenrod', 'deepskyblue', 'lightsalmon','mediumturquoise','mediumslateblue'],
                    borderColor: '#727272',
                }],
                labels: arrayLabels
            },
            options: {
                responsive: true,
                tooltips: {
                  callbacks: {
                    label: function(tooltipItem, data) {
                      return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
                    }
                  }
                }
            }
        });

    }

});
