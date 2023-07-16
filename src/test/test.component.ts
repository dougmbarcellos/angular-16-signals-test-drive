import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class TestComponent implements OnInit {
  @Input({ required: true }) logs: string[] = [];

  constructor() {}

  ngOnInit() {}
}
