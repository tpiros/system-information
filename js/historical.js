$(function() {
  'use strict';
  $('#datetimepicker1').datetimepicker({
    format: 'YYYY-MM-DD HH:mm:ss'
  });
  $('#datetimepicker2').datetimepicker({
    format: 'YYYY-MM-DD HH:mm:ss'
  });

  $('#apply').click(function() {
    var from = parseInt(new Date($('#from').val()).getTime());
    var to = parseInt(new Date($('#to').val()).getTime());

    $.post('/api/historical', { from: from, to: to} )
    .done(function(data) {
      parseData(data, function(historicalDataArray) {
        var options = {
          title: 'System Utilisation',
          curveType: 'function',
          legend: { position: 'bottom' },
          pointSize: 3,
          width: 900,
          height: 400
        };

        var historicalData = google.visualization.arrayToDataTable(
          historicalDataArray
        );

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart_historical'));
        chart.draw(historicalData, options);
      });
    });
  });

  function parseData(dataFromServer, cb) {
    var historicalDataArray = [
      ['Time', 'CPU Average (%)', 'Used Memory (GB)']
    ];
    dataFromServer.forEach(function(document) {
      historicalDataArray.push([new Date(document.content.recorded), parseFloat(document.content.cpu), parseFloat(document.content.memory)]);
    });

    cb(historicalDataArray);
  }

});
