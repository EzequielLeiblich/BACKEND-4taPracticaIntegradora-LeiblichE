# 4ta Práctica Integradora - Integración Avanzada para Ecommerce

## LEIBLICH Ezequiel Gaston

## Comisión 43345 - Programación Backend

------------------------------------------------------

# Integración Avanzada para Ecommerce

Este repositorio marca el resultado de una práctica de integración sobre el proyecto de ecommerce existente. Hemos realizado mejoras significativas en varios procesos clave.

## Recuperación de Contraseña

Implementamos un sistema de recuperación de contraseña que permite a los usuarios restablecer su contraseña de manera segura. Las características clave incluyen:

* Envío de un correo electrónico con un enlace de restablecimiento de contraseña.
* El enlace expira automáticamente después de 1 hora.
* Prevención de restablecimiento con la misma contraseña existente.
* Redirección a una página para generar un nuevo correo de restablecimiento en caso de que el enlace haya expirado.

## Nuevo Rol "Premium"

Hemos introducido un nuevo rol de usuario llamado "premium". Los usuarios con este rol tienen privilegios adicionales, como la capacidad de crear productos.

## Cambios en el Schema de Producto

Modificamos el schema de producto para incluir un campo "owner" que hace referencia al usuario que creó el producto. Los aspectos importantes son:

* Si un producto se crea sin un propietario especificado, se establece automáticamente como propiedad del "admin".
* El campo "owner" almacena el correo electrónico del usuario que creó el producto y solo puede ser establecido por usuarios premium.

## Cambios en los Permisos de Modificación y Eliminación de Productos

Realizamos cambios en los permisos para garantizar un comportamiento adecuado:

* Un usuario premium solo puede eliminar los productos que le pertenecen.
* El "admin" tiene la capacidad de eliminar cualquier producto, incluso si tiene un propietario.

## Lógica de Carrito

Hemos ajustado la lógica del carrito para que un usuario premium no pueda agregar productos que le pertenecen a su carrito, evitando la duplicación de productos.

## Cambio de Rol de Usuario

Implementamos una nueva ruta en el router de usuarios (/api/users/premium/:uid) que permite cambiar el rol de un usuario entre "user" y "premium".

¡Gracias por revisar estas mejoras avanzadas en mi proyecto de ecommerce! Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto conmigo.
