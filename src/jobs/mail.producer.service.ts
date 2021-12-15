import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { UserDTO } from 'src/user/user.dto';

@Injectable()
export class MailProducerService {
  constructor(@InjectQueue('sendMail-queue') private queue: Queue) {}

  async sendMail(user: UserDTO) {
    await this.queue.add('sendMail-job', user);
  }
}
