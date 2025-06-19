import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 
  'pk_test_51HvJyGLa7RJNS8OgDuT8BQD6rClxOkG1XQxSQVuYo5D0J2v3g8O9k2v9ZQYTgLQG8V3X3k8gxcwzq6AJ2oF1QI300pBQGH5mq'
);

export default stripePromise; 