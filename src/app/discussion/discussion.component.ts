import { Component, OnInit } from '@angular/core';
import { ParticipantsService } from '../participants.service';
import { Participant } from '../models/participant.model';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {
  participants: Participant[] = [];
  isAdmin = false;  
  userId = 1; 
  password: string = ''; 


  constructor(private participantsService: ParticipantsService) {}

  ngOnInit() {
    this.participantsService.getParticipants().subscribe((data) => {
      this.participants = data;
    });

    this.participantsService.login(this.userId,this.password).subscribe((data) => {
      this.isAdmin = data.IsAdmin;
    });
  }

  muteParticipant(participant: Participant) {
    if (!this.isAdmin && participant.role === 'judge') {
      alert('אין לך הרשאה להשתיק את השופט.');
      return;
    }
    participant.isMuted = !participant.isMuted;
  }

  muteAll() {
    if (!this.isAdmin) {
      alert('רק שופט יכול להשתיק את כל המשתתפים.');
      return;
    }
    this.participantsService.muteAll(this.userId).subscribe(() => {
      this.participants.forEach(participant => {
        if (participant.role !== 'judge') {
          participant.isMuted = true;
        }
      });
    });
  }
}
