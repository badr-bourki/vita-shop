import { Layout } from '@/components/layout/Layout';
import { Heart, Leaf, Shield, Users, Award, Target } from 'lucide-react';

const values = [
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description: 'We source only the highest quality, naturally-derived ingredients for all our products.',
  },
  {
    icon: Shield,
    title: 'Science-Backed',
    description: 'Every formulation is backed by research and tested for efficacy and safety.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Your health and satisfaction are at the center of everything we do.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We believe in building a supportive community focused on holistic wellness.',
  },
];

const milestones = [
  { year: '2018', event: 'VitaCare founded with a mission to make wellness accessible' },
  { year: '2019', event: 'Launched our first line of premium supplements' },
  { year: '2020', event: 'Expanded to skincare and personal care products' },
  { year: '2021', event: 'Reached 100,000 happy customers worldwide' },
  { year: '2022', event: 'Introduced sustainable packaging across all products' },
  { year: '2023', event: 'Opened our state-of-the-art wellness research center' },
];

const faqs = [
  {
    question: 'Are VitaCare products tested on animals?',
    answer: 'No, we are proudly cruelty-free. We never test our products on animals and work only with suppliers who share our commitment to ethical practices.',
  },
  {
    question: 'Where are your products manufactured?',
    answer: 'All VitaCare products are manufactured in certified facilities that meet strict quality and safety standards. Our supplements are made in GMP-certified facilities.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes! We ship to over 50 countries worldwide. Shipping times and costs vary by location. Check our shipping page for more details.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day satisfaction guarantee. If you\'re not completely happy with your purchase, contact us for a full refund or exchange.',
  },
  {
    question: 'Are your products suitable for vegans?',
    answer: 'Many of our products are vegan-friendly and clearly labeled. Check individual product pages for specific dietary information.',
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sage/20 to-background py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              About Us
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
              Our Mission is Your{' '}
              <span className="text-primary">Wellness</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At VitaCare, we believe that everyone deserves access to premium health and wellness 
              products. Our journey began with a simple idea: create products that truly make a 
              difference in people's lives.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  VitaCare was born from a personal journey. Our founder, after struggling to find 
                  wellness products that were both effective and transparent about their ingredients, 
                  decided to create something better.
                </p>
                <p>
                  What started as a small operation in 2018 has grown into a trusted brand serving 
                  hundreds of thousands of customers worldwide. But our core values remain the same: 
                  quality, transparency, and a genuine commitment to your health.
                </p>
                <p>
                  Today, our team of scientists, nutritionists, and wellness experts work tirelessly 
                  to develop products that meet the highest standards of quality and efficacy.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-sage/30 to-primary/20 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <Award className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                    Excellence in Wellness
                  </h3>
                  <p className="text-muted-foreground">
                    Award-winning products trusted by over 100,000 customers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground">
              These principles guide everything we do at VitaCare.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-background rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-muted-foreground">
              Key milestones in our mission to make wellness accessible to all.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="font-serif text-xl font-semibold text-primary">
                      {milestone.year}
                    </span>
                  </div>
                  <div className="relative flex-1 pb-6">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-primary rounded-full -translate-x-[7px]" />
                    {index < milestones.length - 1 && (
                      <div className="absolute left-0 top-5 w-0.5 h-full bg-primary/20 -translate-x-[1px]" />
                    )}
                    <p className="text-foreground pl-4">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Got questions? We've got answers.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-background rounded-lg border border-border overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="font-medium text-foreground pr-4">{faq.question}</h3>
                  <span className="flex-shrink-0 text-muted-foreground group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-muted-foreground">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <Target className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6">
            Our Promise to You
          </h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            We promise to continue innovating, listening to your needs, and delivering products 
            that support your wellness journey. Because when you thrive, we thrive.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default About;
