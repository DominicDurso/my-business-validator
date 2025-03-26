import googleTrends from 'google-trends-api';

export async function getTrendsData(keyword) {
  try {
    const results = await googleTrends.interestOverTime({
      keyword,
      startTime: new Date('2024-01-01'), // Or any date range you prefer
      geo: 'US', // Optional: restrict to a specific country, e.g. 'US'
    });
    // The returned string is JSON; parse it
    return JSON.parse(results);
  } catch (error) {
    console.error("Google Trends Error:", error);
    return null;
  }
}