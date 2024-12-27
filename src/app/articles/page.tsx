import { Article } from "@/types/types";
import Link from "next/link";

async function fetchArticles(): Promise<Article[]> {
  try {
    const response = await fetch("http://localhost:8080/api/get/articles");

    if (!response.ok) {
      throw new Error("Failed to fetch Articles");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ArticlesPage() {
  const articles = await fetchArticles();

  return (
    <div className="p-8 container mx-auto">
      <h1 className="text-3xl font-semibold">Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={{
              pathname: `/articles/${article.slug}`,
            }}
          >
            <div key={article.id}>{article.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
