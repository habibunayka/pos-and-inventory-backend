const securitySchemes = {
  bearerAuth: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description: 'Supply the JWT access token obtained from /api/auth/login (email/password or cashier PIN login)'
  },
};

export default securitySchemes;
