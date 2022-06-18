# Frontend Exercise

This is the frontend technical exercise.

Technical Stack:

-   Typescript
-   React

## Instructions

1. Complete reading through this README page.
2. Initialize a new github repository for your work on these exercises in this this project.
3. Work on the [exercises](./src/pages/instructions.md). These can also be viewed after installing dependencies and running the application.

## Repository structure

Note: this includes just the relevant files for the exercise

```
README.md
src/
  server/
    db.ts // DB configuration and setup
    index.ts // Server entrypoint
  pages/
    StateSearch.tsx // Implement
    InterstateTradeSearch.tsx // Implement
    StateEconomySearch.tsx // Implement
    Login.tsx // Implement
    Signup.tsx // Implement
    instructions.md
  App.tsx // Main app which includes navigation and the routes that get rendered
  index.tsx // React entry point
  app.db // SQLite DB.  This can get deleted as many times as you would like. App startup will recreate if it does not exist
```

## Styling

These exercsises are not a test of design, so the majority of the effort should be spent on getting the functionality implemented. The repository is making use of [styled-components](https://styled-components.com/) but you are welcome to bring in any UI library you are comfortable with.

## Relevant commands

-   `yarn install` : downloads all the dependencies for the app
-   `yarn start` : starts the frontend React app. Changes will cause a reload
-   `yarn server` : starts the backend API.

## References

-   This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

---

## Notes

It's okay if you store the passwords as plain text. If they do though, you should press on what enhancements could be made to make the implementation more secure

### Important points to focus

-   Alternative authorization strategies you could use
-   Make the login/signup process more secure?
-   Design a table that would store the recent searches a user has performed.
-   Techniques that you could use as the database schema evolves with new product requirements.
