import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers:[ChatService]
})
export class ChatComponent {

  userName = "";
  id = "";
  room!:String;
  joinedRoom = [];
  availableRoom = ["Hall", "Deluxe","Lobby"];
  messageText!:String;
  messageArray:Array<{id: String, userName:String,message:String, joined: Boolean}> = [];
  userArray:Array<{userName:String}> = [];
  activeUserArray:Array<{userName:String}> = [];
  constructor(private _chatService:ChatService, private router: Router){
      let user = JSON.parse(localStorage.getItem('User')|| '{}');
      if(user.userName) {
        this.userName = user.userName;
        this.id = user.id;
      }
      if(this.id === ""){
        this.id = this.newGuid();
      }

      console.log(this.userName)
      if(this.userName === ""){
        let path = '/authen';
        this.router.navigate([path]);
      }
      this._chatService.setSocketUsername(this.userName);
      this.joinedRoom = JSON.parse(localStorage.getItem('User')|| '{}').room;
      this._chatService.newUserJoined()
      .subscribe((data: any)=> this.messageArray.push(data));

      this._chatService.newUserAdded()
      .subscribe((data: any)=> this.userArray = data);

      this._chatService.newConnection()
      .subscribe((data: any)=> this.activeUserArray.push(data));
      this._chatService.removeConnection()
      .subscribe((data: any)=> this.activeUserArray.filter((item: any) => item !== data));

      this._chatService.userLeftRoom()
      .subscribe((data: any)=>this.messageArray.push(data));

      this._chatService.newMessageReceived()
      .subscribe((data: any)=>this.messageArray.push(data));
  }

  join(){
      let user = JSON.parse(localStorage.getItem('User')|| '{}');
      if(!user.room.includes(this.room)){
        user.room.push(this.room);
      }
      localStorage.setItem("User", JSON.stringify({ id: user.id, userName: user.userName, room: user.room }));
      this.joinedRoom = user.room;
      this._chatService.joinRoom({id: this.id, userName:this.userName, room:this.room});
  }

  leave(){
    let user = JSON.parse(localStorage.getItem('User')|| '{}');
    if(user.room.includes(this.room)){
      user.room = user.room.filter((item: any) => item !== this.room)
    }
    localStorage.setItem("User", JSON.stringify({ userName: user.userName, room: user.room }));
    this.joinedRoom = user.room;
    this._chatService.leaveRoom({id: this.id, userName:this.userName, room:this.room});
  }

  sendMessage()
  {
      let userx = JSON.parse(localStorage.getItem('User')|| '{}');
      if(!userx.room.includes(this.room)){
        window.alert("You are not in this room");
        return;
      }

      this.messageArray.push({id: this.id, message: this.messageText, userName: this.userName, joined: false});
      this._chatService.sendMessage({id: this.id,userName:this.userName, room:this.room, message:this.messageText, joined: false});
      console.log(this.messageArray)
  }
  chooseRoom(room: string){
    this.room = room;
    this.join()
  }

  selectRoom(room: string){
    this.room = room;
    this.join()
  }

  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
}
