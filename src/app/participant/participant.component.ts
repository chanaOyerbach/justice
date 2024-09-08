import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Participant } from '../models/participant.model';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent {
  @Input() participant!: Participant;
  @Output() mute = new EventEmitter<Participant>();

  onMute() {
    this.mute.emit(this.participant);
  }
}
