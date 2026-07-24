# Beta Issue Triage

Use this guide to decide what to fix after a tester gives feedback.

## Severity Levels

| Severity | Meaning | Examples | Action |
| --- | --- | --- | --- |
| Blocker | The tester cannot complete a core flow. | App will not load, place cards crash, Detail cannot open, Saved does not persist. | Fix before any more testing. |
| High | The app works, but trust or comprehension is seriously hurt. | Tester misunderstands the app purpose, data sounds too official, age guidance is misleading, fee/reservation copy could cause a bad outing. | Fix before wider beta. |
| Medium | The experience is usable but noticeably rough. | Card feels crowded, filter labels are unclear, Profile copy is too long, feedback button labels need tuning. | Batch into the next polish pass. |
| Low | Nice-to-have polish or future product idea. | More illustrations, more categories, account preferences, map browsing, text feedback. | Record, but do not interrupt MVP validation. |

## Status Values

- `new`: recorded but not reviewed.
- `accepted`: should become a task.
- `deferred`: useful, but not needed for this beta round.
- `blocked`: needs user decision, account access, source check, or field visit.
- `fixed`: implemented and ready for QA.
- `closed`: no action needed.

## Triage Questions

Ask these in order:

1. Does this stop a tester from using Home, Detail, Saved, or Profile?
2. Could this make a parent trust bad or overly certain information?
3. Is this about core MVP value, or a later product feature?
4. Can this be fixed with copy/data/UI only?
5. Does this require official source checking or a parent field visit?

## MVP Fix Now

Fix during MVP beta if the issue affects:

- Understanding what Outdoor Nursery is for.
- Choosing a place from Home.
- Reading Place Card basics.
- Trusting Detail page data boundaries.
- Saving and unsaving places.
- Anonymous quick feedback.
- Privacy/data explanation.

## Defer For Later

Defer unless several testers ask for it:

- Login or cloud saved places.
- Text reviews.
- Photos.
- Live location.
- In-app maps.
- Push notifications.
- Broader regions beyond Bay Area.
- Field verification for every place.

## Issue Format

Use this format in [Beta Feedback Log](beta-feedback-log.md):

```text
ID:
Severity:
Status:
Screen:
Place:
Tester quote:
Observed problem:
Expected behavior:
Decision:
Next action:
```
