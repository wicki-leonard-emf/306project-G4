/**
 * Middleware global de gestion des erreurs
 * Traite les erreurs Express, Prisma et autres exceptions
 */
export const errorHandler = (error, req, res, next) => {
  console.error('❌ Erreur:', error);

  // Erreur par défaut
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Erreur serveur interne'
      : error.message
  });
};
