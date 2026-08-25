---
outline: deep
---

# Exports & Integration

## Client exports

### `SetMailIconVisible(visible: boolean)`

Fade the mail notification icon out or in. Use this to integrate with `/hidehud` or any other UI-hide system.

```lua
-- Fade out (e.g. when HUD is hidden)
exports['sr_mail']:SetMailIconVisible(false)

-- Fade back in
exports['sr_mail']:SetMailIconVisible(true)
```

The icon will only fade back in if there is at least one unread message and the player has not manually hidden it via `/editmailicon`.

### `ToggleMailIconVisible()`

Toggle the icon between visible and hidden with a fade.

```lua
exports['sr_mail']:ToggleMailIconVisible()
```

**Example — hooking into a `/hidehud` command in another resource:**

```lua
-- In your HUD resource (client-side)
local hudHidden = false

RegisterCommand('hidehud', function()
    hudHidden = not hudHidden
    -- ... hide/show your own HUD elements ...
    exports['sr_mail']:SetMailIconVisible(not hudHidden)
end, false)
```

## Server exports

### `RegisterGroupMailboxForSociety(mailbox, label, job, ownerCharId, minGrade)`

Programmatically register a group/society mailbox. Useful for job/society systems that create organisations dynamically.

```lua
-- From another server-side script
exports['sr_mail']:RegisterGroupMailboxForSociety(
    'LAW',            -- Mailbox address (1-8 alphanumeric)
    'Lawmen Office',  -- Display label
    'lawmen',         -- Job name (nil for non-job group)
    charIdentifier,   -- Owner character identifier
    0                 -- Minimum job grade required
)
```

Returns `true` on success, `false` if the mailbox already exists or parameters are missing.

## NUI architecture

The NUI is split into two independent modules:

- **Mail module** (`nui/js/mail/`) — compose, inbox, folders, address book, unread icon.
- **Post Office module** (`nui/js/postoffice/`) — mailbox registration, stamp purchase, address book replacement, parcel management, group mailbox access.

Both share config via the `shared_scripts` mechanism in `fxmanifest.lua`. HTML sanitisation uses DOMPurify (client) and a server-side Lua sanitiser (`server/html-sanitizer.lua`) before any content is written to the database.

All third-party NUI libraries (jQuery, Pell, DOMPurify) are bundled locally in `nui/lib/` — no internet connection is required at runtime.
