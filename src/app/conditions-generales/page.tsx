'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ConditionsGeneralesPage() {
  const articles = [
    {
      id: 'preambule',
      title: 'Préambule',
      content: `VERDEVENT SNC, 9 rue Fernand Brunfaut 4680 Oupeye,
Représentée par M. Yoan Lebeau et Mme Oceane Vanmeeteren en qualité de gérants,
Ci-après « la Société »
La Société est active dans le domaine des parcs et jardins et de l'organisation d'événements ainsi que les activités reprise sous les codes NACEBEL.
L'acceptation d'un devis et/ou d'une facture vaut acceptation des présentes conditions générales qui figurent au dos du devis et/ou de la facture ou qui sont jointes en cas d'envoi électronique.
La société pourra utiliser les dénominations commerciales spécifique pour ces activités, le Nom Verdevent SNC figurera sur chaque document officiel`,
    },
    {
      id: 'article-1',
      title: 'Article 1 – Prix',
      content: `Les prix figurant sur les devis émis par la Société ne sont fixes et valables que pendant la durée de validité du devis. Nos prix sont fixés TVA exclue.
Les devis de la Société ont une durée de validité de 30 jours sauf stipulation contraire écrite.
La Société s'engage à faire apparaître la date des devis sur ceux-ci de manière claire, lisible et non équivoque.
Si le Client n'accepte pas le devis dans son entièreté, la Société se réserve le droit d'y apporter des modifications de prix. Ces modifications feront l'objet d'un nouveau devis.
La Société se réserve le droit de réviser les prix si une augmentation des prix des matières premières, matériaux ou plantes nécessaires est intervenue. En tout état de cause, cette révision ne peut pas entraîner une augmentation de plus de 30% du prix initial.`,
    },
    {
      id: 'article-2',
      title: 'Article 2 – Paiement',
      content: `Sauf stipulation contraire, les factures sont payables au comptant.
En cas de non-paiement d'une facture à son échéance, le montant sera majoré de plein droit et sans mise en demeure préalable d'un intérêt de 12% l'an.
En outre, le montant de la facture sera majoré de plein droit et sans mise en demeure d'une indemnité forfaitaire de 15% avec un minimum de 50€.
Le défaut de paiement d'une facture à son échéance rend immédiatement exigibles toutes les sommes dues, quelles que soient les facilités de paiement accordées préalablement.`,
    },
    {
      id: 'article-3',
      title: "Article 3 – Délais d'exécution",
      content: `Les délais d'exécution mentionnés dans les devis sont donnés à titre indicatif.
Un retard dans l'exécution ne peut en aucun cas donner lieu à une indemnité ou à la résiliation du contrat.
Les délais sont suspendus en cas de force majeure, d'intempéries, de conditions climatiques défavorables ou de tout autre événement indépendant de la volonté de la Société.`,
    },
    {
      id: 'article-4',
      title: 'Article 4 – Livraison et réception',
      content: `La livraison est réputée effectuée dès la mise à disposition des marchandises au lieu convenu.
Le transfert des risques s'opère dès la livraison des marchandises.
Le Client est tenu de vérifier l'état des marchandises à la livraison et de formuler toute réserve dans les 24 heures par écrit.
La réception des travaux est réputée acquise de plein droit dès leur achèvement.`,
    },
    {
      id: 'article-5',
      title: 'Article 5 – Garantie',
      content: `La Société garantit ses prestations conformément aux dispositions légales en vigueur.
La garantie ne couvre pas les dégâts causés par le Client, par des tiers ou par des événements extérieurs (intempéries, catastrophes naturelles, etc.).
Pour les plantations, la garantie de reprise est de 6 mois à condition que le Client respecte les consignes d'entretien fournies.
La garantie se limite au remplacement ou à la réparation des éléments défectueux, à l'exclusion de toute autre indemnité.`,
    },
    {
      id: 'article-6',
      title: 'Article 6 – Responsabilité',
      content: `La responsabilité de la Société est limitée aux dommages directs et prévisibles résultant d'une faute prouvée dans l'exécution de ses obligations.
La Société n'est pas responsable des dommages indirects ou immatériels tels que perte de bénéfice, perte d'exploitation, etc.
Le Client est responsable de la protection et de la surveillance du chantier en dehors des heures de travail.
La responsabilité de la Société ne peut être engagée en cas de force majeure ou d'événements indépendants de sa volonté.`,
    },
    {
      id: 'article-7',
      title: 'Article 7 – Propriété intellectuelle',
      content: `Les plans, croquis, études et documents remis au Client restent la propriété exclusive de la Société.
Ils ne peuvent être utilisés, reproduits ou communiqués à des tiers sans l'autorisation écrite préalable de la Société.
En cas de violation de cette clause, le Client sera redevable d'une indemnité forfaitaire égale à 15% du montant total du projet.`,
    },
    {
      id: 'article-8',
      title: 'Article 8 – Résiliation',
      content: `En cas de résiliation unilatérale du contrat par le Client, celui-ci sera redevable d'une indemnité forfaitaire égale à 30% du montant total du devis.
La Société se réserve le droit de résilier le contrat en cas de non-respect par le Client de ses obligations, notamment en cas de non-paiement.
La résiliation prendra effet 8 jours après l'envoi d'une mise en demeure restée sans effet.`,
    },
    {
      id: 'article-9',
      title: 'Article 9 – Force majeure',
      content: `Sont considérés comme cas de force majeure : les catastrophes naturelles, les grèves, les guerres, les épidémies, les accidents graves, les interruptions de transport, les pénuries de matières premières, etc.
La survenance d'un cas de force majeure suspend l'exécution des obligations de la Société.
Si le cas de force majeure dure plus de 3 mois, chaque partie peut résilier le contrat sans indemnité.`,
    },
    {
      id: 'article-10',
      title: 'Article 10 – Protection des données',
      content: `La Société collecte et traite les données personnelles du Client conformément au RGPD.
Les données sont utilisées uniquement dans le cadre de la relation commerciale et ne sont pas communiquées à des tiers.
Le Client dispose d'un droit d'accès, de rectification et de suppression de ses données.
La politique de confidentialité complète est disponible sur demande.`,
    },
    {
      id: 'article-11',
      title: 'Article 11 – Sous-traitance',
      content: `La Société se réserve le droit de sous-traiter tout ou partie des prestations à des professionnels qualifiés.
La Société reste responsable des prestations sous-traitées vis-à-vis du Client.
Le Client accepte que la Société puisse faire appel à des sous-traitants sans accord préalable.`,
    },
    {
      id: 'article-12',
      title: 'Article 12 – Assurances',
      content: `La Société déclare avoir souscrit une assurance responsabilité civile professionnelle couvrant les dommages qui pourraient être causés par son fait ou celui de ses préposés.
Le Client s\'engage à souscrire toutes les assurances nécessaires pour couvrir les risques liés à l\'exécution du contrat.`,
    },
    {
      id: 'article-13',
      title: 'Article 13 – Modifications',
      content: `Toute modification des prestations doit faire l\'objet d\'un accord écrit entre les parties.
Les modifications peuvent entraîner une révision du prix et des délais d\'exécution.
La Société se réserve le droit de refuser toute modification qui ne serait pas compatible avec ses moyens techniques ou ses engagements.`,
    },
    {
      id: 'article-14',
      title: 'Article 14 – Réclamations',
      content: `Toute réclamation doit être adressée à la Société par écrit dans un délai de 8 jours suivant la survenance du fait générateur.
Passé ce délai, aucune réclamation ne sera recevable.
La réclamation doit être précise et motivée, accompagnée de tous les justificatifs nécessaires.`,
    },
    {
      id: 'article-15',
      title: 'Article 15 – Médiation',
      content: `En cas de litige, les parties s\'engagent à rechercher une solution amiable avant toute action judiciaire.
À défaut d\'accord amiable, tout différend sera soumis à la médiation conformément aux règles en vigueur.
Le médiateur sera choisi d\'un commun accord entre les parties ou, à défaut, désigné par le tribunal compétent.`,
    },
    {
      id: 'article-16',
      title: 'Article 16 – Prestations événementielles',
      content: `Les prestations événementielles comprennent l\'organisation, la coordination et la réalisation d\'événements selon les spécifications convenues avec le Client.
La Société s\'engage à respecter le cahier des charges établi avec le Client, sous réserve des modifications validées par écrit.
En cas d\'annulation par le Client moins de 30 jours avant l\'événement, une indemnité de 50% du montant total sera due.
En cas d\'annulation moins de 15 jours avant l\'événement, l\'intégralité du montant sera due.`,
    },
    {
      id: 'article-17',
      title: 'Article 17 – Location de matériel',
      content: `Le matériel loué reste la propriété exclusive de la Société.
Le Client est responsable du matériel dès sa mise à disposition et jusqu\'à sa restitution.
Tout dommage ou perte du matériel sera facturé au Client au prix de remplacement à neuf.
Une caution pourra être demandée et sera restituée après vérification du matériel.`,
    },
    {
      id: 'article-18',
      title: 'Article 18 – Prestations de jardinage',
      content: `Les prestations de jardinage comprennent l\'entretien, l\'aménagement et la création d\'espaces verts selon les spécifications convenues.
Le Client s\'engage à fournir un accès adapté au site et aux points d\'eau nécessaires.
Les déchets verts seront évacués par la Société, sauf convention contraire.
L\'entretien ultérieur des plantations est à la charge du Client, sauf contrat d\'entretien spécifique.`,
    },
    {
      id: 'article-19',
      title: 'Article 19 – Conditions météorologiques',
      content: `Les prestations en extérieur sont soumises aux conditions météorologiques.
La Société se réserve le droit de reporter une prestation en cas de conditions météorologiques défavorables.
Ce report ne pourra donner lieu à aucune indemnité ou pénalité.
Un nouveau rendez-vous sera fixé dans les meilleurs délais.`,
    },
    {
      id: 'article-20',
      title: 'Article 20 – Propriété des végétaux',
      content: `Les végétaux fournis et plantés par la Société deviennent la propriété du Client après paiement intégral.
La Société garantit que les végétaux sont sains et exempts de maladies au moment de la plantation.
Le Client est responsable de l\'entretien des végétaux après la plantation.
La garantie de reprise ne s\'applique qu\'en cas de respect des consignes d\'entretien fournies.`,
    },
    {
      id: 'article-21',
      title: 'Article 21 – Sécurité',
      content: `Le Client s\'engage à assurer la sécurité du site pendant toute la durée des travaux.
La Société prendra toutes les mesures de sécurité nécessaires pour son personnel et ses sous-traitants.
Le Client doit signaler tout danger particulier dont il aurait connaissance.
L\'accès au chantier sera interdit à toute personne étrangère aux travaux.`,
    },
    {
      id: 'article-22',
      title: 'Article 22 – Autorisations administratives',
      content: `Le Client est responsable de l\'obtention de toutes les autorisations administratives nécessaires.
La Société ne pourra être tenue responsable en cas de défaut d\'autorisation.
Les délais d\'exécution seront suspendus jusqu\'à l\'obtention des autorisations requises.
Les frais liés à l\'obtention des autorisations sont à la charge du Client.`,
    },
    {
      id: 'article-23',
      title: 'Article 23 – Réserve de propriété',
      content: `La Société conserve la propriété des biens vendus jusqu\'au paiement intégral du prix.
Le transfert des risques s\'opère dès la livraison des biens.
En cas de non-paiement, la Société pourra revendiquer la restitution des biens.
Les acomptes versés resteront acquis à titre d\'indemnité.`,
    },
    {
      id: 'article-24',
      title: 'Article 24 – Confidentialité',
      content: `Les parties s\'engagent à garder confidentielles les informations échangées dans le cadre de leur relation commerciale.
Cette obligation de confidentialité survit à la fin du contrat.
La violation de cette obligation pourra donner lieu à des dommages et intérêts.
Les informations pourront être divulguées sur requête d\'une autorité administrative ou judiciaire.`,
    },
    {
      id: 'article-25',
      title: 'Article 25 – Références',
      content: `Le Client autorise la Société à utiliser son nom et les réalisations effectuées à titre de références.
La Société pourra prendre des photos des réalisations et les utiliser sur ses supports de communication.
Le Client peut s\'opposer à cette utilisation par écrit.
Les photos restent la propriété intellectuelle de la Société.`,
    },
    {
      id: 'article-26',
      title: 'Article 26 – Communication',
      content: `Toute communication entre les parties doit être faite par écrit (courrier, email).
Les parties s\'engagent à accuser réception des communications importantes.
Les modifications du contrat doivent faire l\'objet d\'un avenant écrit.
Les parties désignent des interlocuteurs privilégiés pour faciliter la communication.`,
    },
    {
      id: 'article-27',
      title: 'Article 27 – Dispositions finales',
      content: `Les présentes conditions générales sont soumises au droit belge.
En cas de litige, les tribunaux de Liège seront seuls compétents.
La nullité éventuelle d\'une clause n\'affecte pas la validité des autres dispositions.
Les parties élisent domicile aux adresses indiquées dans le contrat.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-green-700 hover:text-green-800 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Retour à l'accueil
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Conditions Générales
          </h1>

          <div className="bg-white rounded-lg shadow-md p-8">
            <Accordion type="single" collapsible className="w-full">
              {articles.map((article) => (
                <AccordionItem key={article.id} value={article.id}>
                  <AccordionTrigger className="text-lg font-semibold hover:text-green-700">
                    {article.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="prose prose-green max-w-none pt-4">
                      {article.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="text-gray-700 mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
