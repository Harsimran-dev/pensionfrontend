import { Component, HostListener, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/models/Message';
import { AdminserviceService } from 'src/app/services/adminservice/adminservice.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { MessageserviceService } from 'src/app/services/messageservice/messageservice.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent {
  userId: any;
  @Input('wordLimit') limit!: number;
  name!: string;

  messageContent: string = '';
  previousConversations: any[] = [];
  usersMap: Map<number, any> = new Map<number, any>();
  constructor(private authService: AuthenticationService,private route: ActivatedRoute,private router: Router ,private messageService: MessageserviceService) { }


  ngOnInit(): void {

    this.fetchPreviousConversations();
    this.fetchUsers();

  }
  @HostListener('input', ['$event'])
  onInput(event: any) {
    const value = event.target.value;
    const words = value.split(/\s+/).slice(0, this.limit);
    event.target.value = words.join(' ');
  }



  sendMessage(): void {
    if (!this.messageContent.trim()) {
      console.error('Message content is empty.');
      return;
    }
    const message: Message = {
      content: this.messageContent,
      senderId: StoreService.getUserData().userId,
      recipientId: 1,
      userId:  StoreService.getUserData().userId,
      timestamp: new Date().toISOString()
    };
    console.log(message);
  
    this.messageService.addMessage(message).subscribe(
      response => {
        console.log('Message sent successfully:', response);
        this.messageContent = '';
  
      },
      error => {
        console.error('Failed to send message:', error);
      }
    );
    window.location.reload();
   
  }

  fetchPreviousConversations(): void {
    this.messageService.getMessagesByUserId(StoreService.getUserData().userId).subscribe(
      messages => {
        this.previousConversations = messages;
        console.log('Previous conversations:', this.previousConversations);
      },
      error => {
        console.error('Failed to fetch previous conversations:', error);
      }
    );
  }
  fetchUsers(): void {
    this.authService.getAllUsers().subscribe(
      (users: any[]) => {
        users.forEach(user => {
          this.usersMap.set(user.id, user);
          console.log(this.usersMap)
        });
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  
  

}
