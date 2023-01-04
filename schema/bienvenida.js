const { model, Schema } = require("mongoose");

module.exports = model("bienvenida", new Schema({

    ServidorID: String,
    ServidorNombre: String,
    Mensaje: { type: String, default: "{user} bienvenido a **{server}**" },
    Imagen: { type: String, default: "https://i.imgur.com/E6wFwAt.png" },
    CanalID: String,
    CanalNombre: String,
    RolID: String,
    RolNombre: String
    
}))