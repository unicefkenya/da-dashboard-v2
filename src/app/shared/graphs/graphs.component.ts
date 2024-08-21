import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  @Input() data: any[]
  @Input() chart_type: string
  @Input() configs: any
  public datasets: any
  public labels: any
  public chart_options: any;
  public colors: any;
  public legend: any;

  testData = [
    [{ x: '2016-12-25', y: 20 }, { x: '2016-12-26', y: 10 }],
    [{ x: '2016-12-25', y: 20 }, { x: '2016-12-26', y: 10 }]
  ]


  constructor() { }

  ngOnInit() {

    this.generateGraph(this.chart_type, this.data, this.configs)

  }

  // Generate charts
  generateGraph(chart_type, data, configs) {

    if (chart_type == 'bar') {
      this.generateBarLine(data, configs)

    } else if (chart_type == 'doughnut') {
      this.generateDoughnut(data, configs)
    }
  }


  globalChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
  }


  // Generate Bar-Line Graph
  generateBarLine(data, configs) {
    // console.log(data)
    this.colors = configs.colors.colors
    if (data.series) {
      this.datasets = [
        {
          data: data.series.series_a,
          label: data.series.labels.label_a,
          borderWidth: 1,
          type: 'bar',
          fill: false
        },
        {
          data: data.series.series_b,
          label: data.series.labels.label_b,
          borderWidth: 1,
          type: 'bar'
        }
      ]
      let labels = {}
      let graphData = []
      for (let key in data.series) {
        if (key == "labels") {
          labels["series_a"] = data.series.labels["label_a"]
          labels["series_b"] = data.series.labels["label_b"]
        }
      }
      this.data = []
      for (let key in data.series) {
        if (key != "labels") {
          graphData.push(data.series[key].map((v) => ({ x: labels[key], y: v })))
        }
      }
      // console.log(graphData)
      this.data = graphData

    } else {
      this.data = [
        {
          data: data.data,
          label: data.data,
          borderWidth: 1,
          type: 'bar'
        }
      ]
    }
    this.labels = data.labels
    // console.log(configs)
    // console.log(this.globalChartOptions)
    this.chart_options = Object.assign({
      legend: {
        display: configs.legend,
        position: 'bottom'
      },
      animation: {
        duration: 600,
        easing: 'easeInCubic'
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              color: configs.colors.xColor,
              zeroLineColor: configs.colors.xZeroLineColor
            },
            scaleLabel: {
              display: true,
              labelString: configs.labelString
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              color: configs.colors.yColor,
              zeroLineColor: configs.colors.yZeroLineColor
            },
            ticks: {
              beginAtZero: true,
              suggestedMax: 9
            },
            scaleLabel: {
              display: true,
              labelString: configs.yLabelString || 'Number of Learners'
            }
          }
        ]
      }
    }, this.globalChartOptions)
  }

  // Generate Doughnut Chart
  generateDoughnut(data, configs) {

    this.colors = [
      {
        backgroundColor: configs.colors
      }
    ]

    this.labels = data.labels
    this.data = data.data
    this.chart_options = Object.assign(
      {
        legend: {
          display: true,
          position: 'bottom'
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              let sum = 0;
              let dataArr = data['datasets'][0]['data']
              dataArr.map(data => {
                sum += data;
              });
              let percentage = (data['datasets'][0]['data'][tooltipItem['index']] * 100 / sum).toFixed(2) + "%";
              const dataValue = data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + ' (' + percentage + ')'
              return dataValue;
            }
          }
        },
        elements: {
          arc: {
            borderWidth: 0
          }
        }
      }, this.globalChartOptions
    )

  }
}
