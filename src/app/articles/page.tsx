import { Article } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

async function fetchArticles(): Promise<Article[]> {
  try {
    const response = await fetch(
      "https://api.ptcgpocket.net/api/get/articles",
      {
        cache: "no-store",
      }
    );
    console.log("response status, ", response.status);

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
  console.log("articles: ", articles);
  const sortedArticles = articles.sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  return (
    <div className="max-w-7xl px-4 sm:px-6 lg:px-8 container mx-auto">
      <h1 className="text-4xl font-semibold py-8">Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
        {sortedArticles.map((article) => (
          <div
            key={article.id}
            className="border shadow-md hover:scale-105 overflow-hidden transition-all bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 flex flex-col justify-between"
          >
            <Link
              href={{
                pathname: `/articles/${article.slug}`,
              }}
            >
              <div className="w-full">
                <Image
                  src={article.image}
                  alt={`${article.title} image`}
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div className="text-2xl font-semibold">{article.title}</div>
                <div className="leading-relaxed">{article.blurb}</div>

                <div className="mt-auto">
                  <div className="border-t border-gray-300 dark:border-gray-600 mt-4"></div>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-300">
                    <span className="">{article.author}</span>
                    <span>
                      Last Updated:{" "}
                      {new Date(article.updated_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 font-medium px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
