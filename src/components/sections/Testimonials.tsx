const testimonials = [
  {
    content:
      "L'équipe d'Océane Event Planner a organisé notre mariage de A à Z. Tout était parfait, du choix des prestataires à la coordination le jour J. Un grand merci pour ce moment inoubliable !",
    author: 'Sophie et Thomas',
    role: 'Mariage, Juin 2023',
    initial: 'S',
  },
  {
    content:
      "Vertiyo a complètement transformé notre jardin. Leur expertise et leur créativité ont donné vie à un espace extérieur dont nous profitons toute l'année. Professionnalisme et qualité au rendez-vous !",
    author: 'Marc et Julie',
    role: 'Aménagement de jardin, Mai 2023',
    initial: 'M',
  },
  {
    content:
      "Nous avons fait appel à Océane pour l'organisation de notre séminaire d'entreprise. L'événement a été un succès total, avec une organisation impeccable et une attention aux détails remarquable.",
    author: 'Laurent D.',
    role: "Séminaire d'entreprise, Septembre 2023",
    initial: 'L',
  },
];

export function Testimonials() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-playfair">
            Ce que nos clients disent
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Découvrez les témoignages de nos clients satisfaits.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col justify-between bg-white p-8 shadow-sm rounded-xl border border-gray-100"
            >
              <div>
                <p className="text-base leading-7 text-gray-700">"{testimonial.content}"</p>
              </div>
              <div className="mt-8 flex items-center gap-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 font-semibold">
                  {testimonial.initial}
                </div>
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    {testimonial.author}
                  </h3>
                  <p className="text-sm leading-6 text-green-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
