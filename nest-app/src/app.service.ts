import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello fucking World!';
  }

  getHi():string {
    return 'hello';
  }
}
