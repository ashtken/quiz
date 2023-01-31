import { Question } from "@prisma/client";
import { useState } from "react";

export type Props = {
	quest: Question;
	toggle: boolean;
};

export const QuizForm = ({ quest, toggle }: Props) => {
	const { id, question, answer } = quest;

	const [result, setResult] = useState(false);

	const handleChange = (e: string, answer: boolean) => {
		if (e === answer.toString()) {
			setResult(true);
		} else {
			setResult(false);
		}
	};

	return (
		<fieldset>
			<div className="flex flex-col text-center sm:flex-row sm:justify-between m-auto">
				<legend>{question}</legend>
				<div>
					<label>
						<input
							type="radio"
							value="true"
							name={id}
							onChange={(e) => handleChange(e.target.value, answer)}
							required
							className="mr-2"
						/>
						Yes
					</label>
					<label className="ml-5">
						<input
							type="radio"
							value="false"
							name={id}
							onChange={(e) => handleChange(e.target.value, answer)}
							className="mr-2"
						/>
						No
					</label>
				</div>
			</div>
			<div className="text-center mb-20">
				{toggle ? (
					result ? (
						<h2 className="font-bold text-lg text-green-600 sm:fixed">Correct!!</h2>
					) : (
						<h2 className="font-bold text-lg text-red-600 sm:fixed">Incorrect!!</h2>
					)
				) : null}
			</div>
		</fieldset>
	);
};
