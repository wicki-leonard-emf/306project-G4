import { Resend } from 'resend';

// Initialiser Resend avec la clé API
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Envoie une alerte de dépassement de seuil aux abonnés
 * @param {Object} params - Paramètres de l'email
 * @param {Array<string>} params.recipients - Liste d'emails des destinataires
 * @param {string} params.roomName - Nom de la salle
 * @param {string} params.sensorType - Type de capteur (TEMPERATURE ou HUMIDITY)
 * @param {number} params.currentValue - Valeur actuelle
 * @param {number} params.threshold - Seuil dépassé
 * @param {string} params.thresholdType - Type de seuil (min ou max)
 */
export const sendThresholdAlert = async ({
    recipients,
    roomName,
    sensorType,
    currentValue,
    threshold,
    thresholdType
}) => {
    try {
        // Vérifier que Resend est configuré
        if (!process.env.RESEND_API_KEY) {
            console.warn('⚠️  RESEND_API_KEY non configurée, email non envoyé');
            return { success: false, error: 'RESEND_API_KEY manquante' };
        }

        if (!process.env.RESEND_FROM_EMAIL) {
            console.warn('⚠️  RESEND_FROM_EMAIL non configurée, email non envoyé');
            return { success: false, error: 'RESEND_FROM_EMAIL manquante' };
        }

        if (!recipients || recipients.length === 0) {
            console.warn('⚠️  Aucun destinataire, email non envoyé');
            return { success: false, error: 'Aucun destinataire' };
        }

        // Déterminer l'unité et le type de mesure
        const unit = sensorType === 'TEMPERATURE' ? '°C' : '%';
        const measureType = sensorType === 'TEMPERATURE' ? 'température' : 'humidité';
        const thresholdLabel = thresholdType === 'min' ? 'minimum' : 'maximum';

        // Construire le sujet et le message
        const subject = `🚨 Alerte ${measureType} - ${roomName}`;

        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .alert-box { background-color: #fee; border-left: 4px solid #c00; padding: 15px; margin: 20px 0; border-radius: 4px; }
    .value { font-size: 24px; font-weight: bold; color: #c00; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <h2>🚨 Alerte de dépassement de seuil</h2>
    
    <div class="alert-box">
      <p><strong>Salle :</strong> ${roomName}</p>
      <p><strong>Type :</strong> ${measureType.charAt(0).toUpperCase() + measureType.slice(1)}</p>
      <p><strong>Valeur actuelle :</strong> <span class="value">${currentValue.toFixed(1)}${unit}</span></p>
      <p><strong>Seuil ${thresholdLabel} :</strong> ${threshold}${unit}</p>
      <p><strong>Date :</strong> ${new Date().toLocaleString('fr-FR')}</p>
    </div>
    
    <p>Cette alerte a été générée automatiquement car la ${measureType} a dépassé le seuil ${thresholdLabel} configuré.</p>
    
    <p>Veuillez prendre les mesures nécessaires pour corriger cette situation.</p>
    
    <div class="footer">
      <p>Système de monitoring EMF - Salles de classe</p>
      <p>Vous recevez cet email car vous êtes abonné aux notifications de cette salle.</p>
    </div>
  </div>
</body>
</html>
    `.trim();

        // Envoyer l'email à tous les destinataires
        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL,
            to: recipients,
            subject,
            html: htmlContent
        });

        if (error) {
            console.error('❌ Erreur lors de l\'envoi d\'email via Resend:', error);
            return { success: false, error };
        }

        console.log(`✅ Email d'alerte envoyé à ${recipients.length} destinataire(s) pour ${roomName}`);
        return { success: true, data };

    } catch (error) {
        console.error('❌ Erreur sendThresholdAlert:', error);
        return { success: false, error: error.message };
    }
};
