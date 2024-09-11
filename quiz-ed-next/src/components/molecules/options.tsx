import { getNumberOfAnswersForOption } from "@/game/question-manager";
import { GameState } from "@/models/game-state";
import { Question } from "@/models/question";

type Props = {
  currentQuestion: Question;
  haveAllPlayersAnswered: boolean;
  gameState: GameState;
};

const Options = ({
  currentQuestion,
  haveAllPlayersAnswered,
  gameState,
}: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {currentQuestion.options.map((option, index) => {
        if (haveAllPlayersAnswered) {
          const numberOfAnswers = getNumberOfAnswersForOption(
            gameState,
            option.id
          );

          return (
            <div
              className={`card ${option.isCorrect ? "bg-success" : "bg-error"}`}
              key={option.id}
            >
              {index + 1} {option.title} - {numberOfAnswers} answers
            </div>
          );
        }

        return (
          <div className="card" key={option.id}>
            {index + 1} {option.title}
          </div>
        );
      })}
    </div>
  );
};

export default Options;
