---
outline: deep
---

# Installation

## Requirements

| Dependency | Notes |
| --- | --- |
| `mysql-async` | Database queries |
| `vorp_inventory` | Item checks, granting, and removal (VORP framework) |
| VORP Core | Character/job data |

Supported frameworks (set `Config.FrameworkName`): `VORP`, `RedEM`, `QBR`, `Standalone`.

## Framework setup

SR Mail ships with a VORP bridge by default (`server/bridge.lua`, escrow-ignored so you can adapt it). Set the framework in `config/custom/global.lua`:

```lua
Config.FrameworkName = "VORP" -- "VORP" / "RedEM" / "QBR" / "Standalone"
```

| Framework | What the bridge uses |
| --- | --- |
| `VORP` | `vorp_core` (character/job/money) + `vorp_inventory` (items) |
| `RedEM` | RedEM:Reloaded core + inventory events |
| `QBR` | qbr core + player data |
| `Standalone` | Money/item callbacks are stubbed — wire them in `server/bridge.lua` to your own systems |

If your server uses a custom or heavily modified framework, edit `server/bridge.lua` directly — it is intentionally left un-escrowed for this purpose.

## Required items

The following inventory items must exist on your server (add via your framework's item editor or SQL):

| Item | Purpose | Default price (in-resource) |
| --- | --- | --- |
| `telegram_voucher` | Allows `/mail` away from a Post Office | $2.00 |
| `address_book` | Unlocks the address book UI | $5.00 (replacement) |
| `mailbox_change_token` | Player-initiated personal mailbox address change | granted via admin |
| `group_mail_token` | Player-initiated group mailbox registration/change | granted via admin |
| Stamp items (see `config/_default.lock/stamps_parcels.lua`) | Required to send mail when stamps are enabled | purchased at Post Office |

For VORP/RSG servers, items are auto-registered on startup. To import them manually instead (or for other frameworks), run `install/items.sql`.

## Steps

1. Copy `sr_mail` into your `resources` folder.
2. Add `ensure sr_mail` to your `server.cfg` (after `mysql-async` and any framework resources). Database tables are created automatically on first start.
3. *(Optional)* Import items manually via `install/items.sql` if not using VORP/RSG auto-registration.
4. Restart the resource once after first start to ensure new tables are loaded.
5. Review the config in `config/_default.lock/` — see [Configuration](/sr-mail/configuration).

## ACE Permissions

Add to your `server.cfg` to grant admin access:

```cfg
add_ace group.admin srmail.admin allow
```

## Default keybinds

Post Office interactions use RedM prompts. The default interact key is **E** (`INPUT_CONTEXT_Y`). Override it per-server with `Config.PromptKey` in `config/custom/display.lua` (control hash — see [femga's control reference](https://github.com/femga/rdr3_discoveries/blob/master/Controls/README.md)).
