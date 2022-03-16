declare module 'Types' {
  import rootReducer from "./rootReducer";
  export type AppState = ReturnType<typeof rootReducer>;
}
