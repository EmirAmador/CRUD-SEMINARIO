  //controlar de alumnos con Query 
  //https://desarrolloweb.com/articulos/pasos-para-ejecutar-jquery.html

  const controller = {};

          controller.list = (req, res) => {
            req.getConnection((err, conn) => {
              conn.query(`
              SELECT
              carreras.carrera AS carrera,
              alumno,
              alumnos.id as id,
              correo,
              edad
              FROM alumnos
              LEFT JOIN carreras
              ON alumnos.carrera = carreras.id;
                      `, (err1, alumnos) => {
                    if (err1) {
                      res.json(err1);
                    }
                      conn.query('SELECT * FROM carreras', (err2, carreras) => {
                        if (err2) {
                          res.json(err2);
                        }
                            res.render('alumnos', {
                                data: alumnos,
                                carreras
                            });
                          });
                          });
                        });
                      };

          //GUARDAR UN NUEVO INSERT DE ALUMNO            
          controller.save = (req, res) => {
            const data = req.body;
            console.log(req.body)
            req.getConnection((err, connection) => {
              const query = connection.query('INSERT INTO alumnos set ?', data, (err, alumno) => {
                console.log(alumno)
                res.redirect('/');
              })
            })
          };

                //SLECT PARA EDIR UN ALUMNO
                controller.edit = (req, res) => {
                  const { id } = req.params;
                  req.getConnection((err, conn) => {
                    conn.query("SELECT * FROM alumnos WHERE id = ?", [id], (err1, rows1) => {
                      conn.query("SELECT * FROM carreras", (err2, rows2) => {
                        res.render('alumnos_edit', {
                          data: rows1[0],
                          carreras: rows2
                        })
                      });
                    });
                  });
                };

                      //SELECT PARA ACTUALIZAR UN ALUMNO    
                      controller.update = (req, res) => {
                        const { id } = req.params;
                        const newalumno = req.body;
                        req.getConnection((err, conn) => {


                        conn.query('UPDATE alumnos set ? where id = ?', [newalumno, id], (err, rows) => {
                          res.redirect('/');
                        });
                        });
                      };

                              // SELECT PARA BORRAR UN ALUMNO
                              controller.delete = (req, res) => {
                                const { id } = req.params;
                                req.getConnection((err, connection) => {
                                  connection.query('DELETE FROM alumnos WHERE id = ?', [id], (err, rows) => {
                                    res.redirect('/');
                                  });
                                });
                              }

                              module.exports = controller;
