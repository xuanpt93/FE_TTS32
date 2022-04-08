import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-job-reason',
  templateUrl: './job-reason.component.html',
  styleUrls: ['./job-reason.component.scss']
})
export class JobReasonComponent implements OnInit {
  @Input() displayPosition: boolean ;
  @Input() content: string;
  // @ts-ignore
  @Output() checkedChange = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.displayPosition = !this.displayPosition;
    this.checkedChange.emit(this.displayPosition);
  }

}
