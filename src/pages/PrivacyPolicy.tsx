const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">
        Politique de Confidentialité (RGPD)
      </h1>

      <div className="prose prose-lg max-w-none">
        <h2>1. Collecte des Données</h2>
        <p>
          Nous collectons uniquement les données personnelles nécessaires à la
          fourniture de nos services :
        </p>
        <ul>
          <li>Nom et prénom</li>
          <li>Coordonnées de contact (email, téléphone)</li>
          <li>Adresse postale pour les interventions sur site</li>
        </ul>

        <h2>2. Utilisation des Données</h2>
        <p>Vos données sont utilisées pour :</p>
        <ul>
          <li>La gestion de votre projet</li>
          <li>La communication relative à nos services</li>
          <li>L'amélioration de notre service client</li>
        </ul>

        <h2>3. Protection des Données</h2>
        <p>
          Nous mettons en œuvre des mesures de sécurité appropriées pour
          protéger vos données. L'accès à vos données est strictement limité aux
          personnes qui en ont besoin.
        </p>

        <h2>4. Durée de Conservation</h2>
        <p>
          Nous conservons vos données pendant la durée nécessaire à la
          réalisation de nos services et conformément aux obligations légales.
        </p>

        <h2>5. Vos Droits</h2>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul>
          <li>Droit d'accès à vos données</li>
          <li>Droit de rectification</li>
          <li>Droit à l'effacement</li>
          <li>Droit à la limitation du traitement</li>
          <li>Droit à la portabilité des données</li>
        </ul>

        <h2>6. Contact</h2>
        <p>
          Pour toute question concernant vos données personnelles,
          contactez-nous à : contact@verdevent.be
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
