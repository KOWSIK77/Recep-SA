export interface TimelineItem {
  time: string;
  title: string;
  description?: string;
}

export interface SiteConfig {
  couple: {
    groom: string;
    bride: string;
    monogram: string;
    logo: string;
    order: string;
    groomBio: string;
    brideBio: string;
    groomPhoto: string;
    bridePhoto: string;
  };
  event: {
    title: string;
    type: string;
    dateFormatted: string;
    timeFormatted: string;
    city: string;
    targetIso: string;
    endIso: string;
    tagline: string;
    invitationSubtitle: string;
    quote: string;
    celebrateNote: string;
    hosts: string;
  };
  venue: {
    name: string;
    addressLine: string;
    cityStateZip: string;
    fullAddress: string;
    googleMapsUrl: string;
    embedUrl: string;
  };
  timeline: TimelineItem[];
  meta: {
    title: string;
    description: string;
    ogImage: string;
    siteUrl: string;
  };
}

export const siteConfig: SiteConfig = {
  couple: {
    groom: 'Sasikumar',
    bride: 'Adithya',
    monogram: 'S & A',
    logo: '/Sasi.png',
    order: 'Sasikumar & Adithya',
    groomBio: 'The groom. Calm, kind-hearted and always the first to laugh.',
    brideBio: 'The bride. Graceful, warm and the heart of every room.',
    groomPhoto: '/assets/groom.jpg',
    bridePhoto: '/assets/bride.jpg',
  },
  event: {
    title: 'Sasikumar & Adithya Wedding Reception',
    type: 'Wedding Reception',
    dateFormatted: 'Sunday, 1 November 2026',
    timeFormatted: '6:00 PM to 9:30 PM (IST, UTC+05:30)',
    city: 'Dharapuram, Tamil Nadu',
    targetIso: '2026-11-01T18:00:00+05:30',
    endIso: '2026-11-01T21:30:00+05:30',
    tagline: 'Together with their families',
    invitationSubtitle: 'Invite you to their Wedding Reception',
    quote: 'Two hearts, one journey, and an evening of blessings to begin it.',
    celebrateNote:
      'With the blessings of our elders and the love of our family and friends, we joyfully invite you to share the evening as we begin our married life together. Your presence and good wishes will make our celebration complete.',
    hosts: "Groom's parents & Bride's parents",
  },
  venue: {
    name: 'Sree Velavar Mandapam',
    addressLine: 'Pollachi Main Road, Dharapuram',
    cityStateZip: 'Tiruppur District, Tamil Nadu 638656',
    fullAddress: 'Sree Velavar Mandapam, Pollachi Main Road, Dharapuram, Tamil Nadu 638656',
    googleMapsUrl: 'https://maps.app.goo.gl/qnZ19PVvL13PUDCz6',
    embedUrl: 'https://www.google.com/maps?q=Sree+Velavar+Mandapam+Dharapuram&output=embed',
  },
  timeline: [
    { time: '6:00 PM', title: 'Guests Arrive & Welcome', description: 'Traditional welcome with rose water, sandal paste, and refreshments.' },
    { time: '6:30 PM', title: 'Couple on Stage & Blessings', description: 'The grand entrance of Sasikumar & Adithya followed by blessings.' },
    { time: '7:30 PM', title: 'Photos with the Couple', description: 'Capturing timeless memories with cherished family and friends.' },
    { time: '8:00 PM', title: 'Dinner Feast', description: 'A sumptuous traditional South Indian vegetarian and celebratory dinner spread.' },
    { time: '9:30 PM', title: 'Warm Farewell', description: 'Gratitude, parting gifts, and sweet memories to cherish.' },
  ],
  meta: {
    title: 'Sasikumar & Adithya | Wedding Reception | 1 November 2026',
    description: 'Join us in celebrating the wedding reception of Sasikumar & Adithya on Sunday, 1 November 2026 at Sree Velavar Mandapam, Dharapuram.',
    ogImage: '/assets/og-image.jpg',
    siteUrl: 'https://sasikumar-adithya-reception.vercel.app',
  },
};
