var request = new XMLHttpRequest()

request.open('GET', 'https://api.covid19india.org/data.json', true)
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
    console.log(data)
    data.cases_time_series.forEach(confirmed => {
      console.log(confirmed.dailyconfirmed)
    })
  } else {
    console.log('error')
  }
}

request.send()
