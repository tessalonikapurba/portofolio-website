import { motion } from "framer-motion";
import { useTheme } from "../App";

type Skill = {
  name: string;
  level: number;
  color: string;
};

export default function SkillsSection() {
  const { t } = useTheme();

  const skills: Skill[] = [
    { name: "React", level: 95, color: "#61DAFB" },
    { name: "TypeScript", level: 90, color: "#3178C6" },
    { name: "Node.js", level: 85, color: "#3C873A" },
    { name: "Express.js", level: 82, color: "#9CA3AF" },
    { name: "PostgreSQL", level: 80, color: "#336791" },
    { name: "Docker", level: 75, color: "#2496ED" },
  ];

  const tools = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Docker",
  "Git",
  "GitHub",
  "VS Code",
  "Postman",
  "Figma",
  "Vercel",
];

  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">

    

     {/* Heading */}

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="mb-14"
>
  <p
    className="uppercase tracking-[0.35em] text-sm font-semibold"
    style={{ color: t.primary }}
  >
    SKILLS
  </p>

  <h2
    className="text-5xl font-bold mt-3"
    style={{ color: t.fg }}
  >
    What I work with
  </h2>

  <p
    className="mt-4 max-w-2xl leading-7"
    style={{ color: t.fgMuted }}
  >
    Technologies, frameworks, databases and cloud tools
    I use to build modern, scalable and responsive web applications.
  </p>
</motion.div>

{/* Glass Card */}

<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  whileHover={{
    y: -4,
    scale: 1.01,
  }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="rounded-3xl p-8 md:p-10"
  style={{
    background: t.cardBg,
    border: `1px solid ${t.cardBorder}`,
    backdropFilter: "blur(20px)",
  }}
>
 <div className="space-y-8">

  {skills.map((skill) => (
    <SkillItem
      key={skill.name}
      skill={skill}
      t={t}
    />
  ))}

  {/* Tools */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.3 }}
    className="pt-10"
  >

    <h3
      className="text-xl font-bold mb-6"
      style={{ color: t.fg }}
    >
      Tools & Ecosystem
    </h3>

    <div className="flex flex-wrap gap-3">

      {tools.map((tool) => (

        <motion.div
          key={tool}
          whileHover={{
            scale: 1.08,
            y: -4,
          }}
          transition={{ duration: 0.2 }}
          className="px-4 py-2 rounded-full text-sm font-medium cursor-default"
          style={{
            background: t.cardBg,
            border: `1px solid ${t.cardBorder}`,
            color: t.fgSub,
            backdropFilter: "blur(12px)",
          }}
        >
          {tool}
        </motion.div>

      ))}

    </div>

  </motion.div>

</div>

</motion.div>

</div>

</section>
);
}
function SkillItem({
  skill,
  t
}: {
  skill: Skill;
  t: any;
}) {

  return (

    <div>

      <div className="flex justify-between mb-3">

        <span
          className="font-semibold"
          style={{
            color: t.fg
          }}
        >
          {skill.name}
        </span>

        <span
          style={{
            color: t.fgSub
          }}
        >
          {skill.level}%
        </span>

      </div>

      <div

        className="h-3 rounded-full overflow-hidden"

        style={{
          background: `${t.fgMuted}20`
        }}

      >

        <motion.div

          initial={{ width: 0 }}

          whileInView={{
            width: `${skill.level}%`
          }}

          viewport={{ once: true }}

          transition={{
            duration: 1.2,
            ease: "easeOut",
            delay: 0.15,

          }}

          className="h-full rounded-full"

          style={{
            background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`,
            boxShadow: `0 0 18px ${t.primary}55`
          }}

        />

      </div>

    </div>

  );

}