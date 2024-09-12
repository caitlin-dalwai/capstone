exports.createBooking = (req, res) => {
    const { idmenu, date, numberofpeople, numberofdogs, foodbrand, time } = req.body;
    const userId = req.user.id;
  
    db.query(
      'INSERT INTO bookings (idusers, idmenu, date, numberofpeople, numberofdogs, foodbrand, time) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, idmenu, date, numberofpeople, numberofdogs, foodbrand, time],
      (err) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ message: 'Booking created' });
      }
    );
  };
  
  exports.getBookings = (req, res) => {
    const userId = req.user.id;
    db.query('SELECT * FROM bookings WHERE idusers = ?', [userId], (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  };
  