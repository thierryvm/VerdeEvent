import { Link } from 'react-router-dom';
import { Leaf, Shovel, TreePine, ArrowRight } from 'lucide-react';

const Vertiyo = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")' }}>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Vertiyo
            </h1>
            <p className="text-xl md:text-2xl">
              Créez votre jardin de rêve avec notre expertise paysagère
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Leaf className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Conception Paysagère</h3>
              <p className="text-gray-600">
                Création de plans personnalisés pour transformer votre espace extérieur en un havre de paix sur mesure.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Shovel className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Aménagement</h3>
              <p className="text-gray-600">
                Réalisation complète de votre projet avec des matériaux de qualité et un savoir-faire expert.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <TreePine className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Entretien</h3>
              <p className="text-gray-600">
                Maintenance régulière pour garder votre jardin en parfait état tout au long de l'année.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Notre Expertise</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <img
                src="https://images.unsplash.com/photo-1558904541-efa843a96f01?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Jardin moderne"
                className="rounded-lg shadow-lg mb-6"
              />
              <h3 className="text-xl font-semibold mb-4">Design Moderne</h3>
              <p className="text-gray-600">
                Nous créons des espaces extérieurs contemporains qui allient esthétique et fonctionnalité, en utilisant des matériaux innovants et des concepts de design modernes.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1598902108854-10e335adac99?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Jardin écologique"
                className="rounded-lg shadow-lg mb-6"
              />
              <h3 className="text-xl font-semibold mb-4">Approche Écologique</h3>
              <p className="text-gray-600">
                Notre engagement envers l'environnement se reflète dans nos choix de plantes locales, nos systèmes d'irrigation économes en eau et nos pratiques d'entretien durables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Envie de transformer votre jardin ?</h2>
          <Link to="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700">
            Demander un devis
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Vertiyo;