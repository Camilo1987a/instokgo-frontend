import React from 'react';
import { ProductCard } from './components/ProductCard';

/**
 * Componente principal del ecosistema frontend de InstokGo.
 * Coordina la presentación del catálogo e integra la lógica de negocio.
 */
function App() {
    // Lista de productos simulada con enlaces de imagen directos y estables
  const productosInventario = [
    { id: 101, nombre: "Camiseta Polo Slim Fit", precio: 85000, stock: 15, imagenUrl: "https://placehold.co" },
    { id: 102, nombre: "Gorra Deportiva Instok", precio: 45000, stock: 0, imagenUrl: "https://placehold.co" },
    { id: 103, nombre: "Buso Hoodie Over-size", precio: 120000, stock: 8, imagenUrl: "https://placehold.co" }
  ];


  return (
    <div style={appStyles.container}>
      <header style={appStyles.header}>
        <h1 style={appStyles.logo}>InstokGo ⚡</h1>
        <p style={appStyles.subtitulo}>Catálogo Virtual Automatizado - Ventas por WhatsApp</p>
      </header>

      <main style={appStyles.grid}>
        {productosInventario.map((prod) => (
          <ProductCard 
            key={prod.id}
            id={prod.id}
            nombre={prod.nombre}
            precio={prod.precio}
            stock={prod.stock}
            imagenUrl={prod.imagenUrl}
          />
        ))}
      </main>
    </div>
  );
}

const appStyles = {
  container: { padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh', fontFamily: 'Arial, sans-serif' },
  header: { textAlign: 'center', marginBottom: '40px', borderBottom: '2px solid #eee', paddingBottom: '20px' },
  logo: { color: '#2c3e50', fontSize: '32px', margin: '0' },
  subtitulo: { color: '#7f8c8d', fontSize: '16px', marginTop: '5px' },
  grid: { display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }
};

export default App;
