/**
 * Configuration for predefined admin users
 * 
 * This file reads admin email addresses from environment variables.
 * These users will automatically be granted admin privileges upon registration
 * or when authenticating through OAuth providers.
 */

/**
 * Parse the comma-separated list of admin emails from environment variable
 * Format should be: "admin1@example.com,admin2@example.com"
 */
export const ADMIN_EMAILS: string[] = (() => {
  const adminEmailsEnv = process.env.ADMIN_EMAILS || '';
  if (!adminEmailsEnv) {
    console.warn('ADMIN_EMAILS environment variable not set. No hardcoded admins will be configured.');
    return [];
  }
  
  // Split by comma and trim whitespace from each email
  return adminEmailsEnv.split(',').map(email => email.trim()).filter(Boolean);
})();

/**
 * Checks if an email is in the admin list from environment variables
 * @param email Email address to check
 * @returns Boolean indicating if the email belongs to a hardcoded admin
 */
export function isHardcodedAdmin(email: string): boolean {
  if (!email) return false;
  
  // Case-insensitive check
  const normalizedEmail = email.toLowerCase().trim();
  return ADMIN_EMAILS.some(adminEmail => 
    adminEmail.toLowerCase() === normalizedEmail
  );
}