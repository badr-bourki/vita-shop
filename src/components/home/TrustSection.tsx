import { Truck, Shield, Leaf, HeadphonesIcon, Award, RefreshCcw } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $50. Fast and reliable delivery to your doorstep.',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'All products tested for purity and potency. 100% satisfaction guaranteed.',
  },
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description: 'Clean, sustainable formulas. No harmful additives or artificial colors.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Expert wellness advisors ready to help you on your health journey.',
  },
  {
    icon: Award,
    title: 'Certified Organic',
    description: 'Third-party verified organic and non-GMO certifications.',
  },
  {
    icon: RefreshCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns if you\'re not completely satisfied.',
  },
];

export const TrustSection = () => {
  return (
    <section className="section-padding bg-sage-light">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose VitaCare
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to your wellness with quality products, exceptional service, 
            and sustainable practices.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex gap-4 p-6 bg-background rounded-2xl shadow-soft hover:shadow-medium transition-shadow animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
