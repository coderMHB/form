// pages/api/generate-excel.js
import { Workbook } from 'exceljs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body;

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Data');

    worksheet.columns = [
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
    ];

    worksheet.addRow({ name, email });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
