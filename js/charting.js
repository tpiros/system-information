(function() {
  'use strict';
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  var socket = io.connect('http://localhost:8080');
  var displayed;

  function drawChart() {
    var options = {
      title: 'System Utilisation',
      curveType: 'function',
      legend: { position: 'bottom' },
      pointSize: 3,
      width: 900,
      height: 400
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    var dataArray = [['Time', 'CPU Average (%)', 'Used Memory (GB)'], [new Date(), 0, 0]];
    var data = google.visualization.arrayToDataTable(
      dataArray
    );
    chart.draw(data, options);

    socket.on('resources', function (load) {
      dataArray.push([new Date(), load.cpu, load.memory]);
      data = google.visualization.arrayToDataTable(
        dataArray
      );
      chart.draw(data, options);
      if (displayed) {
        $('#error').empty();
        displayed = false;
      }
    });

    socket.io.on('connect_error', function(error) {
      if (!displayed) {
        $('#error').append('<div class="alert alert-danger" role="alert">Error connecting to socket! No data is collected.</div>');
        displayed = true;
      }
    });
  }
})();
