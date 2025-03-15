import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export function ContactCTA() {
  return (
    <div className="bg-[#f8faf8]">
      <div className="container py-24 sm:py-32">
        <Card className="bg-white border-none shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent" />
          <CardContent className="relative p-8 sm:p-12">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight font-playfair mb-6 text-[#1b1f2b] leading-tight">
                Prêt à concrétiser votre projet ?
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Contactez-nous dès aujourd'hui pour donner vie à vos idées.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <Link
                  href="tel:+32471513857"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-[#1b1f2b] px-8 py-4 text-base font-semibold text-white hover:bg-[#2d3344] transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  +32 471 51 38 57
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
