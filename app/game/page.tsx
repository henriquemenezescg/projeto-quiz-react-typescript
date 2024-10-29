"use client";
import React, { use } from "react";
import { useRouter } from "next/navigation";

import { title } from "process";
import { AluraQuizLogo } from "../_components/AluraquizLogo";
import { Card } from "../_components/Card";
import { Footer } from "../_components/Footer";
import pageStyles from "../page.module.css";
import config from "../../config.json";
import { Alternative } from "../_components/Alternative";
import { DEFAULT_CIPHERS } from "tls";

const questions = config.questions;

const answerStates = {
  DEFAULT: "DEFAULT",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
} as const;

export default function GameScreen() {
  const router = useRouter();
  const [answerState, setAnswerState] = React.useState<keyof typeof answerStates>(answerStates.DEFAULT);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [userAnswer, setUserAnswers] = React.useState([]);
  const questionNumber = currentQuestion + 1;
  const question = questions[currentQuestion];
  const isLastQuestion = questionNumber === questions.length;
  
  React.useEffect(() => {
    if (isLastQuestion) {
      const totalPoints = userAnswer.reduce((_totalPoints, currentAnswer) => {
        if (currentAnswer === true) return _totalPoints + 1;
        return _totalPoints;
      }, 0);
      alert(`Voce Concluiu o desafio! e acertou ${totalPoints}`);
      router.push("/");
      return;
    }
  }, [userAnswer]);

  return (
    <main className={pageStyles.screen} style={{
      flex: 1,
      backgroundImage: `url("${question.image}")`,
    }}>
      <section className={pageStyles.container}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "24px",
        }}>
          <AluraQuizLogo />
        </div>
        <Card
          headerTitle={`Pergunta ${questionNumber} de ${questions.length}`}
        >
          <h1>
            {question.title}
          </h1>
          <p>
            {question.description}
          </p>
          <form
            style={{
              marginTop: "24px",
            }}
            onSubmit={(event) => {
              event.preventDefault();
              const $questionInfo = event.target as HTMLFormElement;
              const formData = new FormData($questionInfo);
              const { alternative } = Object.fromEntries(formData.entries());

              const isCorrectAnswer = alternative === question.answer;
              if (isCorrectAnswer) {
                setUserAnswers([
                  ...userAnswer,
                  true
                ]);
                setAnswerState(answerStates.SUCCESS);
              }
              if (!isCorrectAnswer) {
                setUserAnswers([
                  ...userAnswer,
                  false
                ]);
                setAnswerState(answerStates.ERROR);
              }
              setTimeout(() => {
                if(isLastQuestion) return;
                
                setCurrentQuestion(currentQuestion + 1);
                setAnswerState(answerStates.DEFAULT);
              }, 2 * 1000);
            }}
          >
            {question.alternatives.map((alternative, index) => (
              <div
                key={alternative + index}
                style={{
                  marginBottom: "8px",
                }}
              >
                <Alternative
                  label={alternative}
                  order={index}
                />
              </div>

            ))}
            {answerState === answerStates.DEFAULT && (
              <button>
                Confimar
              </button>
            )}
            <p style={{ textAlign: "center" }}>
              {answerState === answerStates.ERROR && (
                "❌"
              )}
              {answerState === answerStates.SUCCESS && (
                "✅"
              )}
            </p>
          </form>
        </Card>
        <Footer />
      </section>
    </main>
  )
}