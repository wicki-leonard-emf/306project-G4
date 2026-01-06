import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * @route GET /api/alerts/me
 * @desc Récupérer toutes les alertes pour les salles auxquelles l'utilisateur est abonné
 * @access Private
 */
export const getMyAlerts = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // Récupérer les IDs des salles auxquelles l'utilisateur est abonné
        const subscriptions = await prisma.roomSubscription.findMany({
            where: { userId },
            select: { roomId: true }
        });

        const roomIds = subscriptions.map(sub => sub.roomId);

        // Si l'utilisateur n'est abonné à aucune salle, retourner un tableau vide
        if (roomIds.length === 0) {
            return res.json([]);
        }

        // Récupérer les alertes pour ces salles
        const alerts = await prisma.alert.findMany({
            where: {
                roomId: {
                    in: roomIds
                }
            },
            include: {
                room: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {
                sentAt: 'desc'
            },
            take: 50 // Limiter à 50 alertes récentes
        });

        res.json(alerts);
    } catch (error) {
        console.error('Erreur lors de la récupération des alertes:', error);
        next(error);
    }
};

/**
 * @route GET /api/alerts
 * @desc Récupérer toutes les alertes (admin seulement)
 * @access Private/Admin
 */
export const getAllAlerts = async (req, res, next) => {
    try {
        const { roomId, limit = 50 } = req.query;

        const where = roomId ? { roomId } : {};

        const alerts = await prisma.alert.findMany({
            where,
            include: {
                room: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {
                sentAt: 'desc'
            },
            take: parseInt(limit)
        });

        res.json(alerts);
    } catch (error) {
        console.error('Erreur lors de la récupération des alertes:', error);
        next(error);
    }
};

/**
 * @route DELETE /api/alerts/:id
 * @desc Supprimer une alerte
 * @access Private/Admin
 */
export const deleteAlert = async (req, res, next) => {
    try {
        const { id } = req.params;

        await prisma.alert.delete({
            where: { id }
        });

        res.json({ message: 'Alerte supprimée avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'alerte:', error);
        next(error);
    }
};

/**
 * @route DELETE /api/alerts
 * @desc Supprimer toutes les alertes (ou toutes les alertes de l'utilisateur)
 * @access Private
 */
export const deleteAllAlerts = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const isAdmin = req.user.role === 'ADMIN';

        if (isAdmin) {
            // L'admin peut supprimer toutes les alertes
            await prisma.alert.deleteMany({});
            return res.json({ message: 'Toutes les alertes ont été supprimées' });
        } else {
            // Les utilisateurs normaux peuvent supprimer uniquement les alertes de leurs salles abonnées
            const subscriptions = await prisma.roomSubscription.findMany({
                where: { userId },
                select: { roomId: true }
            });

            const roomIds = subscriptions.map(sub => sub.roomId);

            await prisma.alert.deleteMany({
                where: {
                    roomId: {
                        in: roomIds
                    }
                }
            });

            return res.json({ message: 'Vos alertes ont été supprimées' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression des alertes:', error);
        next(error);
    }
};
