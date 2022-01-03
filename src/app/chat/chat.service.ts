import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatService{

    private socket = io.io('http://localhost:3000');

    joinRoom(data: any)
    {

        this.socket.emit('join',data);
    }

    newUserJoined()
    {
        let observable = new Observable<{id: String, userName:String, message:String, joined: Boolean}>(observer=>{
            this.socket.on('new user joined', (data: any)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    leaveRoom(data: any){
        this.socket.emit('leave',data);
    }

    userLeftRoom(){
        let observable = new Observable<{id: String, userName:String, message:String, joined: Boolean}>(observer=>{
            this.socket.on('left room', (data: any)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    sendMessage(data: any)
    {
        this.socket.emit('message',data);
    }

    newMessageReceived(){
        let observable = new Observable<{id: String,userName:String, message:String, joined: Boolean}>(observer=>{
            this.socket.on('new message', (data: any)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }
    login(data: any)
    {
        this.socket.emit('login',data);
    }
    setSocketUsername(name: any)
    {
        this.socket.emit('set-username',name);
    }
    newUserAdded(){
        let observable = new Observable<any>(observer=>{
            this.socket.on('list-users', (data: any)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }
    newConnection(){
        let observable = new Observable<String>(observer=>{
            this.socket.on('new-connection', (data: String)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }
    removeConnection(){
        let observable = new Observable<String>(observer=>{
            this.socket.on('remove-connection', (data: String)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }
}