const securitySchemes = {
  bearerAuth: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description: 'Supply the JWT access token obtained from /api/auth/login'
  },
};

export default securitySchemes;
