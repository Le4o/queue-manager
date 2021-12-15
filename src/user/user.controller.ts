import { Body, Controller, Get } from '@nestjs/common';
import { MailProducerService } from 'src/jobs/mail.producer.service';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private mailProducerService: MailProducerService) {}

  @Get('/')
  createUser(@Body() user: UserDTO) {
    this.mailProducerService.sendMail(user);
    return user;
  }
}
