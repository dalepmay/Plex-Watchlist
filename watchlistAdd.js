export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { media } = req.body;

  if (!media) return res.status(400).json({ error: 'Missing media' });

  try {
    const ratingKey = media.plexRatingKey || media.guid;

    if (!ratingKey) throw new Error('No ratingKey found in media object');

    const plexResponse = await fetch(`https://discover.provider.plex.tv/actions/addToWatchlist?ratingKey=${ratingKey}`, {
      method: 'PUT',
      headers: { 'X-Plex-Token': process.env.PLEX_TOKEN },
    });

    if (!plexResponse.ok) {
      const errorText = await plexResponse.text();
      console.error("Plex API error:", errorText);
      throw new Error(`Failed to add to watchlist: ${plexResponse.status} ${errorText}`);
    }
    return res.status(200).json({ success: true });
  } catch (e) {
    console.error("Watchlist add error:", e.message);
    return res.status(500).json({ error: `Failed to update watchlist: ${e.message}` });
  }
}
