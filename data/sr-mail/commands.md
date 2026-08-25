---
outline: deep
---

# Commands

## Player commands

| Command | Description |
| --- | --- |
| `/mail` | Open mail UI (requires `Config.EnableMailCommand = true` and voucher item when away from Post Office) |
| `/switchmail [mailbox]` | Switch active mailbox |
| `/setgroupmail [ID] [Label] [MinGrade]` | Set a group mailbox address |
| `/mailpermissions` | Open the group mailbox access management panel |
| `/editmailicon` | Open the HUD icon drag-to-reposition / style editor |

## Admin commands

| Command | Permission | Description |
| --- | --- | --- |
| `/grantmailtoken [playerID] [personal\|group]` | `srmail.admin` ACE | Give a player a mailbox-change token |
| `/deletemailbox [MAILBOX]` | `srmail.admin` ACE | Force-delete a group mailbox (cascades to members and messages) |
| `/groupmailowner [MAILBOX] [ServerID]` | `srmail.admin` ACE | Transfer a group mailbox to a different player |

Granting admin access:

```cfg
add_ace group.admin srmail.admin allow
```
