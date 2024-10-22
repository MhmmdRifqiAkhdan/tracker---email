app.post('/api/track', async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).send('Email diperlukan');
    }
  
    try {
      const request = new sql.Request();
      await request.query(`
        INSERT INTO TrackingLog (email, opened_at)
        VALUES ('${email}', GETDATE())
      `);
  
      const result = await request.query(`SELECT * FROM TrackingLog`);
  
      console.log(result.recordset);
  
      res.status(200).send('Tracking berhasil dicatat');
    } catch (error) {
      console.error('Kesalahan saat mencatat tracking:', error);
      res.status(500).send('Gagal mencatat tracking');
    }
  });
  