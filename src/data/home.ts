import type { HomePageData } from "@/types/home";

export const homePageData: HomePageData = {
  hero: {
    announcementLabel: "NEW",
    announcementText:
      "Gartner Names Articul8 a Tech Innovator in Domain-Specific AI for Manufacturing and Energy.",
    title: "Domain-Specific GenAI Platform Purpose-Built for Your Data and Mission",
    description: "From data chaos to hyper-personalized GenAI enterprise outcomes.",
    ctaLabel: "Explore Platform",
    ctaHref: "#platform",
  },
  trustedCompanies: {
    eyebrow: "Trusted by Industry Leaders",
    companies: ["Intel", "EPRI", "AWS", "Microsoft", "Google Cloud", "Databricks"],
  },
  pillars: {
    eyebrow: "Built for What Matters",
    title:
      "Complex Enterprise Missions, Autonomously Executed with Trusted, Personalized Outcomes",
    pillars: [
      {
        icon: "AI",
        title: "Agent of Agents",
        description: "Autonomous, intelligent collaboration across agents and models.",
      },
      {
        icon: "DS",
        title: "Domain-Specific Models",
        description: "Tailored intelligence for your industry.",
      },
      {
        icon: "TR",
        title: "Trust Every Decision",
        description: "Observability, auditability, and traceability at every step.",
      },
      {
        icon: "HP",
        title: "Hyper-Personalization",
        description: "Model creation begins instantly at ingestion.",
      },
    ],
  },
  platformBanner: {
    title: "The Articul8 Platform Delivers Trusted AI Outcomes",
    description:
      "Not just outputs. Built for enterprise scale, designed for regulated industries, and optimized for accuracy, explainability, and speed.",
    ctaLabel: "View Platform Stack",
    ctaHref: "#cta",
    complianceText:
      "SOC 2 Type II Compliance - certified security and confidentiality standards",
  },
  platformPowers: {
    eyebrow: "What Powers the Platform",
    title: "Three engines behind every trusted outcome",
    powers: [
      {
        title: "ModelMesh",
        description: "Autonomous agentic reasoning engine.",
      },
      {
        title: "LLM-IQ",
        description: "Model evaluation and dynamic routing.",
      },
      {
        title: "Hyper-Personalized Agent Models",
        description: "Developing hyper-personalized agents for enterprise users.",
      },
    ],
  },
  dsm: {
    eyebrow: "Domain-Specific Models",
    title: "Our Domain-Specific Models (DSM) Crush GPT-5",
    description:
      "Our growing library of domain and task specific models are delivering expert-level performance and outperforming general-purpose models across reasoning and efficiency benchmarks.",
    note:
      "These represent only a sample of the many DSMs built from the ground up - core IP designed for the world's most complex industries.",
    cards: [
      {
        name: "A8-Semicon",
        description:
          "Verilog-capable DSM for semiconductor engineering; integrates domain knowledge with reasoning for complex chip design workflows.",
        metrics: [
          {
            value: "2x Performance Boost",
            caption: "over the latest open-source state-of-the-art models.",
          },
          {
            value: "Matches or exceeds",
            caption:
              "proprietary models like Google Flash 2.0 and GPT-4o, at a fraction of the compute cost.",
          },
        ],
      },
      {
        name: "A8-Energy",
        description:
          "Developed with EPRI; trained on 10K+ specialized energy datasets to deliver context-rich, expert reasoning for energy sector challenges.",
        metrics: [
          {
            value: "96.9% Accuracy",
            caption: "across 10 specialized energy topics (vs. GPT-OSS-20B's 71.3%).",
          },
          {
            value: "28% more accurate",
            caption: "than leading general LLMs.",
          },
        ],
      },
      {
        name: "A8-SupplyChain",
        description:
          "Optimized for manufacturing and supply chain operations; perceives and reasons over complex technical documentation without data replication.",
        metrics: [
          {
            value: "92% accuracy",
            caption: "outperforming typical factor labeling baselines of 80-87%.",
          },
          {
            value: "3x improvement",
            caption: "in reasoning over process sequences.",
          },
        ],
      },
      {
        name: "A8-Fin",
        description:
          "Finance-focused DSM for tasks such as tabular analysis, portfolio management, and compliance.",
        metrics: [
          {
            value: "90+% accuracy",
            caption: "versus about 60% of competing models in our proprietary benchmarks.",
          },
          {
            value: "3.5X cheaper",
            caption: "optimized deployment footprint versus best open source models.",
          },
        ],
      },
    ],
  },
  marketplace: {
    eyebrow: "Marketplace Availability",
    title: "Deploy Articul8 where you already build",
    description:
      "You can now find Articul8 on the world's leading marketplaces - making it easier than ever to deploy, integrate, and scale our platform directly within your enterprise environment.",
    chips: ["AWS", "Microsoft", "Google Cloud Platform", "Databricks"],
  },
  ceoFeature: {
    eyebrow: "Voices in the Valley - CNBC-TV18",
    title: "From Jet Engines to GenAI: Articul8 CEO on Engineering the Future",
    description: [
      "Articul8 CEO Arun Subramaniyan sits down with Shereen Bhan to share how his journey from aerospace engineering to scaling AI at AWS laid the groundwork for building a next-generation enterprise GenAI platform.",
      "Arun explains how domain-specific GenAI, physics-informed models, and autonomous orchestration are reshaping how regulated industries like energy, manufacturing, and aerospace solve complex challenges at scale.",
    ],
  },
  news: {
    eyebrow: "In the News",
    title: "Discover the latest from Articul8",
    description: "Company updates, expert perspectives, and client testimonials.",
    cards: [
      {
        title: 'An "agent of agents" for industrial applications',
        description:
          "At the heart of Articul8's technology is ModelMesh, which goes beyond typical model orchestration frameworks to create what the company describes as an agent of agents for industrial applications.",
      },
      {
        title: "Why GenAI Projects Fail - and What It Takes to Rethink Enterprise Data Architecture",
        description:
          "Only 5% of GenAI projects succeed in production. This blog breaks down where the real bottlenecks are - and how Autonomous Data Perception can unlock real-time ROI at scale.",
      },
    ],
  },
  finalCta: {
    title: "Stop Falling Behind. Start",
    highlight: "Articul8'ing",
    description:
      "From data chaos to trusted, hyper-personalized GenAI outcomes - purpose-built for your data and mission.",
    ctaLabel: "Get Started with Articul8",
    ctaHref: "#top",
  },
};
