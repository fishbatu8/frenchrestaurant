# Update Git — push, README, repo about, secrets scan, GitHub Pages

Perform a full GitHub sync for this project. Follow every step below in order; stop and report if any step fails.

## Step 1 — Secrets & password scan (MUST pass before any push)

Search the entire working tree for patterns that look like secrets, API keys, or passwords. Run all three checks:

```bash
# 1a — API keys, tokens, and credential assignments
grep -rn \
  --include="*.js" --include="*.ts" --include="*.py" \
  --include="*.env" --include="*.json" \
  --include="*.yml" --include="*.yaml" --include="*.html" \
  -E "(api[_-]?key\s*[:=]\s*['\"]?[A-Za-z0-9_\-]{8,}|secret[_-]?key\s*[:=]|access[_-]?token\s*[:=]|auth[_-]?token\s*[:=]|private[_-]?key\s*[:=]|client[_-]?secret\s*[:=]|AKIA[0-9A-Z]{16}|sk-[a-zA-Z0-9]{32,}|ghp_[A-Za-z0-9]{36}|ghs_[A-Za-z0-9]{36})" \
  . 2>/dev/null | grep -v "node_modules" | grep -v ".git/" || true

# 1b — Password patterns (assignments, YAML keys, form default values with real content)
grep -rn \
  --include="*.js" --include="*.ts" --include="*.py" \
  --include="*.env" --include="*.json" \
  --include="*.yml" --include="*.yaml" --include="*.html" \
  -E "(password\s*[:=]\s*['\"]?[^'\"\s\$\{]{4,}|passwd\s*[:=]\s*['\"]?[^'\"\s]{4,}|pwd\s*=\s*['\"]?[^'\"\s]{4,}|db_pass\s*[:=]|db_password\s*[:=]|DATABASE_PASSWORD\s*[:=]|MYSQL_PASSWORD\s*[:=]|POSTGRES_PASSWORD\s*[:=])" \
  . 2>/dev/null | grep -v "node_modules" | grep -v ".git/" || true

# 1c — .env files accidentally tracked
git ls-files | grep -E "(^|/)\.env($|\.|_)" || true
```

**Decision rules:**
- Real secret found (non-placeholder, non-example value) → STOP, report to user, do NOT push.
- Placeholder values like `your-api-key`, `<PASSWORD>`, `example`, empty string, `${}` interpolations → false positive, note and continue.
- `.env` file tracked by git → unstage it, add to `.gitignore`, warn user, then continue.

## Step 2 — Stage and push all changes

```bash
git status
git add -A
git status
```

Review the staged file list. If `.env`, credential files, or files flagged in Step 1 appear staged, unstage them before committing:
```bash
git reset HEAD <file>
```

Draft a clear, specific commit message describing what changed, then commit and push:

```bash
git commit -m "<your message here>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
git push origin main
```

If there are no changes to commit, note that and continue to Step 3.

## Step 3 — GitHub Pages: create or verify workflow

Check whether `.github/workflows/deploy.yml` exists and is correct.

**If the file does NOT exist**, create `.github/workflows/deploy.yml` with this exact content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload site files
        uses: actions/upload-pages-artifact@v3
        with:
          path: .

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Then commit and push it:
```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Pages deployment workflow

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
git push origin main
```

**If the file already exists**, verify it matches the template above — correct `branches`, correct action versions (`checkout@v4`, `configure-pages@v5`, `upload-pages-artifact@v3`, `deploy-pages@v4`), correct `permissions` block. Update any stale versions and push.

Next, ensure GitHub Pages is enabled on the repo and pointed at the GitHub Actions source:
```bash
gh api repos/{owner}/{repo} --jq '.has_pages'
gh api -X POST repos/{owner}/{repo}/pages \
  -f build_type=workflow \
  -f source='{"branch":"main","path":"/"}' 2>/dev/null || \
gh api -X PUT repos/{owner}/{repo}/pages \
  -f build_type=workflow 2>/dev/null || true
gh api repos/{owner}/{repo}/pages --jq '{status: .status, url: .html_url, build_type: .build_type}'
```

Replace `{owner}/{repo}` by reading the remote URL:
```bash
gh repo view --json nameWithOwner --jq '.nameWithOwner'
```

## Step 4 — Resolve 404 errors

**4a — Find broken asset references in source files**

Read `index.html` and look for every `src=`, `href=`, `url(`, and `action=` that points to a local file. For each one, check the file exists on disk:
```bash
# List all files that will be deployed
git ls-files
```
Cross-reference: any `src` or `href` in the HTML that references a local path not present in `git ls-files` is a missing asset — fix the path or add the file.

**4b — Check Unsplash image URLs**

Verify the Unsplash photo IDs in `index.html` and `styles.css` use the correct format `https://images.unsplash.com/photo-{id}?w={width}&q=80`. Flag any that look malformed or truncated.

**4c — Verify GitHub Pages live URL after deploy**

After the workflow runs, fetch the live page and check for HTTP 200:
```bash
PAGES_URL=$(gh api repos/$(gh repo view --json nameWithOwner --jq '.nameWithOwner')/pages --jq '.html_url' 2>/dev/null)
echo "Pages URL: $PAGES_URL"
curl -s -o /dev/null -w "%{http_code}" "$PAGES_URL" 2>/dev/null || echo "curl not available — check URL manually"
```

If the Pages URL returns 404:
1. Confirm the repo name in the live URL matches the actual repo name — a mismatch means the `<base>` tag or asset paths need a path prefix.
2. Check the Actions tab to see if the latest deployment succeeded: `gh run list --workflow=deploy.yml --limit 5`
3. If the workflow failed, read the logs: `gh run view <run-id> --log-failed`
4. If the deploy succeeded but the URL still 404s, wait 60 seconds and retry (Pages CDN propagation).

**4d — Check internal anchor links**

Scan `index.html` for `href="#..."` anchors and verify each `id` attribute they target actually exists in the file. Report any orphaned anchors.

## Step 5 — Update README.md

Read the current [README.md](README.md) and compare against [index.html](index.html), [styles.css](styles.css), [script.js](script.js), and `.github/workflows/deploy.yml`.

Update the README if any of the following are stale:
- Feature list
- Project structure table (add `.github/workflows/deploy.yml` if missing)
- Live site URL (must match the actual Pages URL)
- Running locally instructions
- Deployment section (should mention GitHub Actions → GitHub Pages)

If updates were made:
```bash
git add README.md
git commit -m "docs: update README to reflect current project state

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
git push origin main
```

## Step 6 — Update GitHub repo "About" description and topics

```bash
REPO=$(gh repo view --json nameWithOwner --jq '.nameWithOwner')
PAGES_URL=$(gh api repos/$REPO/pages --jq '.html_url' 2>/dev/null || echo "https://fishbatu8.github.io/frenchrestaurant/")

gh repo edit \
  --description "Single-page French restaurant website with reservation form — vanilla HTML/CSS/JS, no frameworks" \
  --homepage "$PAGES_URL"

gh repo edit \
  --add-topic "html" \
  --add-topic "css" \
  --add-topic "javascript" \
  --add-topic "restaurant" \
  --add-topic "vanilla-js" \
  --add-topic "github-pages"

gh repo view --json name,description,url,homepageUrl,repositoryTopics
```

## Step 7 — Final report

Print a summary table:

| Step | Result |
|------|--------|
| Secrets scan | clean / ⚠ issues found |
| Password scan | clean / ⚠ issues found |
| Commit & push | `<sha>` pushed / nothing to push |
| GitHub Pages workflow | existing & correct / created / updated |
| Pages URL | `<url>` — HTTP `<status>` |
| 404 fixes | none needed / `<list of fixes>` |
| README | up to date / updated |
| Repo About | set — `<description>` |
| Any warnings | — |
