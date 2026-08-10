# GitHub Pages Hosting

This document tracks how Outdoor Nursery hosts public static pages, starting with the privacy policy required for TestFlight/App Store Connect.

## What Will Be Hosted

The public site is built from:

```text
public/
```

Current public pages:

```text
public/privacy-policy.html
public/support.html
```

## Expected Privacy Policy URL

After the repository is pushed to GitHub and GitHub Pages is enabled, the expected URL format is:

```text
https://GITHUB_USERNAME.github.io/REPOSITORY_NAME/privacy-policy.html
```

Example if the repository is named `nursery-app`:

```text
https://GITHUB_USERNAME.github.io/nursery-app/privacy-policy.html
```

Use the actual URL shown by GitHub Pages after deployment.

Expected Outdoor Nursery URLs:

```text
https://yuqima17.github.io/outdoor-nursery/privacy-policy.html
https://yuqima17.github.io/outdoor-nursery/support.html
```

## One-Time GitHub Setup

These steps require the GitHub account owner.

1. Create or open the GitHub repository.
2. Push this local repo to GitHub.
3. Open the repository on GitHub.
4. Go to `Settings` -> `Pages`.
5. Under `Build and deployment`, set `Source` to `GitHub Actions`.
6. Go to `Actions` and run or wait for `Deploy Public Pages`.
7. Open the deployed URL and confirm the privacy policy loads.
8. Put the final privacy policy URL into App Store Connect.
9. Put the final support URL into App Store Connect.

## Automation

The workflow lives at:

```text
.github/workflows/deploy-pages.yml
```

It deploys the `public/` directory when either of these happens:

- A change is pushed to `main` under `public/`.
- The workflow is manually run from GitHub Actions.

## Notes

- Keep the repository public if using GitHub Pages on GitHub Free.
- Do not put secrets, API keys, or private admin files in `public/`.
- The app's Supabase public anon key belongs in app configuration, not in this public static site.
