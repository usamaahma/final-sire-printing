import { NextResponse } from "next/server";

// Isse reviews 1 ghante (3600 seconds) tak cache rahenge.
// Jitni bhi viewership aaye, SerpApi se data ghante mein sirf 1 baar fetch hoga.
export const revalidate = 3600;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const nextToken = searchParams.get("next_token") || "";

  const PLACE_ID = "ChIJobCe2YFFwokRytFCw4neoUc";
  // Pro Tip: Bhai API Key hamesha .env file mein rakha karo, direct code mein safe nahi hoti.
  const API_KEY =
    "ccd628cbd11a5cab2169febc885769aada7a29b79f93dfe8a7eb2fd9a6883ced";

  let url = `https://serpapi.com/search.json?engine=google_maps_reviews&place_id=${PLACE_ID}&api_key=${API_KEY}`;
  if (nextToken) url += `&next_page_token=${nextToken}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Fetch level caching
    });

    const data = await res.json();

    return NextResponse.json({
      reviews: data.reviews || [],
      next_token: data.serpapi_pagination?.next_page_token || null,
    });
  } catch (error) {
    console.error("SerpApi Error:", error);
    return NextResponse.json(
      { reviews: [], error: "Failed to fetch" },
      { status: 500 },
    );
  }
}
