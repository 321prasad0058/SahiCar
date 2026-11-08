# Weekly inventory update

Every **Monday at 9:00 IST**, GitHub runs `scripts/weekly-update.mjs` on its own servers (free):

1. Gemini, with Google Search, checks which upcoming cars have launched, what was newly announced, and whether this
   week's 15 car prices are still right. Only answers with a source link are used. Price swings over 25% are
   flagged, not applied.
2. The data is rebuilt and checked (`npm run data`, the scoring test, the type check). Bad data stops the run.
   - **Photos:** every new car page or upcoming car gets a free photo from Wikipedia / Wikimedia Commons when
     one exists (only a real photo, from an article about that vehicle). If none exists, the report says
     **"No free photo found — please make a render"**. A car that just launched as a facelift is flagged too,
     because its existing photo may show the old design.
3. A **pull request** titled "Weekly inventory update" opens, listing every change with its source. You're
   assigned to it, so **GitHub emails you**. Optionally a second email with the summary goes out (see below).
4. You read it. **Merge** puts it live (the deploy workflow builds and deploys to Firebase). **Close** throws
   the changes away. Nothing reaches the site without your merge.

You can also run it any time: GitHub → Actions → *Weekly inventory update* → **Run workflow**.

## One-time setup (about 10 minutes)

All in the repository on GitHub: **Settings**.

### 1. Let the workflow open pull requests
Settings → Actions → General → *Workflow permissions* → tick **"Allow GitHub Actions to create and approve pull
requests"** → Save.

### 2. Secrets
Settings → Secrets and variables → Actions → **New repository secret**:

| Name | Value |
|---|---|
| `GEMINI_API_KEY` | your Gemini API key (the one in `.key`) |
| `FIREBASE_SERVICE_ACCOUNT_SAHICAR_IN` | the deploy key, see below |

**Firebase deploy key** (lets the merge deploy the site). The easy way, on your Mac, in the project folder:

```
npx firebase init hosting:github
```

Log in, choose the `321prasad0058/SahiCar` repository, and answer **No** to the questions about creating
workflow files (they already exist). It creates the key and stores it as the secret for you.

### 3. Make sure the emails reach you
GitHub → your profile picture → Settings → **Notifications** → *Participating, @mentions and custom* → tick
**Email**, and check the address under *Default notifications email*. You're assigned to every weekly pull
request, so it lands in your inbox.

### 4. (Optional) A direct summary email from Gmail
If you'd also like the whole summary in the email itself, add three more secrets:

| Name | Value |
|---|---|
| `MAIL_USERNAME` | the Gmail address that sends it |
| `MAIL_PASSWORD` | a Gmail **App Password** for that account (Google Account → Security → 2-Step Verification → App passwords). Not your normal password. |
| `MAIL_TO` | where to send it |

Without these, the step is skipped and GitHub's own email still arrives.

## The report (pull request and email)
Reads top to bottom: **At a glance** (counts) → **Your to-do before merging** (a checklist) → **Launched this
week** (a card per car: photo or render request, price, key specs, sources) → **Newly announced** →
**Price changes** (was / now / % change) → **Renders needed** → **Needs you** → the cars whose prices were
checked. GitHub's email carries this report; with the Gmail secrets set you also get it as a designed email
with a "Review & approve on GitHub" button.

## Checking a weekly pull request
- Open each **source** link and check that the page says what the summary says.
- **New car pages**: check the specs against the source; anything unconfirmed is left blank on purpose. A new
  car also needs a photo: make a render pack for it.
- **Price changes** update the from/to range only; variant prices need a manual check.
- **Needs a person** lists what the script wouldn't decide on its own.
- Wrong item? Edit the file in the pull request (or tell Claude), then merge. Or close the pull request.

## Running it on your Mac
```
GEMINI_API_KEY=$(cat .key) npm run weekly -- --dry-run   # ask, print the summary, change nothing
GEMINI_API_KEY=$(cat .key) npm run weekly                # change the files (then npm run data)
```
