/**
 * Assets Manifest (Single place to replace all imagery and media per PRD Section 20)
 * Uses high-quality architectural, editorial, and conference photography with a restrained navy/warm grade.
 */

export interface AssetManifest {
  hero: {
    portrait: string;
    portraitAlt: string;
    videoPoster: string;
    videoMp4: string;
    videoWebm: string;
  };
  pillars: {
    financing: string;
    education: string;
    speaking: string;
    advisory: string;
  };
  book: {
    coverFront: string;
    cover3DTexture: string;
  };
  speaking: {
    hero: string;
    stage: string;
  };
  about: {
    portraitLarge: string;
    mosaic: Array<{
      id: string;
      url: string;
      caption: string;
      aspect: string;
    }>;
  };
  thumbnails: Record<string, string>;
}

export const assetManifest: AssetManifest = {
  hero: {
    // Marcus Hale portrait placeholder - editorial, calm, professional
    portrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
    portraitAlt: "Marcus Hale, mortgage investor financing specialist and advisor",
    // Architectural facade at dusk
    videoPoster: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    videoMp4: "https://assets.mixkit.co/videos/preview/mixkit-modern-building-facade-at-sunset-41484-large.mp4",
    videoWebm: "https://assets.mixkit.co/videos/preview/mixkit-modern-building-facade-at-sunset-41484-large.mp4",
  },
  pillars: {
    // 01 Investor Financing - brownstone / urban residential brick
    financing: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
    // 02 Education - desk with architectural drawings and notes
    education: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
    // 03 Speaking - auditorium / keynote hall presentation
    speaking: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80",
    // 04 Advisory - private quiet meeting office
    advisory: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80",
  },
  book: {
    coverFront: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    cover3DTexture: "linear-gradient(135deg, #0E1A2B 0%, #1B2B44 100%)",
  },
  speaking: {
    hero: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    stage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
  },
  about: {
    portraitLarge: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
    mosaic: [
      {
        id: "mosaic-1",
        url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
        caption: "Keynote on residential capital structures, Dallas 2025",
        aspect: "aspect-[4/3]",
      },
      {
        id: "mosaic-2",
        url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
        caption: "On-site framing review, 4-unit ground-up build in Austin",
        aspect: "aspect-[3/4]",
      },
      {
        id: "mosaic-3",
        url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
        caption: "Private office advisory session with mortgage team leads",
        aspect: "aspect-square",
      },
      {
        id: "mosaic-4",
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        caption: "Recording weekly channel insights in the studio",
        aspect: "aspect-[4/3]",
      },
      {
        id: "mosaic-5",
        url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
        caption: "The DSCR Illusion launch at National Mortgage Symposium",
        aspect: "aspect-[16/9]",
      },
    ],
  },
  thumbnails: {
    "v1": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    "v2": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "v3": "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80",
    "v4": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "v5": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    "v6": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    "v7": "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80",
    "v8": "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=800&q=80",
    "v9": "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80",
    "v10": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "v11": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
    "v12": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
    "v13": "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=800&q=80",
    "v14": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    "v15": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
  },
};
