
//import { faker } from "@faker-js/faker";
import axios from "axios";


const generateUsers = (count) => {
    const users = [];

    for (let i = 0; i < count; i++) {

        users.push({
            fullName: `User ${i}`,

            email: `user${i}@example.com`,

            phone: `${9000000000 + i}`,

            walletBalance: Math.floor(Math.random() * 10000),

            deviceInfo: {
                ipAddress: `192.168.1.${i % 255}`,
                deviceType: "Mobile",
                os: "Android"
            }
        });

    }

    return users;
};

const sendUsers = async () => {
    try {
        const users = generateUsers(5000);

        const res = await axios.post(
            "http://localhost:5000/api/users/bulk-create",
            users
        );

        console.log(res.data);
    } catch (error) {
        console.error(error.response?.data || error.message);
    }
};


sendUsers();