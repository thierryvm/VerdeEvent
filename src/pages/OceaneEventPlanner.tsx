import { Link } from 'react-router-dom';
import { Calendar, Heart, Camera, ArrowRight, Star, Users, Gift } from 'lucide-react';

const OceaneEventPlanner = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")' }}>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Oceane Event Planner
            </h1>
            <p className="text-xl md:text-2xl">
              Créez le mariage de vos rêves avec notre expertise
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">À propos de nous</h2>
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              Océane Event Planner, passionnée d'événementiel, mettons notre expertise à votre service pour vous accompagner dans toutes les étapes de votre projet.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Nos Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Haute Couture */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <Calendar className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-4 text-emerald-600">
                Haute Couture
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                De la première rencontre à la réalisation de votre projet, nous vous accompagnons dans chaque étape. Notre approche sur-mesure garantit une expérience unique, adaptée à vos envies et votre style.
              </p>
              <div className="text-emerald-600 font-semibold">
                À partir de 2500€
              </div>
            </div>

            {/* La Confection */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <Heart className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-4 text-emerald-600">
                La Confection
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Le jour de votre événement, profitez pleinement de vos invités pendant que nous orchestrons chaque détail. Notre équipe expérimentée assure une coordination parfaite pour un moment inoubliable.
              </p>
              <div className="text-emerald-600 font-semibold">
                À partir de 1500€
              </div>
            </div>

            {/* Accompagnement */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <Camera className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-4 text-emerald-600">
                Accompagnement
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Besoin de conseils pour votre événement ? Nous vous guidons et répondons à vos questions pour organiser chaque étape. Notre expertise est à votre service pour créer un événement qui vous ressemble.
              </p>
              <div className="text-emerald-600 font-semibold">
                À partir de 800€
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/contact" className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors text-lg font-semibold inline-block">
              Contactez-nous
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi Nous Choisir</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Star className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expertise</h3>
              <p className="text-gray-600">
                Une équipe passionnée avec des années d'expérience dans l'organisation de mariages exceptionnels.
              </p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Approche Personnalisée</h3>
              <p className="text-gray-600">
                Chaque mariage est unique, nous créons une expérience sur mesure qui correspond à vos rêves.
              </p>
            </div>
            <div className="text-center">
              <Gift className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Attention aux Détails</h3>
              <p className="text-gray-600">
                Du plus grand au plus petit détail, nous veillons à ce que tout soit parfait pour votre grand jour.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Ce Que Disent Nos Clients</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 mb-4">
                "Oceane a transformé notre mariage en un conte de fées. Son attention aux détails et sa créativité ont dépassé toutes nos attentes."
              </p>
              <p className="font-semibold">Marie & Thomas</p>
              <p className="text-sm text-gray-500">Mariés en Juin 2023</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 mb-4">
                "Grâce à Oceane, nous avons pu profiter pleinement de notre journée sans stress. Tout était parfaitement orchestré."
              </p>
              <p className="font-semibold">Sophie & Pierre</p>
              <p className="text-sm text-gray-500">Mariés en Septembre 2023</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Prêt à commencer l'aventure ?</h2>
          <Link to="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700">
            Demander un devis
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OceaneEventPlanner;