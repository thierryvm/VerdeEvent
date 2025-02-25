// Removed unused import of React
import { Link } from 'react-router-dom';
import { Flower2, TreePine, ArrowRight, Star, Heart, Users, Shield, ChevronDown } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=75")' }} role="banner" aria-label="Image d'en-tête représentant un événement">
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Verdevent
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              L'art de créer des moments inoubliables et des espaces enchanteurs
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700">
                Contactez-nous
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Oceane Event Planner Card */}
            <Link to="/oceane-event-planner" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:transform group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=75"
                  alt="Organisation de mariage et d'événements"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Flower2 className="w-6 h-6 text-emerald-600 mr-2" />
                    <h3 className="text-xl font-semibold">Oceane Event Planner</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Créez des moments inoubliables avec notre service de wedding planning professionnel.
                  </p>
                  <span className="text-emerald-600 group-hover:text-emerald-700 flex items-center">
                    En savoir plus
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Vertiyo Card */}
            <Link to="/vertiyo" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:transform group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=75"
                  alt="Conception et aménagement de jardins"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <TreePine className="w-6 h-6 text-emerald-600 mr-2" />
                    <h3 className="text-xl font-semibold">Vertiyo</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Transformez votre espace extérieur en un jardin paradisiaque avec notre expertise en aménagement paysager.
                  </p>
                  <span className="text-emerald-600 group-hover:text-emerald-700 flex items-center">
                    En savoir plus
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Questions Fréquentes</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Comment se déroule la première consultation ?",
                answer: "Nous organisons une rencontre en personne ou en visioconférence pour discuter de votre projet, comprendre vos besoins et vous présenter nos services en détail."
              },
              {
                question: "Quels types d'événements organisez-vous ?",
                answer: "Nous organisons principalement des mariages, mais nous accompagnons aussi nos clients pour d'autres célébrations importantes comme les fiançailles, les anniversaires et les événements d'entreprise."
              },
              {
                question: "Quelle est la durée moyenne d'un projet d'aménagement paysager ?",
                answer: "La durée varie selon l'ampleur du projet, généralement de quelques semaines à plusieurs mois. Nous établissons un calendrier détaillé lors de la phase de planification."
              },
              {
                question: "Travaillez-vous avec des partenaires locaux ?",
                answer: "Oui, nous collaborons avec un réseau de prestataires locaux de confiance pour garantir des services de qualité et soutenir l'économie locale."
              },
              {
                question: "Proposez-vous un service d'entretien après l'aménagement ?",
                answer: "Oui, nous proposons des contrats d'entretien personnalisés pour maintenir votre jardin en parfait état tout au long de l'année."
              },
              {
                question: "Comment sont déterminés les tarifs ?",
                answer: "Nos tarifs sont établis sur mesure en fonction de vos besoins spécifiques. Nous vous fournissons un devis détaillé après notre première consultation."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer select-none">
                    <h3 className="text-lg font-semibold pr-6">{faq.question}</h3>
                    <div className="text-emerald-600 transition-transform duration-200 group-open:rotate-180">
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Ce Que Disent Nos Clients</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">"Une équipe exceptionnelle qui a su transformer notre mariage en un moment magique. Chaque détail était parfait !"</p>
              <p className="font-semibold">Marie & Thomas</p>
              <p className="text-sm text-gray-500">Mariage, Juin 2023</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">"Notre jardin est devenu un véritable havre de paix grâce à Vertiyo. Leur créativité et leur professionnalisme sont remarquables."</p>
              <p className="font-semibold">Laurent & Sophie</p>
              <p className="text-sm text-gray-500">Projet Paysager, Mars 2023</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">"Un accompagnement personnalisé et des conseils précieux qui ont fait toute la différence dans l'organisation de notre événement."</p>
              <p className="font-semibold">Julie & Marc</p>
              <p className="text-sm text-gray-500">Mariage, Septembre 2023</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi Nous Choisir</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold mb-2">Expertise</h3>
              <p className="text-gray-600">Plus de 10 ans d'expérience dans l'événementiel et l'aménagement paysager</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold mb-2">Passion</h3>
              <p className="text-gray-600">Un engagement total pour créer des moments et des espaces inoubliables</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold mb-2">Sur Mesure</h3>
              <p className="text-gray-600">Des solutions personnalisées adaptées à vos besoins et envies</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold mb-2">Qualité</h3>
              <p className="text-gray-600">Un engagement pour l'excellence et la satisfaction client</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;