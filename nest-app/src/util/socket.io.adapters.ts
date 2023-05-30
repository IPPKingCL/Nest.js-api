import { IoAdapter } from "@nestjs/platform-socket.io";

export class SocketIOAdapter extends IoAdapter {
    createIOServer(port: number, options?: any) {
        const server = super.createIOServer(port, options);

        return server;
    }
}