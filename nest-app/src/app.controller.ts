import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
    @Get()
    home(){
        return 'Welcome to my Movie';
    }

    @Get()
    home2() {
        return 'test push origin master';
    }



    @Get()
    home3() {
        return 'pushpush';
    }
}
