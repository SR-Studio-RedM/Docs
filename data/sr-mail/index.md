---
outline: deep
---

# SR Mail — RedM Mail System

A full-featured mail system for RedM. Players send and receive through physical Post Office locations, manage personal and group mailboxes, ship parcels, and see unread mail via a persistent HUD icon styled to match Red Dead's general HUD UX.

## Features

### Mailboxes

- **Personal mailboxes** — auto-generated or custom alphanumeric address (e.g. `1042`). Registered at a Post Office for a configurable fee.
- **Group mailboxes** — custom addresses (1–8 alphanumeric characters, e.g. `SHERIFF`, `VS-1001`). Can be job-gated (minimum grade) or open-member. Up to 3 group mailboxes per player (configurable).
- **Multiple mailbox access** — players see and switch between all mailboxes they have access to inside the UI. Unread counts are aggregated across all boxes and shown on the HUD icon.
- **Address book** — per-character contact list with a configurable maximum. A physical `address_book` item is required to access it; replacement books can be purchased at the Post Office.

### Sending Mail

- **WYSIWYG compose editor** (powered by Pell) with DOMPurify sanitisation on the server before storage.
- **Stamp system** — optionally require stamps to send mail. Administrators can add new stamps and prices via the database.
- **Anonymous sending** — players can choose to hide their identity when composing.
- **Send-rate limiting** — optional cooldown (seconds) between sends to prevent spam.
- **Rich-text body** — HTML formatting with a configurable maximum body length (default 4000 characters).
- **Bird animation** — optional pigeon/crow send animation (configurable model, can be disabled for performance) when using the `/mail` anywhere command.

### Receiving Mail

- **Inbox / folders** — separate inbox and folder views with search, pagination, bulk select, bulk mark-as-read, bulk delete, and permanent delete.
- **Reply / Forward** — one-click reply and forward from the read view (receive-only mode hides these).
- **Real-time new mail notification** — recipients online when a telegram arrives are pushed an update immediately.
- **Polling fallback** — configurable background polling interval (default 60 s) keeps counts fresh even if a push is missed.

### Parcel System

- Send physical inventory items as parcels. Parcel cost = base fee + per-item fee + weight fee.
- Weight-based or slot-based capacity limits (configurable).
- Expiration & auto-return — uncollected parcels return to the sender after a configurable number of days; a configurable return fee applies.
- Parcel collection notification telegram is sent automatically on dispatch.
- Blacklist specific items from being shipped.

### Post Office Locations

- Twelve built-in telegraph office locations (Valentine, Saint Denis, Blackwater, Rhodes, Strawberry, Annesburg, Baccus, Wallace, Armadillo, Tumbleweed, Emerald Ranch, Riggs) with map blips and hold-prompt interaction.
- Per-office service flags: `personal_service`, `group_service`, `parcel_service`, `receive_only`.
- World mailbox **prop detection** — any placed prop matching a configurable list of model names (e.g. `k_m_mailbox_02`) shows a receive-only "Check for mail" prompt within range. Works with housing/placement systems automatically.

### HUD Notification Icon

- Persistent circle icon (black background, configurable ring and envelope colour) in the corner of the screen. Shows a red badge with the total unread count across all mailboxes.
- Hidden when unread count is zero; appears/updates in real-time.
- `/editmailicon` command — drag-to-reposition editor with ring colour, icon colour, size slider, and hide toggle. Position and style are persisted per client via KVP (survives restarts).
- HUD hide/show export — integrate with your server's `/hidehud` or any other UI toggle (see [Exports](/sr-mail/exports)).

### Group Mailbox Management

- In-app **access panel** — owners can add/remove members, grant job-based access with minimum grade, transfer ownership.
- Separate permission levels visible inside the UI access list.
- Programmatic registration via server export for society/job systems (see [Exports](/sr-mail/exports)).

### Discord Logging

- Webhook logging for admin actions and mail events. Configurable webhook URL and embed colour.

### Admin

- `/grantmailtoken [playerID] [personal|group]` — grants a player a mailbox-change token. Requires the `srmail.admin` ACE permission (configurable).
- Change tokens allow players to change their personal mailbox address or register/change a group mailbox address without staff intervention. This is also useful if you want to gate access to these features behind Tebex store items.

## Next steps

- [Installation](/sr-mail/installation)
- [Configuration](/sr-mail/configuration)
- [Commands](/sr-mail/commands)
- [Exports & Integration](/sr-mail/exports)

## Support & License

- **Support:** contact the seller through the Tebex product page or the support Discord listed on your purchase receipt.
- **License:** purchase grants you a single-server license. Redistribution, resale, or sharing of the source code (in whole or part) is prohibited.
- **Updates:** future updates are delivered through your Tebex keymaster account. Your changes in `config/custom/` survive updates automatically.
