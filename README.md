This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started 🏁
- You need docker running on your system. Then just:
```bash
docker compose up
```
- After that if you want to run manually
```
yarn dev
```

- To run the seed files
```
yarn prisma seed
```

Depending on your .env you should be able to run something like http://localhost:3070

### Docker
📗  A dockerfile multi-stage from [here](https://github.com/vercel/next.js/discussions/16995)

📗  Dockerfile copied from [here](https://github.com/kachar/yadi#build-multi-stage-build-explained)

### Typescript
📗  A guide to use typescript with react [here](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example)

### Prisma 
Run `npx prisma generate` to update your Prisma Client API
Run `npx prisma db seed` to seed the database

📗  [Setup Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/install-prisma-client-typescript-postgres)

📗  [Relational DB on Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/next-steps-typescript-postgre)

### Troubleshooting ♿
Delete the migrations directory
`rm -rf prisma/migrations`
`rm -rf prisma/@prisma`

Delete all entries from the _Migration table
`TRUNCATE _Migration;`

### Tools 🔨

🛠 [Convert Fonts Tool](https://www.font-converter.net/en)

🛠 [Favicon Generator Tool](https://realfavicongenerator.net/)