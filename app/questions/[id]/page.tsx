import { notFound } from "next/navigation";
import { getQuestionBySlug, randomQuestions } from "@/lib/questions";
import { QuestionView } from "@/components/question-view";

export default async function QuestionPage({ params }: { params: { id: string } }) {
  const question = await getQuestionBySlug(params.id);
  if (!question) return notFound();
  const related = await randomQuestions(3, question.topics[0]?.topic.slug);

  return <QuestionView question={question as any} related={related as any} />;
}
