# MVP Todo

This file tracks the current build sequence for the Outdoor Nursery MVP.

## Status Key

- `done`: completed enough for the current planning stage.
- `needs_quality_check`: ready for product/content review.
- `in_progress`: actively being worked on.
- `blocked`: waiting on a decision, external account, API key, dependency install, or user review.
- `later`: intentionally out of MVP scope for now.

## Current Recommended Path

1. Finish first data and product documents.
2. Quality-check the seed data and page requirements.
3. Build an Expo + React Native mobile app prototype from local JSON.
4. Test the flow with a few parents.
5. Only then design backend/API ingestion in detail.

## Todo List

| Item | Status | Notes |
| --- | --- | --- |
| Define MVP product purpose | done | See `docs/product-purpose.md` and `docs/mvp-plan.md`. |
| Define MVP page scope | done | Home, Category List, Place Detail, Saved, Profile placeholder. |
| Define place data schema | done | See `docs/data-schema.md`. |
| Create seed data guide | done | See `docs/seed-data-guide.md`. |
| Confirm first market | done | User confirmed Bay Area is acceptable for the first version. |
| Confirm first categories | done | User confirmed `park`, `playground`, and `outdoor_mall`. |
| Confirm first page/card/detail direction | done | User said the current card and detail direction is enough for MVP. |
| Create first Bay Area seed data | needs_quality_check | Current data has 30 places and is enough to prototype, but caregiver details need review later. |
| Expand seed data to 30 places | done | Current split: 12 parks, 10 playgrounds, 8 outdoor malls. |
| Define frontend requirements | done | See `docs/frontend-requirements.md`. |
| Create low-fidelity wireframes | done | See `docs/wireframes.md`. |
| Define feedback data model | done | See `docs/feedback-model.md`. |
| Define map/navigation strategy | done | See `docs/map-strategy.md`. |
| Draft lightweight system design | done | See `docs/system-design.md`. |
| Choose frontend framework | done | Expo + React Native + TypeScript. |
| Create Expo app skeleton | done | Dependencies installed with npm; `package-lock.json` is present. |
| Implement frontend prototype | done | Go, Saved, Profile, and Place Detail are implemented. User completed first phone QA and said the overall direction is good. |
| Validate dependencies and types | done | `npm run typecheck` and Expo config check pass. |
| Start Expo dev server | done | User opened the app through Expo Go on a physical phone after SDK 54 and Babel dependency fixes. |
| Add baby/children visual polish | needs_quality_check | Home hero now includes small family-oriented cues for little-kid energy, easy walks, and caregiver notes. |
| Fix Best for text on cards | needs_quality_check | Card Best for now uses `age_guidance.display`, matching the detail page. |
| Refine stroller copy | needs_quality_check | UI now shows guidance such as `Stroller works here` instead of raw yes/no values or mandatory wording. |
| Add local quick feedback state | needs_quality_check | Detail feedback buttons now toggle selected state and save per place on this device with AsyncStorage. |
| Clarify admission, parking fee, and reservation data | needs_quality_check | Seed data now has user-facing admission labels, rough price levels, parking fee labels/notes, and reservation guidance. |
| Expand quick feedback for U.S. use | needs_quality_check | Detail feedback now includes parking, stroller, restroom, baby care, cleanliness, crowd, wait, kid enjoyment, value, maintenance, and info-changed options. |
| Add baby care facilities model | needs_quality_check | UI now shows `Baby care: Not reported`; seed data tracks broader baby care support while changing table remains a sub-fact. |
| Add age guidance | needs_quality_check | Each seed place now has `age_guidance.display` and `age_guidance.note`; card and detail show the same Best for range. |
| Audit seed data quality | done | See `docs/data-quality-audit.md`. Current data is prototype-ready but not production-ready. |
| Complete Top 10 quality check | done | See `docs/top-10-quality-check.md`. Top 10 are useful for prototype, with official rechecks and parent visits marked before beta. |
| Define official recheck plan | done | See `docs/official-recheck-plan.md`. Parent visits are deferred; official recheck is planned but not executed. |
| Define data trust model | done | See `docs/data-trust-model.md`. Backend should move toward field-level trust. |
| Define admin review flow | done | See `docs/admin-review-flow.md`. User feedback should not directly overwrite public facts. |
| Define backend MVP scope | done | See `docs/backend-mvp-scope.md`. Small backend scope is places, facts, sources, feedback, and review queue. |
| Choose backend direction | done | Supabase first. See `docs/backend-decisions.md`. |
| Create backend setup guide | done | See `docs/backend-setup-guide.md`. Supabase Free project has been created. |
| Create Supabase schema SQL | done | See `supabase/schema.sql`. Schema ran successfully in Supabase. |
| Generate Supabase seed SQL | done | See `supabase/seed.sql` and `scripts/generate-supabase-seed.js`. Imports 30 places, 52 source rows, and 510 facts. |
| Import Supabase seed data | done | User confirmed `supabase/seed.sql` ran successfully. |
| Create backend implementation plan | done | See `docs/backend-implementation-plan.md`. |
| Add backend/database | current | Supabase schema and seed are live; app remote reads and feedback writes are implemented. |
| Add Supabase place reads | needs_quality_check | App now uses Supabase-first place loading with local JSON fallback, plus a dev-only Home indicator showing `Supabase` vs `Local fallback`. |
| Add Supabase quick feedback writes | needs_quality_check | Selecting a quick feedback button inserts an anonymous `feedback` row when Supabase is configured, stores stable feedback codes, and avoids duplicate submissions from the same device/place/type. |
| Add manual admin feedback queries | needs_quality_check | See `supabase/admin-feedback-queries.sql` and `docs/admin-feedback-review.md`. User can run the first three read-only query blocks later. |
| Add review queue helper SQL | done | See `supabase/admin-create-review-items-from-feedback.sql`. It previews repeated/high-priority feedback groups and includes a commented insert into `review_queue`. |
| Define privacy/data boundaries | done | See `docs/privacy-and-data-boundaries.md`. Current MVP avoids accounts, child personal data, contacts, photos, and live location collection. |
| Define beta readiness checklist | done | See `docs/beta-readiness-checklist.md`. |
| Prepare Top 10 official recheck worksheet | done | See `docs/top-10-official-recheck-worksheet.md`. |
| Define map/distance MVP plan | done | See `docs/map-distance-mvp-plan.md`. Keeps current build on external directions and defers location permission. |
| Add API integrations | later | Google Places, OSM, weather, and city data should come after local prototype. |
| Add login/accounts | later | Not needed for MVP validation. |

## Needs User Quality Check

- Review second-pass UI polish after baby/children visual elements are added.
- Review Best for display after card layout is adjusted.
- Review stroller wording after copy is refined.
- Review quick feedback button selection state on detail pages.
- Review admission/parking/reservation labels on cards and details.
- Review whether quick feedback has the right U.S. parent-facing options.
- Review whether detail best-fit ranges such as `0-8 / all ages`, `2-8 years`, `5-12 years`, and `6 mo+ / all ages` feel accurate enough.
- Review caregiver notes later before production; for now they can remain `needs_parent_verification`.
- Review whether the Top 10 list and priorities in `docs/top-10-quality-check.md` match the intended first beta experience.
- Review official recheck queue in `docs/official-recheck-plan.md` before executing source checks.
- Later decision: choose Supabase vs Firebase for backend.
- Next backend action: create Supabase Free project `outdoor-nursery-dev`.
- Later decision: decide whether beta requires accounts or allows anonymous feedback.
- Later decision: decide whether first beta is iOS-only or iOS + Android.
