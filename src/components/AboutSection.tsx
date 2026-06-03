import { motion } from "framer-motion";
import { Shield, Target, Award } from "lucide-react";
import gdMerdeka from "@/assets/gdmerdeka.jpg";

interface AboutSectionProps {
  id?: string;
  heading?: string;
  headingHighlight?: string;
  subheading?: string;
  backgroundImage?: string | null;
}

export function AboutSection({
  id,
  heading,
  headingHighlight,
  subheading,
  backgroundImage,
}: AboutSectionProps) {
  const bgImage = backgroundImage || gdMerdeka.src;

  const stats = [
    {
      title: "Years of Practice",
      value: "35+",
      description: "Providing trusted legal counsel since 1988",
      icon: Shield,
      gradient: "from-red-600 to-zinc-900 dark:from-red-500 dark:to-zinc-800",
    },
    {
      title: "Successful Cases",
      value: "500+",
      description: "Representing local & international clients",
      icon: Target,
      gradient: "from-zinc-900 to-red-600 dark:from-zinc-800 dark:to-red-500",
    },
    {
      title: "Client Retention",
      value: "98%",
      description: "Delivering absolute loyalty & excellence",
      icon: Award,
      gradient: "from-red-700 to-amber-600 dark:from-red-600 dark:to-amber-500",
    },
  ];

  return (
    <section
      id={id}
      className="relative overflow-hidden min-h-screen lg:min-h-0 lg:h-full flex flex-col justify-start lg:justify-center w-full pt-52 pb-12 lg:pt-28 lg:pb-4"
    >
      {/* Background Section */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0">
          <img
            src={bgImage}
            alt="About Background"
            className="w-full h-full object-cover grayscale opacity-60 dark:opacity-40"
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] bg-gradient-to-b from-background/90 via-background/30 to-background/90" />
        </div>
      </div>

      {/* Decorative Blur Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -right-10 w-96 h-96 bg-red-500/10 rounded-full filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute bottom-1/4 -left-10 w-96 h-96 bg-zinc-500/10 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold tracking-tight"
            >
              {heading || "About"}{" "}
              <span className="bg-gradient-to-r from-zinc-950 via-red-600 to-zinc-950 dark:from-white dark:via-red-500 dark:to-white bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                {headingHighlight || "Wijaya Partners"}
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              {subheading ? (
                subheading.split('\n\n').map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base md:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-light"
                  >
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-base md:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-light">
                  Since 1988, Wijaya & Partners has served as a dedicated legal guardian from our base in Bandung, providing sophisticated commercial litigation and advisory for local enterprises and global partners alike.
                </p>
              )}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a
                href="/contact"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition-colors shadow-lg hover:shadow-red-600/20"
              >
                Schedule a Consultation
              </a>
              <a
                href="/teams"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-zinc-300 dark:border-zinc-700 bg-background/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                Meet Our Lawyers
              </a>
            </motion.div>
          </div>

          {/* Right Column: Key Stats / Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-4 p-6 rounded-2xl border bg-background/40 backdrop-blur-md shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
                >
                  {/* Subtle hover gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-zinc-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-sm`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-900 to-red-600 dark:from-white dark:to-red-400 bg-clip-text text-transparent">
                        {stat.value}
                      </span>
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {stat.title}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-650 dark:text-zinc-400 font-light">
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
