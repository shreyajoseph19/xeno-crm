
const express = require('express');
const cors = require('cors');
const customerRoutes = require('./routes/customers');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/customers', customerRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
