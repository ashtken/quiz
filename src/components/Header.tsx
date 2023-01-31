import Link from "next/link";

export const Header = () => {
	return (
		<header className="flex justify-between items-center mb-12">
			<Link href="/">
				<h1 className="text-4xl text-Blue font-bold hover:text-SecondaryBlue transition ease-in-out">
					Q
				</h1>
			</Link>
			<Link
				href="/create"
				className="bg-Blue text-white rounded-lg px-6 py-3 hover:bg-SecondaryBlue transition ease-in-out"
			>
				Add Quiz
			</Link>
		</header>
	);
};
