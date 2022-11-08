import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
    @Get()
    home(){
        console.log(process.env.RDS_HOST);
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
