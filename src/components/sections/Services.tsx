import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    name: 'Oceane Event Planner',
    description:
      'Créez des moments inoubliables avec notre service de wedding planning professionnel.',
    href: '/oceane-event-planner',
    icon: '🎉',
    imageSrc: '/images/event-planner.jpg',
    imageAlt: 'Table de mariage élégamment décorée',
  },
  {
    name: 'Vertiyo',
    description:
      'Transformez votre espace extérieur en un jardin paradisiaque avec notre expertise en aménagement paysager.',
    href: '/vertiyo',
    icon: '🌿',
    imageSrc: '/images/garden-design.jpg',
    imageAlt: 'Jardin paysager avec allée et plantes',
  },
];

export function Services() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Nos Services
          </h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.name}
              className="flex flex-col items-start rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative w-full h-56">
                <Image
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="max-w-xl p-6">
                <div className="flex items-center gap-x-4 text-xs">
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={service.href}>
                      <span className="absolute inset-0" />
                      {service.name}
                    </Link>
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-gray-600">{service.description}</p>
                </div>
                <div className="mt-6">
                  <Link
                    href={service.href}
                    className="text-sm font-semibold leading-6 text-green-600 hover:text-green-500 flex items-center"
                  >
                    En savoir plus
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
