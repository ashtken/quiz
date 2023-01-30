import { Quiz } from "@prisma/client";
import Link from "next/link";

export const QuizList = ({ data }: { data: Quiz[] | undefined }) => {
	return (
		<ul>
			{data?.map((quiz: Quiz) => (
				<li
					key={quiz.id}
					className="w-full h-full mb-6 bg-Blue hover:bg-SecondaryBlue text-white rounded-lg transition ease-in-out"
				>
					<Link href={`/${quiz.id}`}>
						<h3 className="text-center p-4">{quiz.name}</h3>
					</Link>
				</li>
			))}
		</ul>
	);
};
