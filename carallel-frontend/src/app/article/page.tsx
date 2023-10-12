'use client';

interface IArticleState {
    id: number,
    article: string,
    articleTitle: string,
    author: string,
    lastReadAt?: string
}

export default function Article() {
    const data = localStorage.getItem("article");
    const article: IArticleState =  JSON.parse(data ? data : "{}");
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-between p-24">
            <div className="max-w-4xl flex flex-col items-center justify-between">
                <div className="mb-7">
                    <h5 className="mb-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{article.articleTitle}</h5>
                    <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">Author Name: {article.author}</p>
                    {article.lastReadAt && <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Last Read : {article.lastReadAt.substring(0, 16)}</p>}
                </div>
                <p className="text-justify">{article.article}</p>
            </div>
        </div>
    );
}