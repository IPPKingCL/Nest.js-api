import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { FaceChatService } from './face-chat.service';
import { Server, Socket } from 'socket.io';

export class FaceChatGateWay implements OnGatewayConnection, OnGatewayDisconnect{
    
    constructor(
        private readonly faceChatService : FaceChatService
    ){
    }

    @WebSocketServer()
    server : Server
    
    
    handleDisconnect(client: any) {
        throw new Error('Method not implemented.');
    }
    handleConnection(client: any, ...args: any[]) {
        throw new Error('Method not implemented.');
    }

}