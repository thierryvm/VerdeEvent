const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

// Chemin vers le fichier PDF avec espaces
const pdfPath = path.join(__dirname, '../../public', 'Conditions générales Verdevent SNC.pdf');

console.log('Chemin du fichier PDF:', pdfPath);
console.log('Le fichier existe:', fs.existsSync(pdfPath));

// Fonction pour extraire le texte du PDF
async function extractPdfText() {
  try {
    // Lire le fichier PDF
    console.log('Tentative de lecture du fichier...');
    const dataBuffer = fs.readFileSync(pdfPath);
    console.log('Fichier lu avec succès, taille:', dataBuffer.length, 'octets');

    // Extraire le texte
    console.log('Extraction du texte...');
    const data = await pdfParse(dataBuffer);
    console.log('Extraction réussie, nombre de pages:', data.numpages);

    // Afficher le texte extrait
    console.log('Contenu du PDF (premiers 500 caractères):');
    console.log(data.text.substring(0, 500));

    // Écrire le contenu dans un fichier texte pour référence
    const outputPath = path.join(__dirname, '../app/conditions-generales/content.txt');

    // Créer le dossier s'il n'existe pas
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log('Dossier créé:', dir);
    }

    fs.writeFileSync(outputPath, data.text);

    console.log('Extraction terminée. Le contenu a été sauvegardé dans:', outputPath);
    console.log('Nombre de caractères extraits:', data.text.length);

    // Retourner le texte pour utilisation
    return data.text;
  } catch (error) {
    console.error("Erreur lors de l'extraction du PDF:", error);
    console.error('Détails:', error.message);
    console.error('Stack:', error.stack);
    return null;
  }
}

// Exécuter la fonction
extractPdfText().then((text) => {
  if (text) {
    console.log('Extraction réussie!');
  } else {
    console.log("Échec de l'extraction.");
  }
});
