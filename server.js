// server.js
const express = require('express');
const { Workbook } = require('exceljs');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/submit', async (req, res) => {
  const { name, email } = req.body;

  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Data');

  worksheet.columns = [
    { header: 'Name', key: 'name', width: 30 },
    { header: 'Email', key: 'email', width: 30 },
  ];

  worksheet.addRow({ name, email });

  // مسیر ذخیره فایل Excel
  const filePath = path.join(__dirname, 'data.xlsx');

  // ذخیره فایل Excel در سرور
  await workbook.xlsx.writeFile(filePath);
  
  console.log('Excel file created successfully at', filePath);
  
  // پاسخ به کاربر
  res.status(200).json({ message: 'Data received and Excel file created' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
