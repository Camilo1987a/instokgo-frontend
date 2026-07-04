import React from 'react';

/**
 * Sistema InstokGo - Componente ProductCard
 * Representa de forma modular un artículo del catálogo para ventas virtuales.
 * Cumple con el estándar PascalCase y usa Props para dinamismo.
 */
export const ProductCard = ({ id, nombre, precio, stock, imagenUrl }) => {
  
  // Función para simular el redireccionamiento y automatización hacia WhatsApp
  const handleComprar = () => {
    const telefonoTienda = "573151234567"; // Teléfono parametrizado para la pauta
    const mensaje = `Hola InstokGo, estoy interesado en comprar la ${nombre} con ID #${id}. ¿Hay disponibilidad?`;
    const urlWhatsapp = `https://whatsapp.com{telefonoTienda}&text=${encodeURIComponent(mensaje)}`;
    
    // Redirección directa al chat de soporte automatizado de la tienda
    window.open(urlWhatsapp, '_blank');
  };

  return (
    <div style={styles.card}>
      <img src={imagenUrl} alt={nombre} style={styles.imagen} />
      <div style={styles.infoContainer}>
        <h3 style={styles.titulo}>{nombre}</h3>
        <p style={styles.precio}>${precio.toLocaleString('es-CO')} COP</p>
        <p style={stock > 0 ? styles.stockDisponible : styles.stockAgotado}>
          {stock > 0 ? `En Stock: ${stock} unidades` : 'Producto Agotado'}
        </p>
        <button 
          onClick={handleComprar} 
          disabled={stock <= 0} 
          style={stock > 0 ? styles.boton : styles.botonDeshabilitado}
        >
          {stock > 0 ? 'Pedir por WhatsApp' : 'Sin Existencias'}
        </button>
      </div>
    </div>
  );
};

// Estilos en línea para garantizar la independencia del componente presentacional
const styles = {
  card: { border: '1px solid #e0e0e0', borderRadius: '12px', padding: '16px', maxWidth: '280px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', backgroundColor: '#fff', fontFamily: 'Arial, sans-serif' },
  imagen: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' },
  infoContainer: { marginTop: '12px', textAlign: 'center' },
  titulo: { fontSize: '18px', margin: '8px 0', color: '#333' },
  precio: { fontSize: '16px', fontWeight: 'bold', color: '#2ecc71', margin: '4px 0' },
  stockDisponible: { fontSize: '13px', color: '#7f8c8d', marginBottom: '12px' },
  stockAgotado: { fontSize: '13px', color: '#e74c3c', fontWeight: 'bold', marginBottom: '12px' },
  boton: { backgroundColor: '#25d366', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%', transition: '0.3s' },
  botonDeshabilitado: { backgroundColor: '#bdc3c7', color: '#7f8c8d', border: 'none', padding: '10px 16px', borderRadius: '6px', width: '100%', cursor: 'not-allowed' }
};
