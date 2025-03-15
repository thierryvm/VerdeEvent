import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Récupérer les données du formulaire
    const data = await request.json();

    // Valider les données
    if (!data.name || !data.email || !data.message || !data.service) {
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs obligatoires' },
        { status: 400 }
      );
    }

    // Ici, vous implémenteriez l'envoi d'email
    // Par exemple avec nodemailer, SendGrid, etc.

    // Exemple de structure d'email
    const emailContent = {
      to: 'info@verdeevent.be',
      from: data.email,
      subject: `Nouveau message de contact - ${data.service}`,
      text: `
        Nom: ${data.name}
        Email: ${data.email}
        Téléphone: ${data.phone || 'Non fourni'}
        Service: ${data.service}

        Message:
        ${data.message}
      `,
    };

    console.log('Email qui serait envoyé:', emailContent);

    // Pour l'instant, simulons un succès
    // Dans un environnement de production, vous utiliseriez un service d'envoi d'emails

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors du traitement du formulaire de contact:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du traitement de votre demande' },
      { status: 500 }
    );
  }
}
