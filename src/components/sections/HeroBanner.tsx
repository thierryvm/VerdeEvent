import Image from 'next/image';
import Link from 'next/link';

export function HeroBanner() {
  return (
    <div className="relative bg-gray-900 text-white">
      {/* Image de fond avec overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="Table de mariage élégante"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      {/* Contenu */}
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl font-playfair">Verdevent</h1>
          <p className="mt-6 text-lg leading-8">
            L'art de créer des moments inoubliables et des espaces enchanteurs
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Contactez-nous
              <svg
                className="ml-2 h-4 w-4"
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
      </div>
    </div>
  );
}
