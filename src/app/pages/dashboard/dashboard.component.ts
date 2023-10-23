import {Component} from '@angular/core';
import { UserService } from '@services/user.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    
  constructor(private userService: UserService) { }
  
  chart: any;
  chart2: any;
  imageUrl: string;
	
	chartOptions = {
	  animationEnabled: true,
	  theme: "light2",
	  title:{
		text: "Skin Health Statistic"
	  },
	  // axisX:{
		// valueFormatString: "Year"
	  // },
	  axisY: {
		title: "Age Standardised rate (per 100000)"
	  },
	  toolTip: {
		shared: true
	  },
	  legend: {
		cursor: "pointer",
		itemclick: function (e: any) {
			if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
				e.dataSeries.visible = false;
			} else {
				e.dataSeries.visible = true;
			} 
			e.chart.render();
		}
	  },
	  data: [{
		type: "line",
		showInLegend: true,
		name: "Male",
		xValueFormatString: "MMM DD, YYYY",
		dataPoints: [
			{ x: 1982, y: 63 },
			{ x: 1987,  y: 69 },
			{ x: 1992, y: 65 },
			{ x: 1997, y: 70 },
			{ x: 2002, y: 71 },
			{ x: 2007, y: 65 },
			{ x: 2012, y: 73 },
			{ x: 2017, y: 86 },
			{ x: 2022, y: 74 },
		]
	  }, {
		type: "line",
		showInLegend: true,
		name: "Female",
		dataPoints: [
			{ x: 1982, y: 60 },
			{ x: 1987, y: 57 },
			{ x: 1992, y: 51 },
			{ x: 1997,  y: 56 },
			{ x: 2002, y: 54 },
			{ x: 2007, y: 55 },
			{ x: 2012, y: 54 },
			{ x: 2017, y: 69 },
			{ x: 2022, y: 65 },
		]
	  }]
	}	
    
    secondChartOptions = {
        animationEnabled: true,
        theme: "light2",
        title:{
          text: "Recovery Statistic"
        },
        axisY: {
          title: "Count",
          includeZero: true
        },
        axisY2: {
          title: "",
          includeZero: true,
          labelFormatter: (e:any) => {
              var suffixes = ["", "K", "M", "B"];
   
              var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
              if(order > suffixes.length - 1)
                  order = suffixes.length - 1;
   
              var suffix = suffixes[order];
              return '$' + (e.value / Math.pow(1000, order)) + suffix;
          }
        },
        toolTip: {
          shared: true
        },
        legend: {
          cursor: "pointer",
          itemclick: function (e: any) {
              if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                  e.dataSeries.visible = false;
              } else {
                  e.dataSeries.visible = true;
              } 
              e.chart2.render();
          }
        },
        data: [{
          type: "column",
          showInLegend: true,
          name: "Time",
          axisYType: "secondary",
          yValueFormatString: "$#,###",
          dataPoints: [
              { label: "1 Month", y: 250000 },
              { label: "2 Month", y: 431000 },
              { label: "3 Month", y: 646000 },
              { label: "4 Month", y: 522000 },
              { label: "5 Month", y: 464000 },
              { label: "6 Month", y: 470000 },
              { label: "7 Month", y: 534000 },
              { label: "8 Month", y: 407000 },
              { label: "9 Month", y: 484000 },
              { label: "10 Month", y: 465000 },
              { label: "11 Month", y: 424000 },
              { label: "12 Month", y: 231000 }
          ]
        },{
          type: "spline",
          showInLegend: true,
          name: "Time",
          dataPoints: [
              { label: "1 Month", y: 372 },
              { label: "2 Month", y: 412 },
              { label: "3 Month", y: 572 },
              { label: "4 Month", y: 224 },
              { label: "5 Month", y: 246 },
              { label: "6 Month", y: 601 },
              { label: "7 Month", y: 642 },
              { label: "8 Month", y: 590 },
              { label: "9 Month", y: 527 },
              { label: "10 Month", y: 273 },
              { label: "11 Month", y: 251 },
              { label: "12 Month", y: 331 }
          ]
        }]
      }

      
}
