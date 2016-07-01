module.exports = {

  // Private key for generating tokens. Change this before deploying and do not distribute
  // The gensecret utility is provided for generating a new random secret key
  // If you change its value, all unexpired web tokens will be invalid
  secret: 'changeme',

  // Time before token expires after being created.  Once expired, must authenticate to generate a new token
  tokenExpiration: '8h',

  // User accounts - user can login to one or more sites
  // Attributes are encrypted in web token
  // Remove all examples before deploying in production
  users: [
    { id: 1, username: 'user1', name: 'User 1', sites: ['pdx', 'site2'] },
    { id: 2, username: 'user2', name: 'User 2', sites: ['site2'] }
  ],

  // Password hashes, id's map to accounts above
  // The genhash utility is provided for generating new user account hashes
  // Remove all samples before deploying in production
  passwords: [
    {userid: 1, hash: '$2a$10$VW9yDJli5LX6YjZz3vB6peiM62C9apodRMyAl6.JvMZjhA0UBJCR6'},
    {userid: 2, hash: '$2a$10$ucQTi41737UfBbGVgGxdoOo3z4XT70MQ6XFB5k2iESlIQIeL8uCSK'}
  ],

  sites: {
    pdx: {
      name: 'Portland International Airport',
      description: 'Portland, United States',
      logo: 'logo1.png',
      logo2x: 'logo1@2x.png',
      views: ['short-term','long-term', 'economy', 'wait-area']
    },
    site2: {
      name: 'Shanghai Pudong International Airport',
      description: 'Shanghai, China',
      logo: 'logo2.png',
      logo2x: 'logo2@2x.png',
      views: ['terminal1', 'terminal2']
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
  views: [{
      id: 'short-term',
      name: 'Short-term Parking',      
      type: 'basic',
      map: {
        token: 'pk.eyJ1IjoidHdlbGNoIiwiYSI6ImNpcHloYnN0NzB5ZzNoMW5yd3Z4cjJ1eDQifQ.k48TV6SQlBb_9ctuj8Jrzg',        
        start: {
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [-122.591581, 45.588673],
          zoom: 17.5
        },
        // Toggle layers appear in the sidebar menu and are not visible on initial load
        // These layers must already be published in your map style with layer name == id
        toggleLayers: [
          {id: 'satellite', name: 'Satellite', visible: false}
        ]  
      }
    },{
      id: 'long-term',
      name: 'Long-term Parking',      
      type: 'basic',
      map: {
        token: 'pk.eyJ1IjoidHdlbGNoIiwiYSI6ImNpcHloYnN0NzB5ZzNoMW5yd3Z4cjJ1eDQifQ.k48TV6SQlBb_9ctuj8Jrzg',        
        start: {
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [-122.589993, 45.587967],
          zoom: 17.5
        },
        // Toggle layers appear in the sidebar menu and are not visible on initial load
        // These layers must already be published in your map style with layer name == id
        toggleLayers: [
          {id: 'satellite', name: 'Satellite', visible: false}
        ]  
      }
    },{
      id: 'wait-area',
      name: 'Waiting Area',      
      type: 'basic',
      map: {
        token: 'pk.eyJ1IjoidHdlbGNoIiwiYSI6ImNpcHloYnN0NzB5ZzNoMW5yd3Z4cjJ1eDQifQ.k48TV6SQlBb_9ctuj8Jrzg',        
        start: {
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [-122.577805, 45.581357],
          zoom: 18
        },
        // Toggle layers appear in the sidebar menu and are not visible on initial load
        // These layers must already be published in your map style with layer name == id
        toggleLayers: [
          {id: 'satellite', name: 'Satellite', visible: false}
        ]  
      }
    },{
      id: 'economy',
      name: 'Economy Parking',      
      type: 'basic',
      map: {
        token: 'pk.eyJ1IjoidHdlbGNoIiwiYSI6ImNpcHloYnN0NzB5ZzNoMW5yd3Z4cjJ1eDQifQ.k48TV6SQlBb_9ctuj8Jrzg',        
        start: {
          style: 'mapbox://styles/mapbox/satellite-v9',
          center: [-122.557104, 45.577278],
          zoom: 16.5
        },
        // Toggle layers appear in the sidebar menu and are not visible on initial load
        // These layers must already be published in your map style with layer name == id
        toggleLayers: [
          {id: 'satellite', name: 'Satellite', visible: false}
        ]  
      }
    },{
      id: 'terminal1',
      name: 'Terminal 1',
      type: 'basic',
      map: {
        token: 'pk.eyJ1IjoidHdlbGNoIiwiYSI6ImNpcHloYnN0NzB5ZzNoMW5yd3Z4cjJ1eDQifQ.k48TV6SQlBb_9ctuj8Jrzg',        
        start: {
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [121.798926, 31.151710],
          zoom: 17,
          animateTo: {
            zoom: 17.5,
            duration: 8000
          }
        },

        // Toggle layers appear in the sidebar menu and are not visible on initial load
        // These layers must already be published in your map style with layer name == id
        toggleLayers: [
          {id: 'satellite', name: 'Satellite', visible: false}
        ]  
      }
    },{
      id: 'terminal2',
      name: 'Terminal 2',
      type: 'basic',
      map: {
        token: 'pk.eyJ1IjoidHdlbGNoIiwiYSI6ImNpcHloYnN0NzB5ZzNoMW5yd3Z4cjJ1eDQifQ.k48TV6SQlBb_9ctuj8Jrzg',        
        start: {
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [121.804668, 31.153121],
          zoom: 17,
          animateTo: {
            zoom: 17.5,
            duration: 8000
          }
        },

        // Toggle layers appear in the sidebar menu and are not visible on initial load
        // These layers must already be published in your map style with layer name == id
        toggleLayers: [
          {id: 'satellite', name: 'Satellite', visible: false}
        ]  
      }
    },
    {
      id: 'view3',
      name: 'View 3',
      startExtent: []
    }
  ]
}