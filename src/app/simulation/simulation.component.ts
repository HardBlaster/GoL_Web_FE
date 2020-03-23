import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SimulationService} from './simulation.service';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit {
  @ViewChild('canvas', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  private env: number[][] = [];

  constructor(private simulationService: SimulationService) {
  }

  generateEnvironment() {
    this.simulationService.putGenerate().subscribe(matrix => {
      this.env = matrix;
      this.drawEnvironment();
    });
  }

  getNextStep() {
    this.simulationService.getNextGen().subscribe(matrix => {
      this.env = matrix;
      this.drawEnvironment();
    });
  }

  private drawHexagon(size: number, xCenter: number, yCenter: number, color: string): void {
    const numberOfSides = 6;

    this.ctx.beginPath();
    this.ctx.moveTo(xCenter + size * Math.sin(0), yCenter + size * Math.cos(0));

    for (let i = 1; i <= numberOfSides; i += 1) {
      this.ctx.lineTo(xCenter + size * Math.sin(i * 2 * Math.PI / numberOfSides),
        yCenter + size * Math.cos(i * 2 * Math.PI / numberOfSides));
    }

    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  private drawEnvironment() {
    const xStart = 12;
    const yStart = 25;
    let color: string;

    for (let i = 0; i < this.env.length; i++) {
      for (let j = 0; j < this.env[0].length; j++) {

        color = this.env[i][j] === 0 ? '#00f' : '#FFA500';
        if (i % 2 === 0) {
          this.drawHexagon(10, xStart + 13 + j * 18, yStart + 5 + i * 15, color);
        } else {
          this.drawHexagon(10, xStart + 5 + j * 18, yStart + 5 + i * 15, color);
        }
      }
    }
  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.drawEnvironment();
  }
}
