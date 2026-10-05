import { assetManifest } from '../assets/manifest';

export interface Pillar {
  id: string;
  number: string;
  title: string;
  description: string;
  route: string;
  image: string;
  imageAlt: string;
}

export const pillars: Pillar[] = [
  {
    id: "financing",
    number: "01",
    title: "Investor Financing",
    description: "DSCR, fix and flip, and ground-up construction loans, structured around the property.",
    route: "/financing",
    image: assetManifest.pillars.financing,
    imageAlt: "Urban residential architecture and multi-family property",
  },
  {
    id: "education",
    number: "02",
    title: "Education",
    description: "The YouTube channel and The DSCR Illusion, for investors who want the full picture.",
    route: "/learn",
    image: assetManifest.pillars.education,
    imageAlt: "Studio desk with property blueprints, books, and analysis notes",
  },
  {
    id: "speaking",
    number: "03",
    title: "Speaking",
    description: "Sessions for mortgage teams and real estate audiences, built from the channel's best ideas.",
    route: "/speaking",
    image: assetManifest.pillars.speaking,
    imageAlt: "Keynote presentation hall at real estate conference",
  },
  {
    id: "advisory",
    number: "04",
    title: "Video Content Advisory",
    description: "One-on-one and small-group strategy for mortgage professionals building a consumer-direct business.",
    route: "/advisory",
    image: assetManifest.pillars.advisory,
    imageAlt: "Private executive advisory consultation room",
  },
];
