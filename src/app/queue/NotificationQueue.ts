import Email from "../../domain/Email";

export default interface NotificationQueue {
  send: (email: Email, subject: string, body: string) => Promise<void>
}