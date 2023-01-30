import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// GET /api/quiz
export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		if (req.method === "GET") {
			const quiz = await prisma.quiz.findMany();
			return res.status(200).json(quiz);
		} else {
			throw new Error(
				`The HTTP ${req.method} method is not supported at this route.`
			);
		}
	} catch (err) {
		return res.status(403).json({ error: "Error!" });
	}
}
