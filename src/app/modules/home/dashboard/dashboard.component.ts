import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('pieCanvas') private pieCanvas: ElementRef;
  pieChart: any;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('lineCanvas') lineCanvas: ElementRef;
  lineChart: any;

  private pieChartLabels = ['Số ứng viên thành công', 'Số ứng viên thất bại'];
  private pieChartData = [];

  private lineChartLabels = [];
  private lineChartDataLine1 = [];
  private lineChartDataLine2 = [];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  dateRangeForm: FormGroup;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  startDate: any;


  constructor(private fb: FormBuilder,
    private datePipe: DatePipe,
    // private homeAdminService: HomeAdminService
    ) {  }

  today ='01/01/2021';
  ngOnInit(): void {
    this.initForm();
    const date = new Date();
    this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(),date.getDay()),'dd/mm/yyyy');
    console.log(this.startDate)
    this.dateRangeForm.patchValue({
      fromDate: new Date(date.getFullYear(), date.getMonth(), 1),
      toDate: new Date(date.getFullYear(), date.getMonth() + 1, 0),
    });
  }


  // get f(){

  // }
  public initForm() {

    this.dateRangeForm = this.fb.group({
      fromDate: new FormControl(this.datePipe.transform(new Date().getDate(), 'MM/dd/yyyy')),
      toDate: new FormControl(this.datePipe.transform(new Date().getDate(), 'MM/dd/yyyy')),
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get f() {
    return this.dateRangeForm.controls;
  }
  ngAfterViewInit(): void {
    // const date = new Date();
    // this.dateRangeForm.patchValue({
    //   fromDate: new Date(date.getFullYear(), date.getMonth(), 1),
    //   toDate: new Date(date.getFullYear(), date.getMonth() + 1, 0)
    // });
    this.changeDateEvent(null);
  }

  changeDateEvent(event: any) {
    // check toDate phải lớn hơn fromDate
    //console.log(event.target.value);
    // TODO - get fromDate, toDate ==> call api ==> re-render chart

    // this.homeAdminService.getStatisticNumbers(
      // this.dateRangeForm.get("fromDate")?.value, this.dateRangeForm.get("toDate")?.value).subscribe(res => {
      // lấy được data từ backend
    // });

    // this.homeAdminService.getLineChartData(
    //   this.dateRangeForm.get("fromDate")?.value,
    //   this.dateRangeForm.get("toDate")?.value, "d").subscribe(res => {
    //   this.lineChartLabels = res.label.split(",");
    //   this.lineChartDataLine1 = res.qtyPerson.split(",");
    //   this.lineChartDataLine2 = res.successRecruitment.split(",");
    //   this.lineChartMethod(this.lineChartLabels, this.lineChartDataLine1, this.lineChartDataLine2);
    // });

    // this.homeAdminService.getPieChartData(this.dateRangeForm.get(
      // "fromDate")?.value, this.dateRangeForm.get("toDate")?.value).subscribe(res => {
    //   this.pieChartData.push(res.sucessApplicantQuantity);
    //   this.pieChartData.push(res.failApplicantQuantity);
    //   this.pieChartBrowser(this.pieChartLabels, this.pieChartData);
    // });
    let labels:string[] = ['pie1','pie2','pie3']
    let data:number[] = [1,2,3]
    this.pieChartBrowser(labels,data)

    let labels2: ['line1','line2'];
    let dataLine1: [1,2,3]
    let dataLine2: [3,2,1]
    this.lineChartMethod(labels2,dataLine1,dataLine2)
  }

  pieChartBrowser(labels: string[], datas: number[]): void {
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels : labels,
        datasets: [{
          backgroundColor: [
            '#2ecc71',
            '#3498db',
            '#95a5a6',
            '#9b59b6',
            '#f1c40f',
            '#e74c3c',
          ],
          data: datas,
        }],
      },
    });
  }

  lineChartMethod(labels: Array<string>, data1: Array<number>, data2: Array<number>) {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        // eslint-disable-next-line max-len
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: labels,
            fill: false,
            // lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,
          },
          {
            label: labels,
            fill: false,
            // lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
            spanGaps: false,
          },
        ],
      },
    });
  }

}
