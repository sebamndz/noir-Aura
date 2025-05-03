<?php
// Cabeceras CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json;');

function obtenerJWTokens($usuario, $password) {
    // URL de tu WordPress Headless
    $url = 'http://localhost/noir-aura/wordpress/wp-json/jwt-auth/v1/token'; // Usar http y una sola barra
    $data = json_encode(array(
        'username' => $usuario,
        'password' => $password
    ));

    // Inicializamos la conexión
    $ch = curl_init($url);

    // Opciones de conexión
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

    // Ejecutamos
    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        curl_close($ch);
        die(json_encode(array('error' => curl_error($ch))));
    }

    curl_close($ch);

    // Procesamos la respuesta
    $response = json_decode($result, true);
    return isset($response['token']) ? $response['token'] : null;
}

// Datos de autenticación
$user = 'sebamndz';
$pass = '4o4ILbY3OwFUkf&@mb';

// Obtener el token
$token = obtenerJWTokens($user, $pass);

// Enviar token
echo json_encode(array('token' => $token));
