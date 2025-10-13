export const safeParse = (k: string) => {
  try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : null; } catch { return null; }
};

const toTitle = (s?: string) => (typeof s === "string" ? s.trim() : "");

export const buildViewerProfile = () => {
  const u = safeParse("currentUser");
  if (!u) return null;
  const chart = safeParse("birthChart") || safeParse("cosmicProfile") || safeParse("astroChart");

  const fullName =
    toTitle(u?.fullName) || toTitle(u?.name) ||
    [toTitle(u?.firstName), toTitle(u?.lastName)].filter(Boolean).join(" ") || "Me";

  const birthday = u?.birthday || u?.birthdate || u?.dob || "";
  const birthTime = u?.birthTime || u?.timeOfBirth || "";

  const city  = u?.city || u?.birthCity || u?.location?.city || "";
  const state = u?.state || u?.birthState || u?.location?.state || "";
  const country = u?.country || u?.birthCountry || u?.location?.country || "";
  const birthLocation = u?.birthLocation || [city, state || country].filter(Boolean).join(", ");

  const profilePicture = u?.profilePicture || u?.avatar || u?.photoURL || u?.profileImage || null;

  const sun    = u?.zodiacSign || chart?.sun || chart?.Sun || chart?.sunSign || "";
  const moon   = chart?.moon || chart?.Moon || chart?.moonSign || "";
  const rising = chart?.rising || chart?.ascendant || chart?.Rising || chart?.Ascendant || "";

  const interests = Array.isArray(u?.interests) ? u.interests : [];

  return {
    id: u?.id || u?.userId || u?.email || "me",
    fullName,
    bio: u?.bio || u?.about || u?.aboutMe || "Hey! I haven’t written my bio yet. 🙂",
    profilePicture,
    location: { city, state, country },
    birthInfo: { birthdate: birthday || null, birthTime: birthTime || null, birthLocation: birthLocation || null },
    astrology: { sunSign: sun || null, moonSign: moon || null, risingSign: rising || null },
    interests,
    privacySettings: {
      showBirthdate: !!birthday,
      showBirthTime: !!birthTime,
      showBirthLocation: !!birthLocation,
      showAstrology: true,
      ...(u?.privacySettings || {}),
    },
    isOnline: true,
    lastSeen: "recently",
  };
};
