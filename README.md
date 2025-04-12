# Welcome to Express!

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:3000`.

## Init aplication

IS necessary create a file configDatabase as this template:
export const config: ConnectionOptions = {
host: "",
user: "",
password: "",
database: "",
connectionLimit: 10,
waitForConnections: true,
queueLimit: 0,
};

For this project database name is taskmaster and have 2 tables, user and task
