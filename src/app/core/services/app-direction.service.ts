import { Injectable, EventEmitter, Output } from '@angular/core';
import { BidiModule, Direction, Directionality } from '@angular/cdk/bidi';
@Injectable()
export class AppDirectionService {

  private direction: Direction;
  @Output() change: EventEmitter<Direction> = new EventEmitter();

  constructor(
    private dir: Directionality
  ) {

    // this.direction = dir.value;
    this.direction = 'ltr';
   }

   switchDir(dir: Direction) {
    this.direction = dir;
    this.change.emit(this.direction);
  }

  getDir() {
    return this.direction;
  }
}
