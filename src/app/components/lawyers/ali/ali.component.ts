import { Component } from '@angular/core';
import { DirectionService } from 'src/app/shared/direction.service';

@Component({
  selector: 'app-ali',
  templateUrl: './ali.component.html',
  styleUrls: ['./ali.component.css']
})
export class AliComponent {

  constructor(public directionService: DirectionService
  ){}

}
