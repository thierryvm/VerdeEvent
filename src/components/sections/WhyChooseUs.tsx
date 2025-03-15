import { Heart, Shield, Star, Users } from 'lucide-react';

const features = [
  {
    name: 'Expertise',
    description: "Plus de 10 ans d'expérience dans l'événementiel et l'aménagement paysager",
    icon: Star,
  },
  {
    name: 'Passion',
    description: 'Un engagement total pour créer des moments et des espaces inoubliables',
    icon: Heart,
  },
  {
    name: 'Sur Mesure',
    description: 'Des solutions personnalisées adaptées à vos besoins et envies',
    icon: Users,
  },
  {
    name: 'Qualité',
    description: "Un engagement pour l'excellence et la satisfaction client",
    icon: Shield,
  },
];

export function WhyChooseUs() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Pourquoi Nous Choisir
          </h2>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <feature.icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <dt className="text-xl font-semibold leading-7 text-gray-900">{feature.name}</dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
