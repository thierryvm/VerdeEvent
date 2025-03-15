import { NextResponse } from 'next/server';

export function GET() {
  const content = `# VerdeEvent

> VerdeEvent est une entreprise spécialisée dans l'organisation d'événements et l'aménagement paysager en Belgique.

VerdeEvent propose deux services principaux :
- Océane Event Planner : Organisation d'événements sur mesure (mariages, événements privés, événements d'entreprise)
- Vertiyo : Aménagement paysager écologique et durable

## Services

- [Océane Event Planner](/oceane-event-planner) : Organisation complète ou partielle de mariages, événements privés et événements d'entreprise.
- [Vertiyo](/vertiyo) : Création de jardins, entretien écologique et aménagement extérieur.

## Contact

- [Formulaire de contact](/contact) : Demandez un devis gratuit ou posez vos questions.

## Informations légales

- [Conditions générales](/conditions-generales) : Conditions générales de vente et d'utilisation.
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
