-- Add agreedTermsAt column to track user consent to Terms, Privacy Policy, and Cookie Policy
ALTER TABLE users ADD COLUMN agreed_terms_at INTEGER;
