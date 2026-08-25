---
outline: deep
---

# Configuration

SR Mail uses a **modular multi-file config** system designed to survive updates cleanly.

```text
config/
├── _default.lock/     # NEVER edit — overwritten on updates
│   ├── _init.lua      # Config = {} bootstrap
│   ├── global.lua     # Logging, locale, framework, limits, admin
│   ├── items.lua      # Item names, prices, tokens
│   ├── mailbox.lua    # Registration costs, limits, auto-generation
│   ├── discord.lua    # Webhook URL, embed color
│   ├── display.lua    # HUD icon, prompts, bird animation, mailbox props
│   ├── locations.lua  # Towns, telegraph offices
│   └── stamps_parcels.lua  # Stamp reqs, parcel limits, pricing
└── custom/            # YOUR overrides go here
    └── README.md
```

## How to customize

1. Find the config file in `_default.lock/` with the setting you want to change.
2. **Copy it** into `custom/` (same filename).
3. Edit only the values you want to change.
4. Restart the resource or run `/refresh`.

::: warning Important rules
- The **entire file is replaced** — not merged. Copy the whole file, then change values.
- Only copy files you need to change — unchanged files keep their defaults.
- Never edit files inside `_default.lock/` — those will be overwritten on updates.
- On updates, new config options appear in `_default.lock/` automatically; copy the updated file to `custom/` and re-apply your changes.
:::

### Example

To change the mail cooldown and locale:

1. Copy `_default.lock/global.lua` → `custom/global.lua`
2. Edit `custom/global.lua`:

```lua
Config.MailSendCooldown = 30  -- Changed from 0 to 30 seconds
Config.Locale = "de"          -- Changed from "en" to "de"
```

3. Restart the resource.

## Config reference

### `global.lua`

| Key | Default | Description |
| --- | --- | --- |
| `LogVerbosity` | `"WARN"` | `"NONE"` / `"INFO"` / `"WARN"` / `"ERROR"` |
| `Locale` | `"en"` | Locale key in `locales/` |
| `FrameworkName` | `"VORP"` | `"VORP"` / `"RedEM"` / `"QBR"` / `"Standalone"` |
| `CharIdentifierField` | `"charidentifier"` | Character ID column |
| `EnableMailCommand` | `false` | Allow `/mail` outside Post Office |
| `MailSendCooldown` | `0` | Seconds between sends (0 = no limit) |
| `MaxMailSubjectLength` | `300` | Max subject characters |
| `MaxMailBodyLength` | `4000` | Max body characters |
| `MaxAddressBookEntries` | `500` | Max contacts per address book |
| `AdminACEPermission` | `"srmail.admin"` | ACE node for admin commands |
| `LogAdminActions` | `true` | Log admin actions to Discord |

### `items.lua`

| Key | Default | Description |
| --- | --- | --- |
| `RequiredItem` | `"telegram_voucher"` | Item for `/mail` away from Post Office |
| `AddressBookItem` | `"address_book"` | Address book item name |
| `TelegramVoucherPrice` | `2.00` | Cost to buy a voucher |
| `AddressBookReplacementPrice` | `5.00` | Cost to buy replacement address book |
| `PersonalMailboxChangeToken` | `"mailbox_change_token"` | Token for personal mailbox change |
| `GroupMailboxChangeToken` | `"group_mailbox_token"` | Token for group mailbox change |

### `mailbox.lua`

| Key | Default | Description |
| --- | --- | --- |
| `AutoGenerateMailbox` | `true` | Auto-assign numeric addresses |
| `StartingMailboxNumber` | `1000` | First auto-generated number |
| `MailboxRegistrationCost` | `10.00` | Personal mailbox fee |
| `PersonalMailboxChangeCost` | `25.00` | Fee to change personal address |
| `GroupMailboxCost` | `50.00` | Group mailbox registration fee |
| `GroupMailboxChangeCost` | `50.00` | Fee to change group address |
| `MaxGroupMailboxesPerPlayer` | `3` | Max owned group mailboxes |
| `MaxGroupMembers` | `10` | Max members per group mailbox |

### `display.lua`

| Key | Default | Description |
| --- | --- | --- |
| `UsePrompts` | `true` | Use RedM interaction prompts |
| `PromptKey` | `nil` | Custom control hash (nil = default E key) |
| `CheckMailInterval` | `60000` | Unread poll interval (ms) |
| `EnableUnreadPolling` | `true` | Background unread polling |
| `NotificationDuration` | `5000` | Toast notification duration (ms) |
| `ShowMailIcon` | `true` | Persistent HUD mail icon |
| `MailIconPosition` | `{0.95, 0.02}` | Icon screen position |
| `MailIconSize` | `0.020` | Icon scale |
| `EnableBirdAnimation` | `false` | Bird send animation |
| `MailBirdModel` | `"A_C_PIGEON"` | Bird model for animation |
| `UseHUDIntegration` | `false` | Push counts to external HUD |
| `HUDExportName` | `""` | HUD export resource name |
| `HUDMailCountEvent` | `""` | HUD event name |
| `EnableMailboxProps` | `true` | World prop detection |
| `MailboxPropPromptDistance` | `2.0` | Prop interaction range |
| `MailboxPropPromptLabel` | `"Check for mail"` | Prop prompt text |
| `MailboxPropNames` | (table) | Prop model names for detection |

Reference: [Keybind Hash Lookup](https://github.com/femga/rdr3_discoveries/blob/master/Controls/README.md#onfoot--0xf5a638b9---173655879)

### `stamps_parcels.lua`

| Key | Default | Description |
| --- | --- | --- |
| `EnableStamps` | `true` | Enable stamp system |
| `RequireStamps` | `true` | Require stamps to send |
| `EnableParcels` | `true` | Enable parcel system |
| `ParcelUseWeight` | `true` | Weight-based (true) or slot-based (false) |
| `ParcelMaxWeight` | `15.0` | Max parcel weight (lbs) |
| `ParcelMaxSlots` | `10` | Max parcel slots |
| `ParcelExpirationDays` | `7` | Days before uncollected return |
| `ParcelExpirationHours` | `96` | Hours before parcel expires |
| `ParcelReturnFee` | `0.50` | Auto-return fee |
| `ParcelBasePrice` | `5.0` | Base send cost |
| `ParcelPricePerItem` | `0.5` | Per-item cost |
| `ParcelPricePerPound` | `0.5` | Per-pound cost |
| `ParcelBlacklistedItems` | (table) | Items barred from parcels |

### `discord.lua`

| Key | Default | Description |
| --- | --- | --- |
| `EnableDiscordLogs` | `true` | Enable webhook logging |
| `DiscordWebhook` | (URL) | Discord webhook URL |
| `DiscordColor` | `15844367` | Embed color (decimal) |

Reference: [Discord Color code generator](https://www.vibebot.gg/tools/colors)

### `locations.lua`

| Key | Default | Description |
| --- | --- | --- |
| `Towns` | (table) | Town coordinates for location stamps |
| `MaxTownDistance` | `500.0` | Max units from town center |
| `TelegraphOffices` | (table) | Post office locations, blips, service flags |

## Localization

- Set locale in `config/_default.lock/global.lua` or `config/custom/global.lua`: `Config.Locale = "en"`
- Locale string tables are in `locales/` (default: `locales/en.lua`).
- Processing functions are in `locales/localizer.lua`.

### Adding a new language

1. Create a new file in `locales/` (e.g. `locales/es.lua`) and define `SRMailLuaLocale.data.es`.
2. Set `Config.Locale = "es"` in your config.
3. Add the new locale file to `shared_scripts` in `fxmanifest.lua` before `locales/localizer.lua`.
