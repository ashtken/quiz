import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { Quiz } from "@prisma/client";
import { QuizList } from "@/components/QuizList";
import { Header } from "@/components/Header";

export default function Home() {
	const URL = `/api/quiz`;

	const fetchQuizzes = async (): Promise<Quiz[]> => {
		const response = await fetch(URL);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json();
	};

	const { isLoading, error, data, isFetching } = useQuery(
		["quizzes"],
		fetchQuizzes
	);

	if (error instanceof Error) {
		return <p>An error occurred: {error.message}</p>;
	}

	if (isFetching) {
		return <p>Fetching...</p>;
	}

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<Head>
				<title>Quiz</title>
			</Head>
			<main className="max-w-7xl m-auto mt-6 px-4 sm:px-11">
				<Header />
				<section>
					<h2 className="text-center text-4xl font-bold text-Blue mb-6">Quizzes</h2>
					<QuizList data={data} />
				</section>
			</main>
		</>
	);
}
