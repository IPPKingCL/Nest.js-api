import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class WeatherService {
    @Cron('45*****')
    handleCron(){
        console.log('test');
    }
}
