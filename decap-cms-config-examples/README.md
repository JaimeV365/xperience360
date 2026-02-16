# Decap CMS Configuration Examples

This folder contains example configuration files for different Decap CMS setups.

## Files

### `config-git-gateway.yml` ⭐ RECOMMENDED
Use this configuration with Netlify Git Gateway (easiest setup).

**When to use:**
- You want the easiest setup
- You're okay with using Netlify (free)
- You want a reliable, maintained solution

**Setup time:** ~10 minutes

**Follow:** [DECAP-CMS-SETUP.md](../DECAP-CMS-SETUP.md) Option 1

---

### `config-github-oauth.yml`
Use this configuration with direct GitHub OAuth (more technical).

**When to use:**
- You don't want to use Netlify
- You prefer full control over authentication
- You're comfortable with serverless functions

**Setup time:** ~30-60 minutes (requires technical knowledge)

**Follow:** [DECAP-CMS-SETUP.md](../DECAP-CMS-SETUP.md) Option 2

---

## How to Use These Examples

1. **Choose** which setup method you want (Git Gateway recommended)
2. **Read** the setup guide: [DECAP-CMS-SETUP.md](../DECAP-CMS-SETUP.md)
3. **Follow** the instructions for your chosen method
4. **Copy** the appropriate config file to `public/admin/config.yml`
5. **Update** any fields marked with ⚠️
6. **Commit** and push to GitHub
7. **Access** your CMS at `https://xperience-360.com/admin`

---

## Current Configuration

The current config at `public/admin/config.yml` is set for **local development** only.

To use Decap CMS in production, you must:
1. Choose one of the examples above
2. Replace the current config
3. Complete the setup steps

---

## Comparison

| Setup Method | Difficulty | Time | Cost | Maintenance |
|--------------|-----------|------|------|-------------|
| **Git Gateway** | Easy | 10 min | Free | None |
| **GitHub OAuth** | Hard | 60 min | Free | Some |

**Recommendation:** Use Git Gateway unless you have a specific reason not to.

---

## Need Help?

See the main setup guide: [DECAP-CMS-SETUP.md](../DECAP-CMS-SETUP.md)
