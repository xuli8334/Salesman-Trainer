export const questions = [
  {
    id: 1,
    question: "A potential client expresses concern about the high price of your product. How would you handle this objection?",
    context: "Enterprise SaaS Solution, Budget-conscious client"
  },
  {
    id: 2,
    question: "How would you establish trust with a new prospect in the first meeting?",
    context: "First contact, B2B setting"
  },
  {
    id: 3,
    question: "A client is comparing your product with a competitor's cheaper alternative. How do you demonstrate value?",
    context: "Competitive situation, Premium product"
  }
];

export const mockEvaluate = (answer: string) => {
  return {
    result: {
      score1: Math.floor(Math.random() * 5) + 1, // Communication
      score2: Math.floor(Math.random() * 5) + 1, // Problem Solving
      score3: Math.floor(Math.random() * 5) + 1, // Product Knowledge
      score4: Math.floor(Math.random() * 5) + 1, // Customer Focus
      expert_comment: "Good approach to handling the objection. Your response shows strong active listening skills and value articulation. Consider incorporating more specific examples and ROI metrics to strengthen your case.",
      reference_answer: "A strong approach would be to: 1) Acknowledge the concern, 2) Ask probing questions to understand their specific budget constraints, 3) Demonstrate ROI through concrete examples, 4) Present relevant case studies, and 5) Discuss flexible payment options if available."
    }
  };
};