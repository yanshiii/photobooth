import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW) * 1000,
  max: Number(process.env.RATE_LIMIT_MAX),
  standardHeaders: true,
  legacyHeaders: false,
});
