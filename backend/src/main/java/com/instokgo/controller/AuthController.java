package com.instokgo.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/instokgo/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private List<Map<String, String>> usuariosDB = new ArrayList<>();

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registrarUsuario(@RequestBody Map<String, String> datosPeticion) {
        Map<String, Object> respuesta = new HashMap<>();
        String username = datosPeticion.get("username");
        String password = datosPeticion.get("password");

        if (username == null || username.trim().isEmpty() || password == null || password.trim().isEmpty()) {
            respuesta.put("estado_prueba", "FALLA");
            respuesta.put("mensaje_error", "El nombre de usuario y la contraseña son campos obligatorios.");
            return ResponseEntity.badRequest().body(respuesta);
        }

        Map<String, String> nuevoUsuario = new HashMap<>();
        nuevoUsuario.put("username", username);
        nuevoUsuario.put("password", password);
        usuariosDB.add(nuevoUsuario);

        respuesta.put("estado_prueba", "EXITO");
        respuesta.put("mensaje", "Usuario registrado con éxito en el sistema Instokgo.");
        return ResponseEntity.ok(respuesta);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> iniciarSesion(@RequestBody Map<String, String> datosPeticion) {
        Map<String, Object> respuesta = new HashMap<>();
        String username = datosPeticion.get("username");
        String password = datosPeticion.get("password");

        boolean autenticado = false;
        for (Map<String, String> user : usuariosDB) {
            if (user.get("username").equals(username) && user.get("password").equals(password)) {
                autenticado = true;
                break;
            }
        }

        if (autenticado) {
            respuesta.put("estado_prueba", "EXITO");
            respuesta.put("mensaje", "Autenticación satisfactoria.");
            return ResponseEntity.ok(respuesta);
        } else {
            respuesta.put("estado_prueba", "FALLA");
            respuesta.put("mensaje_error", "Error en la autenticación.");
            return ResponseEntity.status(401).body(respuesta);
        }
    }
}
