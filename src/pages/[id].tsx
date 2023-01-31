import { Header } from "@/components/Header";
import prisma from "../../lib/prisma";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Question, Quiz } from "@prisma/client";
import { useState } from "react";
import { QuizForm } from "@/components/QuizForm";
import { useRouter } from "next/router";

interface QuizProps extends Quiz {
	question: Question[];
}

export const getStaticPaths: GetStaticPaths = async () => {
	const quiz = await prisma.quiz.findMany({
		select: {
			id: true,
		},
	});

	const paths = quiz.map((quiz) => ({
		params: { id: quiz.id.toString() },
	}));

	return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const quiz = await prisma.quiz.findUnique({
		where: {
			id: params?.id as string,
		},
		include: {
			question: true,
		},
	});

	return {
		props: {
			quiz,
		},
		revalidate: 1,
	};
};

export default function SelectedQuiz({ quiz }: { quiz: QuizProps }) {
	const [toggle, setToggle] = useState(false);
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setToggle(true);
	};

	return (
		<>
			<Head>
				<title>Quiz</title>
			</Head>
			<main className="max-w-7xl m-auto mt-6 px-4 sm:px-11">
				<Header />
				<section>
					<h2 className="text-center text-4xl font-bold text-Blue mb-6">
						{quiz.name}
					</h2>
					<form
						onSubmit={handleSubmit}
						className="mx-0 sm:mx-20 text-lg font-semibold"
					>
						{quiz.question.map((question) => (
							<QuizForm key={question.id} toggle={toggle} quest={question} />
						))}
						<div className="flex justify-between mt-14">
							<button
								onClick={() => router.push("/")}
								className="bg-Blue text-white rounded-lg px-6 py-3 hover:bg-SecondaryBlue transition ease-in-out"
							>
								Back
							</button>
							<button
								type="submit"
								className="bg-Blue text-white rounded-lg px-6 py-3 hover:bg-SecondaryBlue transition ease-in-out"
							>
								Check
							</button>
						</div>
					</form>
				</section>
			</main>
		</>
	);
}
