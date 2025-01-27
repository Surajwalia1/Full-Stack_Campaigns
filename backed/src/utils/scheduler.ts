import schedule from 'node-schedule';
import { sendEmail } from './email';
import { Campaign } from '../models/Campaign';

/**
 * Schedules a marketing campaign to send emails to a list of target recipients at a specified time.
 * 
 * @async
 * @function scheduleCampaign
 * @param {string} campaignId - The unique identifier of the campaign to be scheduled.
 * @param {string[]} targetEmails - An array of email addresses to send the campaign to.
 * 
 * @returns {Promise<void>} Resolves when the campaign is successfully scheduled or logs an error if scheduling fails.
 * 
 * @example
 * const campaignId = "60f7d72e99b7c1a2d8e45392";
 * const targetEmails = ["user1@example.com", "user2@example.com"];
 * 
 * scheduleCampaign(campaignId, targetEmails);
 */

export const scheduleCampaign = async (campaignId: string, targetEmails: string[]) => {
  try {
    const campaign = await Campaign.findById(campaignId).exec();

    if (!campaign) {
      console.error('Campaign not found.');
      return;
    }

    const { scheduledTime, message, category } = campaign;
    const scheduleDate = new Date(scheduledTime);

    console.log("Scheduled Time: ", scheduleDate);
    console.log("Current Time: ", new Date());

    // Ensure the scheduled time is valid and in the future
    if (isNaN(scheduleDate.getTime())) {
      console.error("Invalid scheduled time.");
      return;
    }

    if (scheduleDate <= new Date()) {
      console.error("Scheduled time is in the past. Cannot schedule the campaign.");
      return;
    }

    // Schedule the campaign email
    console.log(`Scheduling email at: ${scheduleDate}`);
    schedule.scheduleJob(scheduleDate, async () => {
      console.log(`Executing campaign: ${campaignId}`);
      const emailSubject = `Marketing Campaign - ${category}`;
      const emailBody = message;
      console.log(`Email Subject: ${emailSubject}`);
      
      // Send emails to all target recipients

      targetEmails.forEach(email => {
        try {
          console.log(`Sending email to: ${email}`);
          sendEmail(email, emailSubject, emailBody);
        } catch (error) {
          console.error(`Failed to send email to ${email}:`, error);
        }
      });
      // for (const email of targetEmails) {
      //   try {
      //     console.log(`Sending email to: ${email}`);
      //     await sendEmail(email, emailSubject, emailBody);
      //   } catch (error) {
      //     console.error(`Failed to send email to ${email}:`, error);
      //   }
      // }
    });

    console.log(`Campaign scheduled: ${campaignId} at ${scheduleDate} for category: ${category}`);
  } catch (error) {
    console.error('Failed to schedule campaign:', error);
  }
};
