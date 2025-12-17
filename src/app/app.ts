import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Footer } from "./footer/footer";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
toggleTheme(): void {
    document.body.classList.toggle('dark-theme');
  }
}


