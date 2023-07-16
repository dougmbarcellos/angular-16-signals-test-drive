import 'zone.js/dist/zone';
import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { toObservable } from '@angular/core/rxjs-interop';
import { TestComponent } from './test/test.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, TestComponent],
  template: `
    <h1>Hello from {{full()}}!</h1>

    <button (click)="launchNewVersion()">launch new version</button>
    
    <app-test [logs]="logs()" />
  `,
})
export class App {
  name = signal('Angular');
  version = signal(1);
  full = computed(() => `${this.name()} ${this.version()}`);
  full$ = toObservable(this.full);
  logs = signal<string[]>([]);

  constructor() {
    effect(() => this.logs.mutate((value) => value.push(this.full())), {
      allowSignalWrites: true,
    });
  }

  ngOnInit() {
    this.full$.subscribe((value) => {
      console.log('rx', value);
    });
  }

  launchNewVersion() {
    // this.version.update((value) => value + 1);
    this.version.set(this.version() + 1);
  }
}

bootstrapApplication(App);
