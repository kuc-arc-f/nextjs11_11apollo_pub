import { Config } from "apollo-server-micro";

// サンプルなのでオンメモリでデータを持つ
const DB = {
  articles: [
    { id: 1, title: "foo", content: "foooooooooooooo" },
    { id: 2, title: "bar", content: "baaaaaaaaaaaaaa" },
    { id: 3, title: "hoge", content: "hoge123" },
  ],
};

export const resolvers: Config["resolvers"] = {
  Query: {
    hello: () => 'Hello world-222',
    getArticle: (_, { id }: { id: number }) => {
      const articles = DB.articles?.filter((a) => a.id === id);
      return articles ? articles[0] : [];
    },
    getArticles: () => DB.articles,
  },
};