import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
    imports:[ScheduleModule.forRoot()],
    controllers:[WeatherController],
    providers:[WeatherService]
})
export class WeatherModule {}
