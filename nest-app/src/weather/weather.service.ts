import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class WeatherService {
    
    private readonly logger = new Logger(WeatherService.name);
    @Cron('45 * * * * *')
    handleCron(){
        this.logger.debug('Called when the current second is 45');
    }
}
