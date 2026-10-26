import { siteConfig } from './config';

export function getWhatsAppShareUrl(customText?: string): string {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : siteConfig.meta.siteUrl;
  const defaultText = `*Sasikumar & Adithya Wedding Reception*\n\n` +
    `Together with our families, we joyfully invite you to celebrate our Wedding Reception!\n\n` +
    `📅 *Date:* ${siteConfig.event.dateFormatted}\n` +
    `⏰ *Time:* ${siteConfig.event.timeFormatted}\n` +
    `📍 *Venue:* ${siteConfig.venue.name}, ${siteConfig.event.city}\n\n` +
    `🗺️ *Google Maps:* ${siteConfig.venue.googleMapsUrl}\n\n` +
    `🌐 *View Invitation:* ${currentUrl}`;

  const message = customText || defaultText;
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppShare(customText?: string): void {
  const url = getWhatsAppShareUrl(customText);
  window.open(url, '_blank', 'noopener,noreferrer');
}
