import { Header } from "@/components/Header";
import Head from "next/head";
import Router from "next/router";
import { useState } from "react";

export default function Create() {
	const [name, setName] = useState("");
	const [questionOne, setQuestionOne] = useState("");
	const [questionTwo, setQuestionTwo] = useState("");
	const [questionThree, setQuestionThree] = useState("");
	const [answerOne, setAnswerOne] = useState(false);
	const [answerTwo, setAnswerTwo] = useState(false);
	const [answerThree, setAnswerThree] = useState(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		submitQuiz();
	};

	const submitQuiz = async () => {
		try {
			const body = {
				name,
				questionOne,
				questionTwo,
				questionThree,
				answerOne,
				answerTwo,
				answerThree,
			};
			const response = await fetch(`/api/quiz/create`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			if (response.status >= 200 && response.status <= 299) {
				Router.push("/");
			} else {
				console.error(response);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Head>
				<title>Add Quiz</title>
			</Head>
			<main className="max-w-7xl m-auto mt-6 px-4 sm:px-11">
				<Header />
				<section>
					<h2 className="text-center text-4xl font-bold text-Blue mb-6">Add Quiz</h2>
					<form onSubmit={handleSubmit} className="text-lg font-semibold">
						<fieldset>
							<label htmlFor="name" className="flex flex-col">
								Quiz Name:{" "}
								<input
									type="text"
									id="name"
									required
									className="border-2 border-gray-300 p-2 rounded-md mt-2"
									onChange={(e) => setName(e.target.value)}
								/>
							</label>
							<div>
								<label htmlFor="question1" className="flex flex-col mt-6">
									Question #1:{" "}
									<input
										type="text"
										id="question1"
										required
										className="border-2 border-gray-300 p-2 rounded-md mt-2"
										onChange={(e) => setQuestionOne(e.target.value)}
									/>
								</label>
								<div>
									<label>
										<input
											type="radio"
											value="true"
											name="q1"
											required
											className="mr-2"
											onChange={() => setAnswerOne(true)}
										/>
										Yes
									</label>
									<label className="ml-5">
										<input
											type="radio"
											value="false"
											name="q1"
											className="mr-2"
											onChange={() => setAnswerOne(false)}
										/>
										No
									</label>
								</div>
							</div>
							<div>
								<label htmlFor="question2" className="flex flex-col mt-6">
									Question #2:{" "}
									<input
										type="text"
										id="question2"
										required
										className="border-2 border-gray-300 p-2 rounded-md mt-2"
										onChange={(e) => setQuestionTwo(e.target.value)}
									/>
								</label>
								<div>
									<label>
										<input
											type="radio"
											value="true"
											name="q2"
											required
											className="mr-2"
											onChange={() => setAnswerTwo(true)}
										/>
										Yes
									</label>
									<label className="ml-5">
										<input
											type="radio"
											value="false"
											name="q2"
											className="mr-2"
											onChange={() => setAnswerTwo(false)}
										/>
										No
									</label>
								</div>
							</div>
							<div>
								<label htmlFor="question3" className="flex flex-col mt-6">
									Question #3:{" "}
									<input
										type="text"
										id="question3"
										required
										className="border-2 border-gray-300 p-2 rounded-md mt-2"
										onChange={(e) => setQuestionThree(e.target.value)}
									/>
								</label>
								<div>
									<label>
										<input
											type="radio"
											value="true"
											name="q3"
											required
											className="mr-2"
											onChange={() => setAnswerThree(true)}
										/>
										Yes
									</label>
									<label className="ml-5">
										<input
											type="radio"
											value="false"
											name="q3"
											className="mr-2"
											onChange={() => setAnswerThree(false)}
										/>
										No
									</label>
								</div>
							</div>
							<div className="flex justify-center mt-14">
								<button
									type="submit"
									className="bg-Blue text-white rounded-lg px-6 py-3 hover:bg-SecondaryBlue transition ease-in-out"
								>
									Submit
								</button>
							</div>
						</fieldset>
					</form>
				</section>
			</main>
		</>
	);
}
