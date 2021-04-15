$(document).ready(() => {
  const categorySelect = document.querySelector('select[name=category]')
  const productSelect = document.querySelector('select[name=product]')
  const brandSelect = document.querySelector('select[name=brand]')

  function fillCategorySelect() {
    Object.keys(data).forEach(category => {
      const option = document.createElement('option')
      const value = document.createTextNode(category)

      option.append(value)
      categorySelect.appendChild(option)
    })

    fillProductSelect()
  }

  function fillProductSelect() {
    $(productSelect).empty()

    Object.keys(data[categorySelect.value]).forEach(product => {
      const option = document.createElement('option')
      const value = document.createTextNode(product)

      option.append(value)
      productSelect.appendChild(option)
    })

    fillBrandSelect()
  }

  function fillBrandSelect() {
    $(brandSelect).empty()

    Object.keys(data[categorySelect.value][productSelect.value]).forEach(brand => {
      const option = document.createElement('option')
      const value = document.createTextNode(brand)

      option.append(value)
      brandSelect.appendChild(option)
    })

    fillChart()
  }

  function fillChart() {
    const chartData = []

    const monthsData = data[categorySelect.value][productSelect.value][brandSelect.value]

    Object.keys(monthsData).forEach(month => {
      const cd = {
        name: month,
        y: monthsData[month]
      }

      chartData.push(cd)
    })

    Highcharts.chart('container', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Sales by Month for:'
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        type: 'category',
        title: {
          text: 'Months'
        }
      },
      yAxis: {
        title: {
          text: 'Sales'
        }

      },
      legend: {
        enabled: true
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-weight: bold">{series.name}</span><br>',
        pointFormat: '<span>{point.name}</span>: {point.y} Sales<br/>'
      },

      series: [
        {
          name: "Sales",
          colorByPoint: false,
          data: chartData
        }
      ]
    });
  }

  fillCategorySelect()

  categorySelect.onchange = fillProductSelect
  productSelect.onchange = fillBrandSelect
  brandSelect.onchange = fillChart
})
