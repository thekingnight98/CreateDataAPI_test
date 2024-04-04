import express from 'express';
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => res.send('Hello, world!'));

app.get('/users/group-by-department', async (req, res) => {
    try {
        // Fetch users from the external API
        const response = await axios.get('https://dummyjson.com/users');
        const users = response.data.users;

        // Transform the data to group by department
        const usersByDepartment = users.reduce((acc: { [x: string]: any[]; }, user: { company: any, department: any; }) => {
            const department = user.company.department;
            if (!acc[department]) {
                acc[department] = [];
            }
            acc[department].push(user);
            return acc;
        }, {});


        // Respond with the transformed data
        res.json(usersByDepartment);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send('An error occurred while fetching user data.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

export default app