//controlar de carreras con Query 
    const controllerm = {};

    controllerm.listm = (req, res) => {
      req.getConnection((err, conn) => {
        conn.query('SELECT * FROM carreras', (err, carreras) => {
        if (err) {
          res.json(err);
        }
        res.render('carreras', {
          data: carreras
        });
        });
      });
    };

      //GUARDAR UN NUEVO INSERT DE UNA CARRERA 
          controllerm.savem = (req, res) => {
            const { carrera, numclases } = req.body;
            console.log("datos  ", req.body);
            req.getConnection((err, connection) => {
              const query = connection.query(`
                INSERT INTO
                carreras(carrera, numclases)
                VALUES("${carrera}", "${numclases}")
              `, (err, carrera) => {
                  res.redirect('/carreras');
              })
            })
          };

           //EDITAR UN NUEVO INSERT DE UNA CARRERA 
                controllerm.editm = (req, res) => {
                  const { id } = req.params;
                  req.getConnection((err, conn) => {
                    conn.query("SELECT * FROM carreras WHERE id = ?", [id], (err, rows) => {
                      res.render('carrera_edit', {
                        data: rows[0]
                      })
                    });
                  });
                };
                    //GUARDAR UN NUEVO INSERT DE UNA CARRERA 
                    controllerm.updatem = (req, res) => {
                      const { id } = req.params;
                      const { carrera, numclases } = req.body;
                      console.log(req.body)
                      req.getConnection((err, conn) => {


                      //HAGO EL LLAMADO DE LOS DATOS DE LA TABLA PARA PODER ACTUALIZARLA

                          conn.query(`
                            UPDATE carreras
                            set
                            carrera = "${ carrera }",
                            numclases = "${ numclases }"
                            where id = ${ id }
                            `, (err, rows) => {
                              res.redirect('/carreras');
                            });
                          });
                        };
                              //BORRAR UN REGISTRO DE LA TABLA CARRERA 
                                  controllerm.deletem = (req, res) => {
                                    const { id } = req.params;
                                    req.getConnection((err, connection) => {
                                      connection.query('DELETE FROM carreras WHERE id = ?', [id], (err, rows) => {
                                        res.redirect('/carreras');
                                      });
                                    });
                                  }

                                  module.exports = controllerm;
