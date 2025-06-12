import {
  ArrowRight,
  CreditCard,
  Heart,
  Home,
  Shield,
  Star,
} from "lucide-react";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Footer from "../common/default-footer";
import Header from "@/components/common/DefaultHeader";
import MobileMenu from "../common/mobile-menu";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const BecomeHost = () => {
  // State for earnings calculator
  const [location, setLocation] = useState("");
  const [placeType, setPlaceType] = useState("entire");
  const [bedrooms, setBedrooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [estimatedEarnings, setEstimatedEarnings] = useState({
    monthly: 1840,
    nightly: 61,
    occupancyRate: 85,
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  // Location-based pricing data (simplified for demo)
  const locationPricing = {
    "New York, NY": { basePrice: 150, bedroomMultiplier: 1.5 },
    "Los Angeles, CA": { basePrice: 120, bedroomMultiplier: 1.3 },
    "Miami, FL": { basePrice: 100, bedroomMultiplier: 1.2 },
    "Chicago, IL": { basePrice: 90, bedroomMultiplier: 1.1 },
    "Austin, TX": { basePrice: 85, bedroomMultiplier: 1.1 },
    "San Francisco, CA": { basePrice: 180, bedroomMultiplier: 1.6 },
    "Seattle, WA": { basePrice: 110, bedroomMultiplier: 1.2 },
    "Denver, CO": { basePrice: 95, bedroomMultiplier: 1.15 },
    "Boston, MA": { basePrice: 130, bedroomMultiplier: 1.4 },
    "Nashville, TN": { basePrice: 90, bedroomMultiplier: 1.1 },
  };

  // Calculate earnings based on inputs
  const calculateEarnings = () => {
    setIsCalculating(true);

    // Get location pricing data or use default
    const pricingData = locationPricing[location] || {
      basePrice: 80,
      bedroomMultiplier: 1,
    };

    // Calculate nightly rate based on location, place type, and bedrooms
    let nightlyRate = pricingData.basePrice;

    // Adjust for place type
    if (placeType === "private") {
      nightlyRate *= 0.7; // Private room is about 70% of entire place
    } else if (placeType === "shared") {
      nightlyRate *= 0.4; // Shared room is about 40% of entire place
    }

    // Adjust for number of bedrooms, beds, and bathrooms
    nightlyRate *= pricingData.bedroomMultiplier * bedrooms;
    nightlyRate += (beds - bedrooms) * 10; // Extra beds add value
    nightlyRate += (bathrooms - 1) * 15; // Extra bathrooms add value

    // Calculate monthly (assuming average 30 days per month with 85% occupancy)
    const occupancyRate = Math.min(90, 70 + beds * 2 + bathrooms * 3);
    const monthlyEarnings = Math.round(
      nightlyRate * 30 * (occupancyRate / 100)
    );

    // Update state after a short delay to simulate calculation
    setTimeout(() => {
      setEstimatedEarnings({
        monthly: monthlyEarnings,
        nightly: Math.round(nightlyRate),
        occupancyRate: occupancyRate,
      });
      setIsCalculating(false);

      toast({
        title: "Earnings calculated!",
        description: `Based on your inputs, you could earn around $${monthlyEarnings} per month.`,
      });
    }, 800);
  };

  return (
    <>
      <Header />
      <MobileMenu />

      <div className="min-h-screen bg-gray-100">
        {/* <DefaultHeader /> */}

        {/* Hero Section */}
        <section className="relative h-[90vh] justify-center flex items-center">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Beautiful home"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          <div className=" z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white"
            >
              <h1 className="text-5xl text-center text-white md:text-6xl font-bold mb-6">
                Share your space,
                <br />
                earn extra income
              </h1>
              <p className="text-xl text-white md:text-2xl text-center mb-8">
                Join thousands of hosts who are earning by sharing their homes,
                apartments, and unique spaces on FlapaBay.
              </p>
              <div className="flex flex-wrap pt-6 md:pt-0 justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-flapabay-yellow bg-[#ffc500] text-white text-lg hover:bg-flapabay-yellow/90"
                >
                  Become a Host <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/20 text-lg"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Earnings Calculator Section */}
        <section className="py-20 max-w-6xl mx-auto bg-flapabay-lightGray">
          <div className="flapabay-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="section-title">See how much you could earn</h2>
              <p className="section-subtitle">
                FlapaBay hosts in your area earn an average of $1,500 per month
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="lg:col-span-3 p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-6">
                  Estimate your earnings
                </h3>

                <div className="space-y-6">
                  <div className="bg-flapabay-lightGray rounded-2xl p-6">
                    <label className="block text-sm font-medium mb-2">
                      Where's your place located?
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-flapabay-yellow"
                    >
                      <option value="">Select a location</option>
                      {Object.keys(locationPricing).map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-flapabay-lightGray rounded-2xl p-6">
                    <label className="block text-sm font-medium mb-2">
                      What type of place will you host?
                    </label>
                    <select
                      value={placeType}
                      onChange={(e) => setPlaceType(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-flapabay-yellow"
                    >
                      <option value="entire">Entire place</option>
                      <option value="private">Private room</option>
                      <option value="shared">Shared room</option>
                    </select>
                  </div>

                  <div className="bg-flapabay-lightGray rounded-2xl p-6">
                    <label className="block text-sm font-medium mb-2">
                      How many guests can your place accommodate?
                    </label>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-xs mb-1">Bedrooms</label>
                        <select
                          value={bedrooms}
                          onChange={(e) => setBedrooms(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-flapabay-yellow"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs mb-1">Beds</label>
                        <select
                          value={beds}
                          onChange={(e) => setBeds(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-flapabay-yellow"
                        >
                          {[...Array(16)].map((_, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs mb-1">Bathrooms</label>
                        <select
                          value={bathrooms}
                          onChange={(e) => setBathrooms(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-flapabay-yellow"
                        >
                          {[...Array(8)].map((_, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full py-6 text-white text-lg bg-[#ffc500]"
                    size="lg"
                    onClick={calculateEarnings}
                    disabled={isCalculating}
                  >
                    {isCalculating ? (
                      <>
                        <span className="mr-2">Calculating...</span>
                        <div className="h-5 w-5 animate-spin  rounded-full border-2 border-white border-t-transparent"></div>
                      </>
                    ) : (
                      "Calculate Earnings"
                    )}
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-2 bg-flapabay-yellow p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold mb-2">
                    ${estimatedEarnings.monthly}
                  </h3>
                  <p className="text-lg text-black/80">Est. monthly earnings</p>
                  {location && (
                    <div className="mt-2 flex flex-col">
                      <p className="text-md text-black/90">
                        <span className="font-semibold">
                          ${estimatedEarnings.nightly}
                        </span>{" "}
                        per night
                      </p>
                      <p className="text-sm text-black/70">
                        Based on {estimatedEarnings.occupancyRate}% occupancy in{" "}
                        {location}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Star className="w-6 h-6 mt-1 text-black" fill="black" />
                    <div>
                      <h4 className="font-semibold text-lg">Higher demand</h4>
                      <p className="text-black/80">
                        Your area is popular with travelers right now
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CreditCard className="w-6 h-6 mt-1 text-black" />
                    <div>
                      <h4 className="font-semibold text-lg">
                        Get paid quickly
                      </h4>
                      <p className="text-black/80">
                        Payments are sent 24 hours after guest check-in
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 mt-1 text-black" />
                    <div>
                      <h4 className="font-semibold text-lg">
                        FlapaBay has you covered
                      </h4>
                      <p className="text-black/80">
                        Get $1M in damage protection and liability insurance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <div className="bg-white">
          <section className="py-20 max-w-6xl mx-auto">
            <div className="flapabay-container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="section-title">How FlapaBay hosting works</h2>
                <p className="section-subtitle">
                  List your space in 3 simple steps and start earning
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  {
                    step: "1",
                    title: "Create your listing",
                    description:
                      "It's free and easy to set up your listing on FlapaBay. Describe your space, how many guests you can accommodate, and add photos.",
                    icon: Home,
                  },
                  {
                    step: "2",
                    title: "Welcome your first guests",
                    description:
                      "Once your listing is live, qualified guests can reach out. You can message them and set your own house rules.",
                    icon: Heart,
                  },
                  {
                    step: "3",
                    title: "Start earning",
                    description:
                      "When your space is booked, we'll send you payments automatically. You can track earnings and bookings from your dashboard.",
                    icon: CreditCard,
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 bg-flapabay-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-2xl font-bold">{item.step}</span>
                      </div>
                      <Icon className="w-10 h-10 mx-auto mb-4 text-flapabay-black" />
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* Host Testimonials */}
        <section className="py-20 max-w-6xl mx-auto bg-flapabay-lightGray">
          <div className="flapabay-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="section-title">Hear from our hosts</h2>
              <p className="section-subtitle">
                Join thousands of hosts who have shared their spaces and earned
                extra income
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah J.",
                  location: "Miami, FL",
                  quote:
                    "I've been hosting on FlapaBay for 2 years and it has completely changed my financial situation. The extra income helped me renovate my house.",
                  image:
                    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
                },
                {
                  name: "Michael T.",
                  location: "New York, NY",
                  quote:
                    "The FlapaBay platform is so easy to use. I'm not tech-savvy but I was able to list my apartment and start hosting within a day!",
                  image:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
                },
                {
                  name: "Elena R.",
                  location: "Los Angeles, CA",
                  quote:
                    "I was hesitant at first, but the support from FlapaBay has been amazing. Their customer service team helped me set up and optimize my listing.",
                  image:
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl shadow-soft"
                >
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-flapabay-yellow"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-black italic">"{testimonial.quote}"</p>
                  <div className="mt-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-flapabay-yellow fill-flapabay-yellow"
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="flapabay-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="section-title">Frequently asked questions</h2>
              <p className="section-subtitle">
                Get answers to the most common questions about hosting
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "What is required to become a host?",
                  answer:
                    "To become a host, you need to create a FlapaBay account, verify your identity, provide details about your space, set house rules, and determine your availability and pricing.",
                },
                {
                  question: "How much does it cost to list my space?",
                  answer:
                    "It's completely free to list your space on FlapaBay. We only charge a service fee (typically 3%) when you receive a booking.",
                },
                {
                  question: "How do I set my own price?",
                  answer:
                    "You have full control over your listing price. Our smart pricing tool can help suggest competitive rates based on demand, location, and seasonality, but you can always set your own price.",
                },
                {
                  question: "How does FlapaBay support hosts?",
                  answer:
                    "FlapaBay provides hosts with $1M in damage protection, liability insurance, 24/7 customer support, educational resources, and a host community forum for sharing tips and advice.",
                },
                {
                  question: "What if I need to cancel a reservation?",
                  answer:
                    "While we encourage honoring reservations, we understand that unexpected events happen. You can cancel reservations, but this may affect your Superhost status and availability in search results.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-gray-200 rounded-2xl overflow-hidden"
                >
                  <details className="group">
                    <summary className="flex justify-between items-center p-6 cursor-pointer">
                      <h3 className="text-lg font-semibold">{faq.question}</h3>
                      <div className="transition-transform duration-300 group-open:rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    </summary>
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-flapabay-black/90 z-0"></div>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)",
            }}
          ></div>
          <div className="flapabay-container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                className="text-3xl md:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Ready to start hosting?
              </motion.h2>
              <motion.p
                className="text-xl text-white/80 mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Join thousands of hosts who are already earning with FlapaBay
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Button
                  size="lg"
                  className="bg-flapabay-yellow text-black text-lg hover:bg-flapabay-yellow/90 px-8 py-6"
                >
                  Become a Host <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* <Footer /> */}
      </div>

      <section className="pb-0   footer-style1 pt60">
        <Footer />
      </section>
    </>
  );
};

export default BecomeHost;
