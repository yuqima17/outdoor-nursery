# Wireframes

These are low-fidelity mobile wireframes for the Outdoor Nursery MVP.

They describe layout and information hierarchy. They are not final visual design.

## App Shell

```text
+----------------------------------+
| Outdoor Nursery           [City] |
+----------------------------------+
|                                  |
| Page content                     |
|                                  |
+----------------------------------+
|  Go              Saved   Profile |
+----------------------------------+
```

## Home

```text
+----------------------------------+
| Outdoor Nursery          Bay Area|
+----------------------------------+
| Search parks, playgrounds, malls |
+----------------------------------+
| [Parks] [Playgrounds] [Malls]    |
|                                  |
| [Recommended] [Free] [Stroller]  |
| [Restrooms] [Shade]              |
|                                  |
| Recommended Places          20   |
|                                  |
| +------------------------------+ |
| | [image] Magical Bridge       | |
| | Playground · South Bay       | |
| | free · restrooms · inclusive | |
| | Best for: Toddler, Preschool | |
| | Parking: Limited             | |
| | Restroom: Yes                | |
| | [Directions]      [Details]  | |
| +------------------------------+ |
|                                  |
| +------------------------------+ |
| | [image] Shoreline            | |
| | Park · South Bay             | |
| | stroller · lake · exposed    | |
| | Best for: Baby, Toddler      | |
| | Parking: Easy                | |
| | Restroom: Yes                | |
| | [Directions]      [Details]  | |
| +------------------------------+ |
+----------------------------------+
|  Go              Saved   Profile |
+----------------------------------+
```

## Category List

```text
+----------------------------------+
| < Parks                           |
+----------------------------------+
| Parks                         8   |
| [Nearest] [Free] [Restrooms]      |
| [Stroller] [Shade]                |
|                                  |
| +------------------------------+ |
| | [image] Baylands Nature      | |
| | Preserve · South Bay         | |
| | walking trails · restrooms   | |
| | Best: mild mornings          | |
| | Watch: wind, sun, water      | |
| | [Directions]      [Details]  | |
| +------------------------------+ |
|                                  |
| +------------------------------+ |
| | [image] Heather Farm Park    | |
| | East Bay                     | |
| | all-abilities · restrooms    | |
| | Best: morning                | |
| | Watch: heat, ponds           | |
| | [Directions]      [Details]  | |
| +------------------------------+ |
+----------------------------------+
```

## Place Detail

```text
+----------------------------------+
| < Magical Bridge Playground  [♡] |
+----------------------------------+
| [large image or color panel]      |
| Magical Bridge Playground         |
| Playground · South Bay            |
| free · inclusive · restrooms      |
|                                  |
| [Directions] [Save]               |
|                                  |
| Basic Info                        |
| +------------+ +---------------+  |
| | Best for   | | Cost          |  |
| | Toddler +  | | Free          |  |
| +------------+ +---------------+  |
| | Duration   | | Weather       |  |
| | 1-2 hours  | | Mild/cloudy   |  |
| +------------+ +---------------+  |
| | Parking    | | Restroom      |  |
| | Limited    | | Yes           |  |
| +------------+ +---------------+  |
|                                  |
| Before You Go                    |
| Stroller       Partial            |
| Restroom       Yes                |
| Baby care Not reported            |
| Shade          Partial            |
| Food nearby    Limited            |
|                                  |
| Parent Notes                     |
| Best time: Morning                |
| - Bring water                     |
| - Check closures                  |
| - Snacks outside playground       |
|                                  |
| Safety                            |
| - Check slide heat                |
| - Keep gates closed               |
|                                  |
| Source                            |
| Official source · verified date   |
|                                  |
| Quick Feedback                    |
| [Good parking] [Parking hard]     |
| [Stroller easy] [Restroom ok]     |
| [Too crowded] [Info changed]      |
+----------------------------------+
```

## Saved

```text
+----------------------------------+
| Saved Places                      |
+----------------------------------+
| +------------------------------+ |
| | [image] Stanford Shopping    | |
| | Center · Peninsula           | |
| | stroller · food · restrooms  | |
| | [Directions]      [Details]  | |
| +------------------------------+ |
+----------------------------------+
```

Empty:

```text
+----------------------------------+
| Saved Places                      |
+----------------------------------+
| No saved places yet.              |
| Save a place when you find one    |
| you want to try.                  |
+----------------------------------+
```

## Profile Placeholder

```text
+----------------------------------+
| Profile                           |
+----------------------------------+
| Child age preferences             |
| Coming later                      |
|                                  |
| Favorite filters                  |
| Coming later                      |
|                                  |
| Feedback history                  |
| Coming later                      |
+----------------------------------+
```

## Main Interaction Flow

```text
Home
  -> choose category or filter
  -> compare place cards
  -> open place detail
  -> directions or save
  -> optionally leave quick feedback
```
