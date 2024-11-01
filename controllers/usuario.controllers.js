import { getConnection } from "../database/connection.js";
import sql from "mssql";
import bcrypt, { compare } from "bcrypt";


export const getUsuario = async (req, res) => {
  var pass = true;
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("user", sql.VarChar, req.params.usuario)
    .query("SELECT * FROM tblUsuario WHERE usuario = @user");

    try{
 
    } catch(error){
    }
  
};

export const createUsuario = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("usuario", sql.VarChar, req.body.usuario)
    .input("password", sql.VarChar, hashpassword.toString())
    .input("nombreCompleto", sql.VarChar, req.body.nombreCompleto)
    .input("email", sql.VarChar, req.body.email)
    .input("direccion", sql.VarChar, req.body.direccion)
    .input("numTelefono", sql.Int, req.body.numTelefono)
    .query(
      "INSERT INTO tblUsuario(usuario,password,nombreCompleto ,email ,direccion,numTelefono ) \
        VALUES(@usuario,@password,@nombreCompleto ,@email ,@direccion,@numTelefono); SELECT SCOPE_IDENTITY() as Id;"
    );
  console.log(result);
  if(result.rowsAffected[0] === 1){
    res.json({
      title: "Exito",
      message: "Usuario creado"
    });
  }else{
    res.json({
      title: "Error",
      message: "Fallo al crear Usuario"
    });
  }
};

export const updateUsuario = async (req, res) => {

  const pool = await getConnection();
  const result = await pool
    .request()
    .input("idCliente", sql.Int, req.params.idCliente)
    .input("usuario", sql.VarChar, req.body.usuario)
    .input("password", sql.VarChar, hashpassword)
    .input("nombreCompleto", sql.VarChar, req.body.nombreCompleto)
    .input("email", sql.VarChar, req.body.email)
    .input("direccion", sql.VarChar, req.body.direccion)
    .input("numTelefono", sql.Int, req.body.numTelefono)
    .query(
      "UPDATE tblUsuario set usuario = @usuario, password = @password, \
    nombreCompleto = @nombreCompleto, email = @email, direccion = @direccion, \
    numTelefono = @numTelefono WHERE idCliente = @idCliente"
    );

  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({
      message: "Usuario no encontrado",
    });
  }
  return res.json({ message: "Usuario actualizado" });
};

export const deleteUsuario = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("idCliente", sql.Int, req.params.idCliente)
    .query("DELETE FROM tblUsuario WHERE idCliente = @idCliente");

  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({
      message: "Usuario no encontrado",
    });
  }
  return res.json({ message: "Usuario eliminado" });
};
