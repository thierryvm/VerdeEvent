const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">
        Conditions Générales Verdevent SNC
      </h1>

      <div className="prose prose-lg max-w-none">
        {/* Préambule */}
        <h2>Préambule</h2>
        <p>
          Verdevent SNC, 9 rue Fernand Brunfaut 4680 Oupeye, représentée par M.
          Yoan Lebeau et Mme Oceane Vanmeeteren, active dans les domaines des
          parcs/jardins et de l'organisation d'événements (NACEBEL).
          L'acceptation d'un devis ou d'une facture vaut acceptation des
          présentes conditions générales.
        </p>

        {/* Article 1 - Prix */}
        <h2>Article 1 – Prix</h2>
        <ul>
          <li>Validité des devis : 30 jours sauf mention contraire</li>
          <li>
            Prix HTVA, révision possible jusqu'à +30% en cas d'augmentation des
            coûts
          </li>
          <li>Toute modification client entraîne un nouveau devis</li>
        </ul>

        {/* Article 2 - Paiement */}
        <h2>Article 2 – Paiement</h2>
        <ul>
          <li>Acompte de 30% avant démarrage des travaux</li>
          <li>Factures payables sous 15 jours</li>
          <li>
            Intérêts de retard :
            <ul>
              <li>Entreprises : 10% annuel + 10% d'indemnité (min. 200€)</li>
              <li>
                Particuliers : taux légal +3 points + 10% d'indemnité (min.
                200€)
              </li>
            </ul>
          </li>
          <li>Suspension possible des travaux en cas de retard de paiement</li>
        </ul>

        {/* Article 3 - Offre et commande */}
        <h2>Article 3 – Offre et Bon de Commande</h2>
        <p>
          Les offres sont sans engagement. Les commandes ne sont valides
          qu'après acceptation écrite de la Société.
        </p>

        {/* Article 4 - RGPD */}
        <h2>Article 4 – Protection des Données</h2>
        <p>
          Conformité RGPD. Les données clients sont utilisées pour la
          communication relative aux travaux. Droit d'accès et de rectification
          via Mme Vanmeeteren.
        </p>

        {/* Article 5 - Litiges */}
        <h2>Article 5 – Litiges</h2>
        <ul>
          <li>Réclamation sous 48h par recommandé</li>
          <li>Médiation obligatoire avant action judiciaire</li>
          <li>Juridiction compétente : Tribunal de Liège</li>
        </ul>

        {/* Articles 6-8 - Parcs & Jardins */}
        <h2>Article 6 – Exécution des Travaux</h2>
        <ul>
          <li>
            Délais indicatifs, responsabilité engagée après 30 jours de mise en
            demeure
          </li>
          <li>Exonération en cas de force majeure ou faute client</li>
        </ul>

        <h2>Article 7 – Livraison</h2>
        <p>
          Délais non contractuels. Risque transféré au client lors de
          l'expédition.
        </p>

        <h2>Article 8 – Obligations Client</h2>
        <ul>
          <li>Accès au chantier et sécurité du matériel</li>
          <li>
            Fourniture gratuite d'eau/électricité (+75€/jour si indisponible)
          </li>
        </ul>

        {/* Articles 12-13 - Résiliation */}
        <h2>Article 12 – Résiliation</h2>
        <ul>
          <li>Résiliation client avant travaux : 20% du prix global</li>
          <li>
            En cours de travaux : 20% du solde + indemnisation supplémentaire si
            nécessaire
          </li>
          <li>Résiliation par la Société : indemnité max. 20%</li>
        </ul>

        {/* Article 17-18 - Événementiel */}
        <h2>Article 17 – Organisation d'Événements</h2>
        <ul>
          <li>Droit de rétractation : 14 jours (sauf foire/salon)</li>
          <li>
            Forfait de 400€ si travail commencé pendant délai de rétractation
          </li>
          <li>Client responsable du paiement direct des fournisseurs</li>
        </ul>

        {/* Articles généraux */}
        <h2>Article 21 – Responsabilités</h2>
        <p>
          Responsabilité limitée au montant des travaux commandés (sauf faute
          lourde).
        </p>

        <h2>Article 22 – Force Majeure</h2>
        <ul>
          <li>
            Définition : intempéries exceptionnelles, restrictions légales
          </li>
          <li>Exclusions : grèves, pandémies</li>
          <li>Suspension contractuelle jusqu'à 1 an</li>
        </ul>

        <h2>Article 25 – Droit à l'Image</h2>
        <p>
          Utilisation des médias soumise à autorisation écrite des clients et
          invités.
        </p>

        <h2>Article 27 – Droit Applicable</h2>
        <p>Règlement par le droit belge. Tribunal compétent : Liège.</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
