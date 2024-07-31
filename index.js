const express = require('express');
const cors = require('cors');
const app = express();
const certificatesRouter = require('./routes/certificates');

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use('/api/certificates', certificatesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
