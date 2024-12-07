# Remix Todo App
Todo App created with Remix, Prisma ORM, Supabase, and Tailwind CSS

## Functionality

- Email/Password Authentication with cookie-based sessions
- Database ORM with Prisma
- Styling with Tailwind
- Code formatting with Prettier
- Linting with ESLint
- Static Types with TypeScript

## Development
- Clone the repository

```sh
git clone https://github.com/SrivathsanRam/todo-remix.git
cd todo-remix
```

- Create an environment file (.env)

For Mac/Linux:
  ```sh
  touch .env
  ```
For Windows:
  ```sh
  type nul > .env
  ```

Inside the .env file, add the following line:
 ```sh
 DATABASE_URL = "postgresql://postgres.cvspexyhzjprcehedaaw:AlphaStoryTest1@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
  
SESSION_SECRET="super-duper-s3cret"
 ```


- Start the Postgres Database in [Docker](https://www.docker.com/get-started):

  ```sh
  npm run docker
  ```

  > **Note:** The npm script will complete while Docker sets up the container in the background. Ensure that Docker has finished and your container is running before proceeding.

- Initial setup:

  ```sh
  npm run setup
  ```

- Run the first build:

  ```sh
  npm run build
  ```

- Start dev server:

  ```sh
  npm run dev
  ```