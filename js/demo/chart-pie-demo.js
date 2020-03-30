// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

var request = new XMLHttpRequest()
var data1 = [0,0,0]
var confirmed = 0
var recovered = 0
var deaths = 0
var active = 0
var lastupdatedtime = "0:0:0"

function getApiData() {
  request.open('GET', 'https://api.covid19india.org/data.json', true)
  request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {

      // general top data
      active =(parseInt(data.statewise[0].active));
      document.getElementById("active").innerHTML = active;

      confirmed = (parseInt(data.statewise[0].confirmed));
      document.getElementById("confirmed").innerHTML = confirmed;

      recovered = (parseInt(data.statewise[0].recovered));
      document.getElementById("recovered").innerHTML = recovered;

      deaths = (parseInt(data.statewise[0].deaths));
      document.getElementById("deaths").innerHTML = deaths;

      lastupdatedtime = data.statewise[0].lastupdatedtime;
      document.getElementById("lastupdatedtime").innerHTML = lastupdatedtime;

      // passing data to pie chart
      pass_data_pie_chart([confirmed,recovered,deaths])

      // Data for aria charts

      var statewise_active = [];
      var statewise_confirmed = [];
      var statewise_deaths = [];
      var statewise_recovered = [];
      var state_name = [];
      // items.push('Socks','Scarf');
      data.statewise.forEach(val => {
        statewise_active.push(parseInt(val.active));
        statewise_confirmed.push(parseInt(val.confirmed));
        statewise_deaths.push(parseInt(val.deaths));
        statewise_recovered.push(parseInt(val.recovered));
        state_name.push(val.state);
      })


      barChartGenerate(state_name,statewise_active,statewise_confirmed,statewise_recovered,statewise_deaths)

      console.log(data.cases_time_series)

      var totalconfirmed = [];
      var totaldeceased = [];
      var totalrecovered = [];
      var dailyDate = [];
      // items.push('Socks','Scarf');
      data.cases_time_series.forEach(val => {
        totalconfirmed.push(parseInt(val.totalconfirmed));
        totaldeceased.push(parseInt(val.totaldeceased));
        totalrecovered.push(parseInt(val.totalrecovered));
        dailyDate.push(val.date.slice(0, 6));
      })
      console.log(totalconfirmed)
      console.log(totaldeceased)
      console.log(totalrecovered)
      console.log(dailyDate)

      pass_data_area_chart(totalconfirmed,totaldeceased,totalrecovered,dailyDate)

    } else {
      console.log('error')
    }
  }
  request.send()

}


function pass_data_pie_chart(arr1) {
  console.log("pie val is");
  console.log(arr1);

// Pie Chart Example
  var ctx = document.getElementById("myPieChart");
  var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["Total", "Recoverd", "Deaths"],
      datasets: [{
        data: arr1,
        backgroundColor: ['#f6c23e', '#36b9cc', '#e74a3b'],
        hoverBackgroundColor: ['yellow', '#17a673', 'red'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80,
    },
  });
}





function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

function pass_data_area_chart(totalconfirmed,totaldeceased,totalrecovered,dailyDate) {
  // Area Chart Example
  var ctx = document.getElementById("myAreaChart");
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dailyDate,
      datasets: [{
        label: "Infected",
        lineTension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05",
        borderColor: "#f6c23e",
        pointRadius: 3,
        pointBackgroundColor: "#f6c23e",
        pointBorderColor: "#f6c23e",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "#f6c23e",
        pointHoverBorderColor: "#f6c23e",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: totalconfirmed,
      },
      {
        label: "Recoverd",
        lineTension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "#36b9cc",
        pointRadius: 3,
        pointBackgroundColor: "#36b9cc",
        pointBorderColor: "#36b9cc",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "#36b9cc",
        pointHoverBorderColor: "#36b9cc",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: totalrecovered,
      },
      {
        label: "Deaths",
        lineTension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "#e74a3b",
        pointRadius: 3,
        pointBackgroundColor: "#e74a3b",
        pointBorderColor: "#e74a3b",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "#e74a3b",
        pointHoverBorderColor: "#e74a3b",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: totaldeceased,
      }],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0
        }
      },
      scales: {
        xAxes: [{
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            maxTicksLimit: 7
          }
        }],
        yAxes: [{
          ticks: {
            maxTicksLimit: 5,
            padding: 10,
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
              return number_format(value);
            }
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
          }
        }],
      },
      legend: {
        display: true
      },
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        intersect: false,
        mode: 'index',
        caretPadding: 10,
        callbacks: {
          label: function(tooltipItem, chart) {
            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            return datasetLabel + ':' + number_format(tooltipItem.yLabel);
          }
        }
      }
    }
  });

}



// Bar charts
// Bar Chart Example
function barChartGenerate(state_name,statewise_active,statewise_confirmed,statewise_recovered,statewise_deaths){
  var ctx = document.getElementById("myBarChart");
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: state_name.slice(1),
      datasets: [{
        label: "active",
        backgroundColor: "#4e73df",
        hoverBackgroundColor: "green",
        borderColor: "#4e73df",
        data: statewise_active.slice(1),
      },
      {
        label: "confirmed",
        backgroundColor: "#f6c23e",
        hoverBackgroundColor: "yellow",
        borderColor: "#f6c23e",
        data: statewise_confirmed.slice(1),
      },
      {
        label: "recovered",
        backgroundColor: "#36b9cc",
        hoverBackgroundColor: "gray",
        borderColor: "#36b9cc",
        data: statewise_recovered.slice(1),
      },{
        label: "deaths",
        backgroundColor: "#e74a3b",
        hoverBackgroundColor: "red",
        borderColor: "#e74a3b",
        data: statewise_deaths.slice(1),
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{

          gridLines: {
            display: true,
            drawBorder: false
          },
          ticks: {
            autoSkip: false
          },
          maxBarThickness: 25,
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 250,
            maxTicksLimit: 50,
            padding: 1,
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
              return number_format(value);
            }
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
          }
        }],
      },
      legend: {
        display: true
      },
      tooltips: {
        titleMarginBottom: 1,
        titleFontColor: '#6e707e',
        titleFontSize: 8,
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 5,
        yPadding: 5,
        displayColors: false,
        caretPadding: 1,
        callbacks: {
          label: function(tooltipItem, chart) {
            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            return datasetLabel + number_format(tooltipItem.yLabel);
          }
        }
      },
    }
  });


}
