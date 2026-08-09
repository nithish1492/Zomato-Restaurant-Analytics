# Zomato Restaurant Analytics

Restaurant Segmentation Intelligence — a machine learning platform that
clusters restaurants into business segments using rating, cost, and
sentiment data, and serves real-time predictions through a FastAPI backend.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- React Router
- Axios
- Recharts
- Lucide React

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Backend

The Prediction page expects a FastAPI backend running at
`http://127.0.0.1:8000` with a `POST /predict` endpoint accepting:

```json
{
  "average_rating": 4.2,
  "average_cost": 850,
  "review_count": 320,
  "average_pictures": 3.5,
  "positive_percent": 65,
  "negative_percent": 15,
  "neutral_percent": 20,
  "cuisine_encoded": 5,
  "collection_encoded": 3
}
```

And returning:

```json
{
  "predicted_cluster": 1,
  "business_segment": "Casual Dining",
  "confidence": 0.87
}
```

## Project Structure

```
src/
  components/   Reusable UI, page-specific sections
  layouts/      App shell (navbar, footer, background)
  pages/        Route-level page components
  services/     Axios client + API calls
  hooks/        Custom React hooks
  utils/        Formatters, class merging, mock data
  types/        Shared TypeScript interfaces
```

## Build

```bash
npm run build
npm run preview
```
