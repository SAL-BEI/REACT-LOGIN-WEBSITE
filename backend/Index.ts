import express, { Request, Response, RequestHandler } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for users
let users: { name: string; password: string }[] = []; 

// Registration handler
const registerHandler: RequestHandler = (req: Request, res: Response): void => {
    const { name, password } = req.body;

    // Validate input
    if (!name || !password) {
        res.status(400).json({ success: false, message: 'Name and password required' });
        return;
    }

    // Check if the user already exists
    const existingUser = users.find((user) => user.name === name);
    if (existingUser) {
        res.status(400).json({ success: false, message: 'User already exists' });
        return;
    }

    // Add new user to the in-memory list
    users.push({ name, password });
    res.status(201).json({ success: true, message: 'User registered successfully' });
};

// Login handler
const loginHandler: RequestHandler = (req: Request, res: Response): void => {
    const { name, password } = req.body;

    if (name === "" || password === "") {
        res.status(400).json({ success: false, message: 'Name and password required' });
    }

    const user = users.find((user) => user.name === name && user.password === password);

    if (user) {
        res.status(200).json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
};

// Define routes
app.post('/register', registerHandler);
app.post('/login', loginHandler);

// Start the server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});