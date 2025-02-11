// @ts-ignore
import Mock from "mockjs";

// 模拟用户数据
Mock.mock("/api/users", "get", {
  code: 200,
  data: {
    "users|10": [
      {
        "id|+1": 1,
        name: "@name",
        email: "@email",
      },
    ],
  },
});

Mock.mock("/api/user", "post", {
  code: 200,
  data: {
    name: "@cname",
    email: "@email",
  },
});

// 模拟文章数据
Mock.mock("/api/articles", "get", {
  code: 200,
  data: {
    "articles|5": [
      {
        "id|+1": 1,
        title: "@title",
        content: "@paragraph",
        author: "@name",
        createdAt: "@datetime",
      },
    ],
  },
});
