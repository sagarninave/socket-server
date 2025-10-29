import cron, { ScheduledTask } from "node-cron";

export const Scheduler: ScheduledTask = cron.schedule("0 * * * *", (): void => {
  console.log("Reminder for expiring service sent!");
});
