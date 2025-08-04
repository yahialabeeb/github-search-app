# GitHub Search SPA

A fast and user-friendly GitHub Search Single Page Application built with **React**, **Next**, and **TypeScript**.
It allows users to search for GitHub repositories or users using the public [GitHub Search API](https://docs.github.com/en/rest/search).

### [Live Link](https://github-search-app-eta.vercel.app/)

---

## Features

- Search GitHub users or repositories
- Display filetypes (languages) used in each repository
- Show avatars of the latest 3 forkers
- Infinite scrolling
- Efficient API fetching with [React Query](https://tanstack.com/query)
- Styled using [Material UI](https://mui.com/)
- Unit tested with Jest and React Testing Library

---

## Tech Stack

- **Next + React + TypeScript**
- **Styling**: Material UI
- **Data Fetching**: React Query
- **Testing**: Jest, React Testing Library

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/github-search-spa.git
cd github-search-spa
```

### 2. Install dependencies

```bash
 npm install
```

### 3. Create .env

- GITHUB_TOKEN:your_github_token_here (optional for higher rate limit)
- API_URL:github_api_origin

### 4. Start the app

```bash
npm run dev
```

### 5. Running Tests

```bash
npm run test
```
