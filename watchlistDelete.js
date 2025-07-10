export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { media } = req.body;
  
  if (!media) return res.status(400).json({ error: 'Missing media' });
  
  try {
    const ratingKey = media.guid || media.plexRatingKey;
  
    if (!ratingKey) throw new Error('No ratingKey found in media object');
    
    const plexRes = await fetch(`https://discover.provider.plex.tv/actions/removeFromWatchlist?ratingKey=${ratingKey}`, {
      method: 'PUT',
      headers: { 'X-Plex-Token': process.env.PLEX_TOKEN },
    });
    
    if (!plexRes.ok) {
      const errorText = await plexRes.text();
      console.error("Plex API error:", errorText);
      throw new Error(`Failed to remove from watchlist: ${plexRes.status} ${errorText}`);
    } 
    return res.status(200).json({ success: true });
  } catch (e) {
    console.error("Watchlist remove error:", e.message);
    return res.status(500).json({ error: `Failed to update watchlist: ${e.message}` });
  }  
}
