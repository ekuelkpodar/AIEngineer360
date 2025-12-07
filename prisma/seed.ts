import { PrismaClient, Difficulty, QuestionType, ProgressStatus } from "@prisma/client";
import { slugify } from "../src/lib/slugify";

const prisma = new PrismaClient();

type TopicSeed = {
  name: string;
  description: string;
  parent?: string;
  isFeatured?: boolean;
};

const topicSeeds: TopicSeed[] = [
  {
    name: "Machine Learning Fundamentals",
    description: "Core ML ideas: bias/variance, generalization, under/overfitting, and data quality.",
    isFeatured: true,
  },
  {
    name: "Statistics & Probability",
    description: "Distributions, estimators, confidence intervals, and Bayesian reasoning.",
    isFeatured: true,
  },
  {
    name: "Linear Regression",
    description: "OLS assumptions, regularization, diagnostics, and interpretation.",
  },
  {
    name: "Logistic Regression",
    description: "Classification, calibration, thresholds, and handling imbalance.",
  },
  {
    name: "Tree Methods",
    description: "Decision trees, random forests, XGBoost, and hyperparameter trade-offs.",
    isFeatured: true,
  },
  {
    name: "Model Evaluation & Experimentation",
    description: "Metrics, A/B tests, cross-validation, and offline vs online gaps.",
    isFeatured: true,
  },
  {
    name: "Feature Engineering",
    description: "Transformations, leakage avoidance, encoding strategies, and scaling.",
  },
  {
    name: "Dimensionality Reduction",
    description: "PCA, SVD, t-SNE/UMAP intuition, and when to avoid them.",
  },
  {
    name: "Optimization & Gradient Descent",
    description: "Loss landscapes, optimizers, convergence diagnostics, and stability.",
  },
  {
    name: "Deep Learning",
    description: "Architectures, activations, normalization, regularization for neural nets.",
    isFeatured: true,
  },
  {
    name: "CNNs",
    description: "Convolutions, receptive fields, pooling, and vision model trade-offs.",
  },
  {
    name: "RNNs & Transformers",
    description: "Sequence modeling, attention, memory, and modern architectures.",
  },
  {
    name: "NLP",
    description: "Tokenization, embeddings, sequence labeling, evaluation, and safety.",
  },
  {
    name: "Recommender Systems",
    description: "Collaborative filtering, ranking metrics, cold-start, and abuse prevention.",
    isFeatured: true,
  },
  {
    name: "Time Series",
    description: "Stationarity, forecasting, seasonality, and hierarchical models.",
  },
  {
    name: "Reinforcement Learning",
    description: "MDPs, value/policy methods, exploration vs exploitation, safety.",
  },
  {
    name: "MLOps & Production",
    description: "Monitoring, drift, data contracts, deployment patterns, and rollbacks.",
    isFeatured: true,
  },
  {
    name: "Data Engineering for ML",
    description: "Pipelines, batch vs streaming, quality checks, and data lineage.",
  },
  {
    name: "SQL for Data Science",
    description: "Joins, window functions, CTEs, and performance tuning.",
  },
  {
    name: "Python for DS",
    description: "Idiomatic Python, packaging, typing, and notebooks to prod.",
  },
  {
    name: "Pandas & NumPy",
    description: "Vectorization, indexing, memory use, and common pitfalls.",
  },
  {
    name: "System Design for ML",
    description: "End-to-end ML system design, latency, cost, and safety constraints.",
    isFeatured: true,
  },
];

const tagSeeds = [
  "metrics",
  "regularization",
  "deployment",
  "experimentation",
  "data-quality",
  "interpretability",
  "probability",
  "deep-learning",
  "transformers",
  "feature-engineering",
  "sql",
  "python",
  "optimization",
  "production",
];

const promptPatterns = [
  {
    title: "Explain the intuition behind",
    answer: (topic: string) =>
      `Describe the core intuition, trade-offs, and when \`${topic}\` is a strong or weak choice. Include a brief example and an edge case to avoid.`,
  },
  {
    title: "Debugging scenario for",
    answer: (topic: string) =>
      `Outline a debugging checklist when \`${topic}\` underperforms. Include data quality checks, metric sanity, and a small experiment you would run first.`,
  },
  {
    title: "Communicate to a PM",
    answer: (topic: string) =>
      `Explain \`${topic}\` to a non-technical PM focusing on user impact, risks, and how to measure success without jargon.`,
  },
  {
    title: "Math checkpoint",
    answer: (topic: string) =>
      `Provide the key equation for \`${topic}\` and interpret each term. Include how changing one term shifts the model behavior.`,
  },
  {
    title: "Implementation pitfall",
    answer: (topic: string) =>
      `Call out a common pitfall when implementing \`${topic}\` in production and how to guardrail it with monitoring or tests.`,
  },
];

const difficultyCycle: Difficulty[] = [
  Difficulty.junior,
  Difficulty.mid,
  Difficulty.senior,
  Difficulty.expert,
];

const typeCycle: QuestionType[] = [
  QuestionType.conceptual,
  QuestionType.math,
  QuestionType.system_design,
  QuestionType.coding,
];

function makeSlug(text: string) {
  return slugify(text);
}

async function main() {
  console.log("Resetting database...");
  await prisma.questionTag.deleteMany();
  await prisma.questionTopic.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.question.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();
  await prisma.searchSynonym.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.jobPost.deleteMany();

  console.log("Seeding topics...");
  const topicRecords = await Promise.all(
    topicSeeds.map((t, index) =>
      prisma.topic.create({
        data: {
          name: t.name,
          slug: makeSlug(t.name),
          description: t.description,
          isFeatured: t.isFeatured ?? false,
          orderIndex: index,
        },
      })
    )
  );

  console.log("Seeding tags...");
  const tagRecords = await Promise.all(
    tagSeeds.map((name) =>
      prisma.tag.create({
        data: { name, slug: makeSlug(name) },
      })
    )
  );

  console.log("Generating questions...");
  const questionsPayload: {
    title: string;
    slug: string;
    prompt: string;
    answer: string;
    difficulty: Difficulty;
    type: QuestionType;
    estimatedMinutes: number;
    topicIds: string[];
    tagIds: string[];
  }[] = [];

  let counter = 0;
  for (const topic of topicRecords) {
    for (const pattern of promptPatterns) {
      counter += 1;
      const diff = difficultyCycle[counter % difficultyCycle.length];
      const qType = typeCycle[counter % typeCycle.length];
      const title = `${pattern.title} ${topic.name}`;
      const slug = makeSlug(`${topic.slug}-${pattern.title}-${counter}`);
      questionsPayload.push({
        title,
        slug,
        prompt: `You are asked about ${topic.name}. Provide context and examples.`,
        answer: pattern.answer(topic.name),
        difficulty: diff,
        type: qType,
        estimatedMinutes: 5 + (counter % 5),
        topicIds: [topic.id],
        tagIds: [tagRecords[counter % tagRecords.length].id],
      });
    }

    // Add a few topic-specific variations for breadth
    for (let i = 0; i < 3; i++) {
      counter += 1;
      const diff = difficultyCycle[counter % difficultyCycle.length];
      const qType = typeCycle[counter % typeCycle.length];
      const title = `${topic.name}: scenario ${i + 1}`;
      const slug = makeSlug(`${topic.slug}-scenario-${i + 1}-${counter}`);
      questionsPayload.push({
        title,
        slug,
        prompt: `Scenario ${i + 1} exploring ${topic.name}: outline approach, risks, and validation steps.`,
        answer: `Walk through a concrete scenario in ${topic.name}. Include measurement, failure modes, and how you would iterate after seeing results. Add a small code or pseudo-code snippet if relevant.`,
        difficulty: diff,
        type: qType,
        estimatedMinutes: 6,
        topicIds: [topic.id],
        tagIds: [tagRecords[(counter + i) % tagRecords.length].id],
      });
    }
  }

  console.log(`Prepared ${questionsPayload.length} questions`);

  console.log("Seeding questions with relations...");
  for (const q of questionsPayload) {
    const question = await prisma.question.create({
      data: {
        title: q.title,
        slug: q.slug,
        prompt: q.prompt,
        answer: q.answer,
        difficulty: q.difficulty,
        type: q.type,
        estimatedMinutes: q.estimatedMinutes,
        isPublished: true,
        topics: {
          create: q.topicIds.map((topicId, idx) => ({ topicId, orderIndex: idx })),
        },
        tags: {
          create: q.tagIds.map((tagId) => ({ tagId })),
        },
      },
    });

    // Create light related content for admin/demo
    if (questionsPayload.indexOf(q) % 25 === 0) {
      await prisma.blogPost.create({
        data: {
          title: `Learning Journal ${questionsPayload.indexOf(q)}`,
          slug: makeSlug(`learning-journal-${questionsPayload.indexOf(q)}`),
          excerpt: "Notes on building reliable ML systems and measuring progress.",
          body: `### What we shipped\n- Added new interview drills.\n- Improved observability.\n\n### What we learned\n- Candidates love realistic scenarios.`,
        },
      });
      await prisma.jobPost.create({
        data: {
          company: "Fictional AI Labs",
          role: "ML Engineer",
          location: "Remote",
          url: "https://example.com/jobs/ml",
          tags: ["ml", "python", "experimentation"],
        },
      });
    }
  }

  console.log("Seeding synonyms and demo user...");
  await prisma.searchSynonym.createMany({
    data: [
      { term: "xgboost", synonyms: ["gradient boosting", "gbdt"] },
      { term: "bert", synonyms: ["transformer encoder", "language model"] },
    ],
  });

  const demoUser = await prisma.user.create({
    data: {
      email: "demo@modelprep.dev",
      name: "Demo User",
    },
  });

  const firstQuestion = await prisma.question.findFirst();
  if (firstQuestion) {
    await prisma.bookmark.create({
      data: {
        userId: demoUser.id,
        questionId: firstQuestion.id,
      },
    });
    await prisma.progress.create({
      data: {
        userId: demoUser.id,
        questionId: firstQuestion.id,
        status: ProgressStatus.in_progress,
        confidence: 3,
      },
    });
  }

  console.log("Seed complete");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
