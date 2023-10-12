'use client';
import { useRouter } from "next/navigation";
import Button from "./Button";
import { API } from "../constant";

interface IArticleState {
    id: number,
    article: string,
    articleTitle: string,
    author: string,
    lastReadAt?: string
}

export default function Article({
    article
} : {
    article: IArticleState
}) {
    const router = useRouter();

    const onArticle = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const response = await fetch(API + "/api/v1/resources/add-read-user-article?articleId=" + article.id, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        authorization: "Bearer " + token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({})
                });
                localStorage.setItem("article", JSON.stringify(article));
                router.push('/article');
            } catch (e) {
                console.log(e);
            }
        } else {
            router.push("/login");
        }
    };

    return (
        <div className="max-w-sm w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{article.articleTitle}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Author Name: {article.author}</p>
            {article.lastReadAt && <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Last Read : {article.lastReadAt.substring(0, 16)}</p>}
            <Button onClick={onArticle} name="Read more"/>
        </div>
    );
}