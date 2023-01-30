import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { Quiz } from "@prisma/client";
import { QuizList } from "components/QuizList";
import Link from "next/link";

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
				<header className="flex justify-between items-center mb-12">
					<Link href="/">
						<h1 className="text-4xl text-Blue font-bold hover:text-SecondaryBlue transition ease-in-out">
							Q
						</h1>
					</Link>
					<button className="bg-Blue text-white rounded-lg px-6 py-3 hover:bg-SecondaryBlue transition ease-in-out">
						Add Quiz
					</button>
				</header>
				<section className="flex flex-col">
					<h2 className="text-center text-4xl font-bold text-Blue mb-6">Quizzes</h2>
					<QuizList data={data} />
				</section>
			</main>
		</>
	);
}
