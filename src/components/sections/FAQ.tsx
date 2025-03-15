'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'Comment se déroule la première consultation ?',
    answer:
      'Nous organisons une rencontre en personne ou en visioconférence pour discuter de votre projet, comprendre vos besoins et vous présenter nos services en détail.',
  },
  {
    question: "Quels types d'événements organisez-vous ?",
    answer:
      "Nous organisons principalement des mariages, mais nous accompagnons aussi nos clients pour d'autres célébrations importantes comme les fiançailles, les anniversaires et les événements d'entreprise.",
  },
  {
    question: "Quelle est la durée moyenne d'un projet d'aménagement paysager ?",
    answer:
      "La durée varie selon l'ampleur du projet, généralement de quelques semaines à plusieurs mois. Nous établissons un calendrier détaillé lors de la phase de planification.",
  },
  {
    question: 'Travaillez-vous avec des partenaires locaux ?',
    answer:
      "Oui, nous collaborons avec un réseau de prestataires locaux de confiance pour garantir des services de qualité et soutenir l'économie locale.",
  },
  {
    question: "Proposez-vous un service d'entretien après l'aménagement ?",
    answer:
      "Oui, nous proposons des contrats d'entretien personnalisés pour maintenir votre jardin en parfait état tout au long de l'année.",
  },
  {
    question: 'Comment sont déterminés les tarifs ?',
    answer:
      'Nos tarifs sont établis sur mesure en fonction de vos besoins spécifiques. Nous vous fournissons un devis détaillé après notre première consultation.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Questions Fréquentes
          </h2>
        </div>
        <div className="mx-auto mt-16 max-w-2xl space-y-4 md:max-w-4xl">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                onClick={() => toggleFaq(index)}
              >
                <span className="text-base font-medium text-gray-900">{faq.question}</span>
                <span className="ml-6 flex-shrink-0 text-green-600">
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-base text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
