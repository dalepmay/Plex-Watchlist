# Plex Watchlist API (Unofficial)

This project demonstrates how to programmatically add or remove items from a Plex user's Watchlist using an undocumented Plex cloud API.

Discovered via browser network inspection (XHR requests from Plex Web), this technique uses Plex's discover provider service — not your local Plex Media Server — to manage cloud-based Watchlist entries.

> ⚠️ This uses an undocumented API. It works at time of writing (2025), but may break without notice.

---

## 🚀 Features

- ✅ Add any Plex-supported movie or show to your Watchlist
- ✅ Remove items from your Watchlist
- 📦 Works with your Plex account token — no local server access required

---

## 🛠️ Requirements

- Node.js (18+)
- A valid Plex account
- Your Plex X-Plex-Token (can be found via browser dev tools or via Plex API tools)

---

## 📄 Usage

1. Set your Plex token as an environment variable:

```bash
export PLEX_TOKEN=your-plex-token
