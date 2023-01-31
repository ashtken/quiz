import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// POST /api/quiz
export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const {
		name,
		questionOne,
		questionTwo,
		questionThree,
		answerOne,
		answerTwo,
		answerThree,
	} = req.body;
	try {
		if (req.method === "POST") {
			const quiz = await prisma.quiz.create({
				data: {
					name,
					question: {
						create: [
							{
								question: questionOne,
								answer: answerOne,
							},
							{
								question: questionTwo,
								answer: answerTwo,
							},
							{
								question: questionThree,
								answer: answerThree,
							},
						],
					},
				},
			});
			res.status(201).json(quiz);
		} else {
			throw new Error(
				`The HTTP ${req.method} method is not supported at this route.`
			);
		}
	} catch (error) {
		console.error(error);
	}
}
