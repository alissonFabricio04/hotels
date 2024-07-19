import NotificationQueue from "../../app/queue/NotificationQueue";
import Email from "../../domain/Email";

export default class NotificationQueueImpl implements NotificationQueue {
  async send(email: Email, subject: string, body: string): Promise<void> {
    console.log(subject, body)
  }
}