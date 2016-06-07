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

  // User account, encrypted in web token
  // Remove all samples before deploying in production
  users: [
    {id: 1, username: 'user1'},
    {id: 2, username: 'user2'}
  ],

  // Password hashes, id's map to accounts above
  // Remove all samples before deploying in production
  passwords: [
    {id: 1, hash: '$2a$10$VW9yDJli5LX6YjZz3vB6peiM62C9apodRMyAl6.JvMZjhA0UBJCR6'},
    {id: 2, hash: '$2a$10$ucQTi41737UfBbGVgGxdoOo3z4XT70MQ6XFB5k2iESlIQIeL8uCSK'}
  ],

  // Global service settings, default for all views
  services: {
    server: 'example.com',
    readKey: 'key1',
    adminKey: 'key2'
  },

  views: []
};