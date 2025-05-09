import path from "path";

export const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },

  auth: {
    register: {
      path: "/auth/register",
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
    login: {
      path: "/auth/login",
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
  },

  app: {
    root: {
      path: "/app",
      getHref: () => "/app",
    },
    quotes: {
      path: "quotes",
      getHref: () => "/app/quotes",
    },
    addQuote: {
      path: "quotes/add",
      getHref: () => "/app/quotes/add",
    },
    editQuote: {
      path: "quotes/edit/:quoteId",
      getHref: (id: string) => `/app/quotes/edit/${id}`,
    },
    dashboard: {
      path: "",
      getHref: () => "/app",
    },
  },
} as const;
