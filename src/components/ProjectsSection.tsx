import { motion } from "framer-motion";
import { MarqueeLogos } from "./MarqueeLogos";
import { Sparkles, ShieldCheck, Briefcase } from "lucide-react";

interface Client {
  name: string;
  logo: string;
}

interface ProjectsSectionProps {
  clients: Client[];
}

export function ProjectsSection({ clients }: ProjectsSectionProps) {
  // Split clients into two rows for the marquee
  const half = Math.ceil(clients.length / 2);
  const row1 = clients.slice(0, half).map(c => ({ name: c.name, url: c.logo }));
  const row2 = clients.slice(half).map(c => ({ name: c.name, url: c.logo }));

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="projects" className="py-24 md:py-36 border-t bg-gradient-to-b from-background via-muted/5 to-background relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-500/5 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-zinc-500/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-background/50 backdrop-blur-sm text-xs font-semibold tracking-wider text-red-650 uppercase"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Trusted Partnerships
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Our Clients &{" "}
            <span className="bg-gradient-to-r from-zinc-950 via-red-600 to-zinc-950 dark:from-white dark:via-red-500 dark:to-white bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Key Projects
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Since 1988, Wijaya & Partners has served as a dedicated legal guardian, representing prominent enterprises, financial institutions, and global partners.
          </motion.p>
        </div>

        {/* Marquee Showcase */}
        <div className="space-y-6 mb-24 relative">
          {/* Subtle gradient overlays to fade the edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {row1.length > 0 && (
            <MarqueeLogos logos={row1} reverse={true} className="py-2" />
          )}
          {row2.length > 0 && (
            <MarqueeLogos logos={row2} reverse={false} className="py-2" />
          )}
        </div>

        {/* Detailed Grid Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b">
          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-red-600" />
              Corporate Portfolio
            </h3>
            <p className="text-sm text-muted-foreground">
              A comprehensive view of the enterprises we protect and guide
            </p>
          </div>
          <div className="text-xs text-muted-foreground mt-2 md:mt-0">
            Showing {clients.length} representing partners
          </div>
        </div>

        {/* Clients Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {clients.map((client, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="group relative p-6 rounded-xl border bg-card/45 backdrop-blur-sm hover:bg-card/90 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center min-h-[120px]"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-10 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                loading="lazy"
              />
              
              {/* Client Name Label on Hover */}
              <div className="absolute bottom-2 text-[10px] tracking-wider text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium uppercase mt-2">
                {client.name}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
