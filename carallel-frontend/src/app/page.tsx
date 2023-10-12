'use client';
import { useEffect, useState } from "react";
import Article from "./components/Article";
import { API } from "./constant";

interface IArticleState {
  id: number,
  article: string,
  articleTitle: string,
  author: string,
  lastReadAt?: string
}

export default function Home() {
  const [articles, setArticles] = useState<IArticleState[]>([]);
  const [userArticles, setUserArticles] = useState<IArticleState[]>([]);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const token = () =>  typeof window !== "undefined" && localStorage.getItem("token");

  const fetchArticles = async() => {
    const response = await fetch(API + "/api/v1/resources/articles", {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      const res = await response.json();
      setArticles(res.data);
    } else {
      alert("Something went wrong while getting articles!");
    }
  }

  const fetchUserArticles = async() => {
    try {
      const response = await fetch(API + "/api/v1/resources/user-articles", {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            authorization: "Bearer " + token(),
        },
      });
  
      if (response.ok) {
        const res = await response.json();
        const data = res.data;
        setUserArticles(data);
      } else {
        console.log("Failed to fetch user-articles");
      }
    } catch (error) {
      console.log("Failed to fetch user-articles");
    }
  }

  const getArticles = () => {
    const ids = userArticles.map((article: { id: any; }) => article.id);
    console.log(ids);
    return articles.filter(article => !ids.includes(article.id));
  }

  useEffect(() => {
    fetchArticles();
    if (token()) {
      setIsLogin(true);
      fetchUserArticles();
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      { userArticles.length > 0 && <div>
          <h1>Continue Reading</h1><br></br>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {
              userArticles.map(article => <Article key={article.id} article={article}/>)
            }
          </div>
          <br></br>
        </div>
      }
      <div>
        { isLogin && <div>
          <h1>What's New</h1><br></br>
        </div>}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {
            articles.length > 0 && getArticles().map(article => <Article key={article.id} article={article}/>)
          }
        </div>
      </div>
    </main>
  );
}
