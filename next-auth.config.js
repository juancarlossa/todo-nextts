module.exports = {
  providers: [
    {
      id: 'google',
      name: 'Google',
      type: 'oauth',
      version: '2.0',
      scope: 'openid profile email',
      params: { grant_type: 'authorization_code' },
      accessTokenUrl: 'https://accounts.google.com/o/oauth2/token',
      requestTokenUrl: 'https://accounts.google.com/o/oauth2/auth',
      authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
      profileUrl: 'https://www.googleapis.com/oauth2/v1/userinfo',
      profile: (profile) => {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
      clientId: '1035436677636-d9k6pfocsebitce3qf7u26m0g44q90se.apps.googleusercontent.com',
      clientSecret: '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',
      callbackUrl: 'http://localhost:3000/api/auth/callback/google',
    },
  ],
};