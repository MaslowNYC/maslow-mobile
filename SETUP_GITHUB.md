# GitHub Repository Setup

## Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `maslow-mobile`
3. Description: "Maslow NYC Mobile App - Digital Key & Wallet"
4. Choose Public or Private
5. **Do NOT** check "Initialize with README" (we already have files)
6. Click "Create repository"

## Step 2: Connect Local Repo to GitHub

After creating the repo, run these commands (replace `YOUR_USERNAME` with your GitHub username):

```bash
cd /Users/patrickmay/Maslow/maslow-mobile
git remote add origin https://github.com/YOUR_USERNAME/maslow-mobile.git
git branch -M main
git push -u origin main
```

## Alternative: Using SSH (if you have SSH keys set up)

```bash
git remote add origin git@github.com:YOUR_USERNAME/maslow-mobile.git
git branch -M main
git push -u origin main
```

## Verify

After pushing, verify with:
```bash
git remote -v
```

You should see your GitHub repository URL.
