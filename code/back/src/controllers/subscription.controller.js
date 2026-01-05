import { prisma } from '../models/index.js';

/**
 * POST /api/subscriptions/rooms/:roomId
 * S'abonner aux notifications d'une salle
 */
export const subscribeToRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.session?.userId || 'demo-user'; // TODO: Utiliser vraie authentification

    // Vérifier que la salle existe
    const room = await prisma.room.findUnique({
      where: { id: roomId }
    });

    if (!room) {
      return res.status(404).json({ error: 'Salle non trouvée' });
    }

    // Vérifier si l'utilisateur existe, sinon le créer (mode démo)
    let user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          email: `${userId}@demo.com`,
          password: 'demo-password-hash',
          role: 'ELEVE'
        }
      });
    }

    // Créer ou récupérer l'abonnement
    const subscription = await prisma.roomSubscription.upsert({
      where: {
        userId_roomId: {
          userId,
          roomId
        }
      },
      create: {
        userId,
        roomId
      },
      update: {}
    });

    res.status(201).json({
      message: 'Abonnement créé avec succès',
      subscription
    });
  } catch (error) {
    console.error('Erreur subscribeToRoom:', error);
    res.status(500).json({ error: 'Erreur lors de l\'abonnement' });
  }
};

/**
 * DELETE /api/subscriptions/rooms/:roomId
 * Se désabonner des notifications d'une salle
 */
export const unsubscribeFromRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.session?.userId || 'demo-user';

    // Supprimer l'abonnement
    await prisma.roomSubscription.deleteMany({
      where: {
        userId,
        roomId
      }
    });

    res.json({ message: 'Désabonnement réussi' });
  } catch (error) {
    console.error('Erreur unsubscribeFromRoom:', error);
    res.status(500).json({ error: 'Erreur lors du désabonnement' });
  }
};

/**
 * GET /api/subscriptions/me
 * Récupérer les abonnements de l'utilisateur connecté
 */
export const getMySubscriptions = async (req, res) => {
  try {
    const userId = req.session?.userId || 'demo-user';

    const subscriptions = await prisma.roomSubscription.findMany({
      where: { userId },
      include: {
        room: {
          include: {
            sensors: {
              include: {
                readings: {
                  take: 1,
                  orderBy: { timestamp: 'desc' }
                }
              }
            }
          }
        }
      }
    });

    res.json(subscriptions);
  } catch (error) {
    console.error('Erreur getMySubscriptions:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des abonnements' });
  }
};

/**
 * GET /api/subscriptions/rooms/:roomId/subscribers
 * Récupérer la liste des abonnés d'une salle (admin uniquement)
 */
export const getRoomSubscribers = async (req, res) => {
  try {
    const { roomId } = req.params;

    const subscriptions = await prisma.roomSubscription.findMany({
      where: { roomId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true
          }
        }
      }
    });

    res.json(subscriptions);
  } catch (error) {
    console.error('Erreur getRoomSubscribers:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des abonnés' });
  }
};
