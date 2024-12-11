import { cn } from "@/lib/utils";
import {
  Move,
  CheckSquare,
  BarChart,
  HelpCircle,
  Route,
  Terminal,
  Lock,
  Layers,
  Mail,
  Bell,
  UserPlus,
  Calendar
} from "lucide-react";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Event Creation & Management",
      description:
        "Companies can easily create and manage events with all necessary tools in one place.",
      icon: <Calendar />,
    },
    {
      title: "User Registration System",
      description:
        "Allow users to quickly register for events with a seamless and intuitive process.",
      icon: <UserPlus />,
    },
    {
      title: "Real-Time Notifications",
      description:
        "Keep attendees updated with instant notifications for registrations, updates, and reminders.",
      icon: <Bell />,
    },
    {
      title: "Automated Emails",
      description:
        "Effortless email integration ensures users are informed about event details and changes.",
      icon: <Mail />,
    },
    {
      title: "Multi-Tenant Support",
      description:
        "Enable companies to manage their own events without interference on a shared platform.",
      icon: <Layers />,
    },
    {
      title: "Modern Tech Stack",
      description:
        "Built with Next.js 15, Bun, server actions, and the latest technologies for speed and scalability.",
      icon: <Terminal />,
    },
    {
      title: "User-Friendly Interface",
      description:
        "An intuitive and fast UI ensures ease of use for companies and event attendees.",
      icon: <Move />,
    },
    {
      title: "Scalable Architecture",
      description:
        "Optimized for handling high traffic and large-scale events effortlessly.",
      icon: <Route />,
    },
{
      title: "Attendance Management",
      description:
        "Easily track attendee participation and manage check-ins with robust tools.",
      icon: <CheckSquare />,
    },
    {
      title: "Analytics & Insights",
      description:
        "Track registrations, attendance, and engagement with powerful analytics dashboards.",
      icon: <BarChart />,
    },
    {
      title: "Secure and Reliable",
      description:
        "Your data is protected with robust security measures, ensuring 100% uptime.",
      icon: <Lock />,
    },
    {
      title: "24/7 Support",
      description:
        "Dedicated support is always available to assist companies and users.",
      icon: <HelpCircle />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 pb-10 px-2 max-w-8xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
}