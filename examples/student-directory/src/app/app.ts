import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="site-header"><a routerLink="/students">student<span>.</span>directory</a><span>ANGULAR ACADEMY</span></header>
    <main><router-outlet /></main>
    <footer>Built step by step. Angular Academy · සිංහලෙන් ඉගෙන ගනිමු.</footer>
  `
})
export class App {}
