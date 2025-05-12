/**
 * Migration script to assign roles to existing users
 * 
 * This script:
 * 1. Assigns the 'viewer' role to all users without a role
 * 2. Converts users with isAdmin: true to role: 'admin'
 * 
 * Run with: npx tsx scripts/migrate-user-roles.ts
 */

import { writeClient } from '../sanity/lib/write-client';
import { client } from '../sanity/lib/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function migrateUserRoles() {
  console.log('🔄 Starting user role migration...');
  
  try {
    // Fetch all authors without a role or with isAdmin: true
    const usersToMigrate = await client.fetch(`
      *[_type == "author" && (defined(isAdmin) || !defined(role))] {
        _id,
        name,
        email,
        isAdmin,
        role
      }
    `);
    
    console.log(`Found ${usersToMigrate.length} users to migrate`);
    
    // Process each user
    for (const user of usersToMigrate) {
      const role = user.isAdmin === true ? 'admin' : (user.role || 'viewer');
      
      console.log(`Migrating user ${user.name || user.email} (${user._id}): setting role to '${role}'`);
      
      // Update the user's role
      await writeClient
        .patch(user._id)
        .set({ role })
        .commit();
      
      console.log(`✅ Successfully updated user ${user._id}`);
    }
    
    console.log('✅ User role migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
migrateUserRoles().then(() => {
  console.log('Migration script execution completed.');
  process.exit(0);
});