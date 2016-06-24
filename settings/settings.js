module.exports = {
  // App setup steps
  // 1. Generate and set the secret key >npm run gensecret
  // 2. Create and set new users and passwords.  Generate password hash by running >npm run genhash yourpassword
  // 3. Remove all sample user accounts
  // 4. Set read and admin Netsense API keys
  // 5. Configure all relevant views

  // Private key for generating tokens. Change this before deploying and do not distribute
  // If you change its value, all unexpired web tokens will be invalid
  secret: 'changeme',

  // Time before token expires after being created.  Once expired, must authenticate to generate a new token
  tokenExpiration: '8h',

  // User accounts - user can login to one or more sites
  // Attributes are encrypted in web token
  // Remove all examples before deploying in production
  users: [
    { id: 1, username: 'user1', name: 'User 1', sites: ['site1', 'site2'] },
    { id: 2, username: 'user2', name: 'User 2', sites: ['site2'] }
  ],

  // Password hashes, id's map to accounts above
  // Remove all samples before deploying in production
  passwords: [
    {userid: 1, hash: '$2a$10$VW9yDJli5LX6YjZz3vB6peiM62C9apodRMyAl6.JvMZjhA0UBJCR6'},
    {userid: 2, hash: '$2a$10$ucQTi41737UfBbGVgGxdoOo3z4XT70MQ6XFB5k2iESlIQIeL8uCSK'}
  ],

  sites: {
    site1: {
      name: 'Site 1',
      description: 'Portland, Oregon, USA',
      logo: 'logo1.png',
      logo2x: 'logo1@2x.png',
      views: ['view1','view2']
    },
    site2: {
      name: 'Site 2',
      description: 'Shanghai, China',
      logo: 'logo2.png',
      logo2x: 'logo2@2x.png',
      views: ['view2']
    },
    site3: {
      name: 'Site 3',
      description: 'Santiago, Chile',
      logo: 'logo3.png',
      logo2x: 'logo3@2x.png',
      views: ['view3']
    }
  },

  // Views are typically associated with only one site but sometimes a view will be made available in many sites
  views: {
    view1: {
      name: 'View 1',
      startExtent: []
    },
    view2: {
      name: 'View 2',
      startExtent: []
    },
    view3: {
      name: 'View 3',
      startExtent: []
    }
  }
}