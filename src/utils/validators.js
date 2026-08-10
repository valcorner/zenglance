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
  fileSize: z.number().positive().optional(),
  duration: z.number().positive().optional(),
  mimeType: z.string().optional()
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
