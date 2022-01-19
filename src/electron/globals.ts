interface Globals {
  mainURL: string;
}

const globals: Globals = {
  mainURL: "index.html",
};

const get = {
  mainUrl: () => globals.mainURL,
};

const set = {
  mainURL: (v: string) => {
    globals.mainURL = v;
    return v;
  },
};

export { get, set };
