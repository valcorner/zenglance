import { z } from 'zod';
import { roles, contentTypes } from '../db/schema.js';

// Role validation
export const roleSchema = z.enum(roles);

// Content type validation
export const contentTypeSchema = z.enum(contentTypes);

// Upload permission rules
export const uploadPermissions = {
  free:   [],                              // Cannot upload anything
  senior: [...contentTypes],               // Can upload all content types
  admin:  [...contentTypes],               // Can upload all content types
};

// CDN type mapping
export function getCdnType(contentType) {
  const mapping = {
    short_drama: 'drama',
    tv_series: 'series',
    movie: 'movie',
    ugc_long_video: 'video',
    short_video: 'short'
  };
  return mapping[contentType];
}

// User schema for OAuth
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  avatar: z.string().url().optional(),
  role: roleSchema,
  createdAt: z.number(),
  updatedAt: z.number()
});

// Content creation schema
export const createContentSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  contentType: contentTypeSchema,
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), // kebab-case
  videoUrl: z.string().url().refine(
    (url) => url.startsWith('https://cdn.valcorner.qzz.io/'),
    { message: 'Video URL must be a Valcorner CDN URL (https://cdn.valcorner.qzz.io/...)' }
  ),
  fileSize: z.number().positive().optional(),
  duration: z.number().positive().optional(),
  mimeType: z.string().optional(),
  seriesSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  season: z.number().int().positive().optional(),
  episodeNumber: z.number().int().positive().optional(),
  totalEpisodes: z.number().int().nonnegative().optional()
});

// Upload session response schema
export const uploadSessionResponseSchema = z.object({
  sessionId: z.string().uuid(),
  uploadUrl: z.string().url(),
  uploadAuth: z.string(),
  b2Key: z.string(),
  expiresAt: z.number(),
  contentId: z.string().optional()
});

// CDN URL response schema
export const cdnUrlResponseSchema = z.object({
  contentId: z.string(),
  manifestUrl: z.string().url().optional(),
  directUrl: z.string().url().optional(),
  ticketRequired: z.boolean().default(true)
});

// Valcorner token response schema
export const valcornerTokenResponseSchema = z.object({
  ticket: z.string()
});

// Error response schema
export const errorResponseSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
  details: z.record(z.any()).optional()
});

// Status validation
export const contentStatusSchema = z.enum(['pending', 'ready', 'error']);

// Admin content update schema (partial)
export const adminUpdateContentSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  contentType: contentTypeSchema.optional(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  status: contentStatusSchema.optional(),
  fileSize: z.number().positive().optional(),
  duration: z.number().positive().optional(),
  mimeType: z.string().optional(),
  manifestIndex: z.string().optional(),
  // Type-specific fields (all optional)
  season: z.number().int().positive().optional(),
  totalEpisodes: z.number().int().nonnegative().optional(),
  episodeLength: z.number().int().positive().optional(),
  studio: z.string().optional(),
  genre: z.string().optional(),
  totalSeasons: z.number().int().positive().optional(),
  seriesStatus: z.string().optional(),
  network: z.string().optional(),
  firstAired: z.number().positive().optional(),
  director: z.string().optional(),
  rating: z.string().optional(),
  releaseYear: z.number().int().positive().optional(),
  budget: z.number().int().nonnegative().optional(),
  boxOffice: z.number().int().nonnegative().optional(),
  category: z.string().optional(),
  tags: z.string().optional(),
  viewsTarget: z.number().int().nonnegative().optional(),
  license: z.string().optional(),
  platform: z.string().optional(),
  hashtags: z.string().optional(),
  challenge: z.string().optional(),
  trendingScore: z.number().int().nonnegative().optional(),
  seriesSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  episodeNumber: z.number().int().positive().optional()
});

// Admin content create schema
export const adminCreateContentSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  contentType: contentTypeSchema,
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  status: contentStatusSchema.default('ready'),
  fileSize: z.number().positive().optional(),
  duration: z.number().positive().optional(),
  mimeType: z.string().optional(),
  manifestIndex: z.string().optional(),
  b2Key: z.string().optional(),
  b2Bucket: z.string().optional(),
  // Type-specific fields
  season: z.number().int().positive().optional(),
  totalEpisodes: z.number().int().nonnegative().optional(),
  episodeLength: z.number().int().positive().optional(),
  studio: z.string().optional(),
  genre: z.string().optional(),
  totalSeasons: z.number().int().positive().optional(),
  seriesStatus: z.string().optional(),
  network: z.string().optional(),
  firstAired: z.number().positive().optional(),
  director: z.string().optional(),
  rating: z.string().optional(),
  releaseYear: z.number().int().positive().optional(),
  budget: z.number().int().nonnegative().optional(),
  boxOffice: z.number().int().nonnegative().optional(),
  category: z.string().optional(),
  tags: z.string().optional(),
  viewsTarget: z.number().int().nonnegative().optional(),
  license: z.string().optional(),
  platform: z.string().optional(),
  hashtags: z.string().optional(),
  challenge: z.string().optional(),
  trendingScore: z.number().int().nonnegative().optional(),
  seriesSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  episodeNumber: z.number().int().positive().optional()
});
