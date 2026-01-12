import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Fitness Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    content: 'The Aloe MSM Gel has been a game-changer for my post-workout recovery. I love that it\'s made with natural ingredients!',
    rating: 5,
    product: 'Aloe MSM Gel',
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Health Coach',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content: 'VitaCare\'s supplements are top-notch quality. My clients love them, and I\'ve seen amazing results in their wellness journey.',
    rating: 5,
    product: 'Vitamin C Plus',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Yoga Instructor',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content: 'The Aloe Vera Gelly is incredible! It soothes my skin after every session. Pure and effective - exactly what I needed.',
    rating: 5,
    product: 'Aloe Vera Gelly',
  },
];

export const Testimonials = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their health with VitaCare.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative p-8 bg-card rounded-2xl shadow-soft hover:shadow-medium transition-shadow animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 h-8 w-8 text-sage-light" />

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? 'fill-gold text-gold'
                        : 'fill-muted text-muted'
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Product Tag */}
              <div className="inline-block px-3 py-1 bg-sage-light text-primary text-sm rounded-full mb-6">
                {testimonial.product}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 p-8 bg-primary rounded-2xl text-primary-foreground">
          <div className="text-center">
            <div className="font-serif text-4xl font-bold mb-1">50K+</div>
            <div className="text-primary-foreground/70 text-sm">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-4xl font-bold mb-1">4.8</div>
            <div className="text-primary-foreground/70 text-sm">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-4xl font-bold mb-1">100+</div>
            <div className="text-primary-foreground/70 text-sm">Premium Products</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-4xl font-bold mb-1">15+</div>
            <div className="text-primary-foreground/70 text-sm">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};
