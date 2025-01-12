"use client";

import { Article } from "@/types/types";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";

async function fetchArticle(articleSlug: string): Promise<Article | null> {
  try {
    const response = await fetch(
      `https://api.ptcgpocket.net/api/get/article/${articleSlug}`
    );

    if (!response.ok) {
      throw new Error("couldn't fetch article");
    }

    return (await response).json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();

  const articleSlug = Array.isArray(params.articleSlug)
    ? params.articleSlug[0]
    : params.articleSlug;

  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (!articleSlug) {
      router.push("/");
      console.log(`Slug: ${articleSlug}`);

      return;
    }

    const fetchData = async () => {
      const articleData = await fetchArticle(articleSlug);

      setArticle(articleData);
    };

    fetchData();
  }, [articleSlug, router]);

  return (
    <div className="mx-auto container max-w-prose px-4 sm:px-6 lg:px-8">
      {article ? (
        <>
          <header className="py-8 border-b mb-4">
            <Image
              src={article.image}
              alt={`${article.title} image`}
              width={1920}
              height={1080}
              className="mb-4 object-cover"
            />
            <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
            <div className="text-sm mb-4">
              {article.author} •{" "}
              {new Date(article.updated_at).toLocaleDateString()}
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>
          <main className="space-y-8 mb-16">
            {article.contents
              .sort((a, b) => a.position - b.position)
              .map((content, index) => {
                if (content.contentType === "image") {
                  return (
                    <div key={index} className="text-center">
                      <Image
                        src={content.content}
                        alt={`Article Image ${index}`}
                        width={200} // Adjust dimensions as needed
                        height={200}
                        className="rounded-lg shadow-lg object-cover mx-auto"
                      />
                    </div>
                  );
                }

                if (content.contentType === "breaker") {
                  return (
                    <div key={index} className="py-2">
                      <h2 className="font-bold text-2xl">{content.content}</h2>
                    </div>
                  );
                }

                if (content.contentType === "text") {
                  return (
                    <div key={index} className="leading-7 space-y-4">
                      {content.content
                        .split("\n\n")
                        .map((paragraph, paragraphIndex) => (
                          <p key={paragraphIndex} className="text-base">
                            {parse(paragraph)}
                          </p>
                        ))}
                    </div>
                  );
                }

                // Optional: Handle unexpected content types
                return (
                  <div key={index}>
                    <p>Unsupported content type: {content.contentType}</p>
                  </div>
                );
              })}
          </main>
        </>
      ) : (
        <div>Error</div>
      )}
    </div>
  );
}
