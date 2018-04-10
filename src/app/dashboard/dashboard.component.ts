import { ReversePipe } from './../common/pipe/reverse.pipe';
import { DeviceService } from 'app/common/service/device.service';
declare var $: any;
import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { FeedbackService } from 'app/common/service/feedback.service';
import { forEach } from '@angular/router/src/utils/collection';
import { EntityService } from 'app/common/service/entity.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  goodTotal = 0;
  badTotal = 0;
  okayTotal = 0;
  flag = 0;
  devices$;
  feedbacks$;
  dataCompletedTasksChart: any;
  optionsCompletedTasksChart: any;
  customerSatisfaction = 0;
  goodRates = 0;
  totalFeedback = 0;
  d_id = 9234;

  view: any[] = [700, 200];

  // realtime chart options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'hour';
  showYAxisLabel = true;
  yAxisLabel = 'total';
  timeline = true;
  colorScheme = {
    domain: ['#4cd137', '#fbc531', '#e84118']
  };
  pieChart = [];
  autoScale = true;
  chartData = [];
  showChart: boolean;

  single: any[];

  multi = [
    {
      "name": "2pm",
      "series": [
        {
          "name": "Good",
          "value": 30
        },
        {
          "name": "Okay",
          "value": 20
        },
        {
          "name": "Bad",
          "value": 50
        }
      ]
    },
    {
      "name": "3pm",
      "series": [
        {
          "name": "Good",
          "value": 50
        },
        {
          "name": "Okay",
          "value": 40
        },
        {
          "name": "Bad",
          "value": 10
        }
      ]
    },
    {
      "name": "4pm",
      "series": [
        {
          "name": "Good",
          "value": 40
        },
        {
          "name": "Okay",
          "value": 20
        },
        {
          "name": "Bad",
          "value": 40
        }
      ]
    }
  ];

  onSelect(event) {
    console.log(event);
  }


  constructor(private deviceService: DeviceService,
              private feedbackService: FeedbackService,
              private entityService: EntityService) {

    this.devices$ = deviceService.getDevices();


    this.feedbackService.getFeedback().subscribe(feedback => {
      this.showChart = false;
      console.log('Before:', this.showChart);
      this.initDashboardData(feedback);
      this.showChart = true;
      console.log('After:', this.showChart);
    });

  }

  showNotification(type, toilet) {
    // const type = ['warning', 'danger'];
    $.notify({
        icon: 'notifications',
        message: `${toilet} got a ${type === 'warning' ? 'okay' : 'bad'} feedback`

    },{
        type: type,
        delay: 1000,
        placement: {
            from: 'top',
            align: 'right'
        }
    });
}

startAnimationForLineChart(chart){
  let seq: any, delays: any, durations: any;
  seq = 0;
  delays = 0;
  durations = 0;

  chart.on('draw', function(data) {
    if(data.type === 'line' || data.type === 'area') {
      data.element.animate({
        d: {
          begin: 10,
          dur: 10,
          from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
          to: data.path.clone().stringify(),
          easing: Chartist.Svg.Easing.easeOutQuint
        }
      });
    } else if(data.type === 'point') {
          seq++;
          data.element.animate({
            opacity: {
              begin: seq * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: 'ease'
            }
          });
      }
  });

  seq = 0;
};

startAnimationForBarChart(chart) {
  let seq2: any, delays2: any, durations2: any;

  seq2 = 0;
  delays2 = 80;
  durations2 = 500;
  chart.on('draw', function(data) {
    if(data.type === 'bar'){
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
    }
  });

  seq2 = 0;
};

// contains monthly and weekly chart data initializations
ngOnInit() {
  /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

  const dataDailySalesChart: any = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
          [12, 17, 7, 17, 23, 18, 38]
      ]
  };

 const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
  }

  var dailySalesChart = new Chartist.Bar('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

  this.startAnimationForLineChart(dailySalesChart);


  /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

  



  /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

  var dataEmailsSubscriptionChart = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
      [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

    ]
  };
  var optionsEmailsSubscriptionChart = {
      axisX: {
          showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
  };
  var responsiveOptions: any[] = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];
  var emailsSubscriptionChart = new Chartist.Bar('#emailsSubscriptionChart', dataEmailsSubscriptionChart, optionsEmailsSubscriptionChart, responsiveOptions);

  //start animation for the Emails Subscription Chart
  this.startAnimationForBarChart(emailsSubscriptionChart);
}


  initDashboardData(feedbacks) {
    let temp = [
      {'name': 'Good',
      'series' : []
      },
      {'name': 'Okay', 'series':[]},
      {'name': 'Bad', 'series':[]}
    ];

    this.goodTotal = 0;
    this.badTotal = 0;
    this.okayTotal = 0;

    if (feedbacks.length > 0) {
      feedbacks.forEach(feedback => {

        const good = parseInt(feedback.score, 10) === 7 ? 1 : 0;
        const okay = parseInt(feedback.score, 10) === 5 ? 1 : 0;
        const bad =  parseInt(feedback.score, 10) === 3 ? 1 : 0;

        this.goodTotal += good;
        this.okayTotal += okay;
        this.badTotal += bad;

        this.goodRates += good + (okay / 2);
        this.totalFeedback = this.totalFeedback + 1;
        this.customerSatisfaction = Math.round((this.goodRates / this.totalFeedback) * 100);

      });

      if (this.flag > 0) {
        const lastFeed = feedbacks[feedbacks.length - 1];
        // console.log(JSON.stringify(lastFeed));
        if (parseInt(lastFeed.score, 10) === 3) {
          this.showNotification('danger', 'G-A');
        }
        this.pieChart = [];
      }
  
      this.flag++;

      this.chartData = [];
      this.chartData = [...temp];

      const tempPieChart = [];
      tempPieChart.push({"name":"Good", "value":this.goodTotal});
      tempPieChart.push({"name":"Okay", "value":this.okayTotal});
      tempPieChart.push({"name":"Bad", "value":this.badTotal});
      this.pieChart.push(...tempPieChart);

      this.entityService.updateOverallStats(this.d_id, {
        bad: this.badTotal,
        okay: this.okayTotal,
        good: this.goodTotal,
        cs: this.customerSatisfaction
      });
      const footFalls = this.badTotal + this.okayTotal + this.goodTotal;
      this.entityService.updateFootFalls(this.d_id, footFalls);
    }
  }

  getFeedback(score: number) {
    const feedback = {
      device: 1458,
      score: score,
      time: moment().valueOf()
    };
    this.feedbackService.submitFeedback(feedback);
  }

}
