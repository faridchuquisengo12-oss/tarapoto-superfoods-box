
import { useState } from 'react'
import {
  ShoppingBag,
  Menu,
  X,
  Plus,
  Minus,
  Leaf,
  ArrowRight,
  Trash2,
  Sprout,
} from 'lucide-react'
import './App.css'

type Product = {
  id: number
  name: string
  category: string
  description: string
  price: number
  image: string
  tag: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'Cacao amazónico',
    category: 'CACAO NATURAL',
    description: 'Cacao de origen amazónico, intenso y aromático.',
    price: 24,
    image:
      'https://images.unsplash.com/photo-1548907040-4d42e3b7e7e9?auto=format&fit=crop&w=800&q=85',
    tag: 'Favorito',
  },
  {
    id: 2,
    name: 'Cúrcuma natural',
    category: 'RAÍCES Y ESPECIAS',
    description: 'Una raíz versátil para tus bebidas y recetas.',
    price: 18,
    image:
      'https://images.unsplash.com/photo-1615485500704-8e990f9900f5?auto=format&fit=crop&w=800&q=85',
    tag: 'De la tierra',
  },
  {
    id: 3,
    name: 'Kion deshidratado',
    category: 'RAÍCES Y ESPECIAS',
    description: 'Aroma cálido y sabor intenso en cada preparación.',
    price: 16,
    image:
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=85',
    tag: 'Natural',
  },
  {
    id: 4,
    name: 'Sacha inchi',
    category: 'SEMILLAS AMAZÓNICAS',
    description: 'Semillas amazónicas para sumar variedad a tu mesa.',
    price: 22,
    image:
      'https://images.unsplash.com/photo-1599599810694-b5b37304c6f3?auto=format&fit=crop&w=800&q=85',
    tag: 'De Tarapoto',
  },
]

type CartItem = {
  product: Product
  quantity: number
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id)

      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...current, { product, quantity: 1 }]
    })

    setNotice(`${product.name} se agregó al carrito`)
    window.setTimeout(() => setNotice(''), 2500)
  }

  function changeQuantity(productId: number, amount: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <div className="site-shell">
      <div className="announcement">
        <Leaf size={15} />
        <span>Desde Tarapoto, con cariño y respeto por nuestra tierra</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Raíces de la Amazonía, inicio">
          <span className="brand-icon">
            <Sprout size={28} strokeWidth={1.6} />
          </span>
          <span className="brand-copy">
            <strong>raíces</strong>
            <small>DE LA AMAZONÍA</small>
          </span>
        </a>

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`}>
          <a href="#inicio" onClick={closeMenu}>Inicio</a>
          <a href="#productos" onClick={closeMenu}>Productos</a>
          <a href="#historia" onClick={closeMenu}>Nuestra historia</a>
          <a href="#contacto" onClick={closeMenu}>Contacto</a>
        </nav>

        <button className="cart-button" onClick={() => setCartOpen(true)}>
          <ShoppingBag size={19} strokeWidth={1.8} />
          <span>Mi carrito</span>
          <span className="cart-count">{cartCount}</span>
        </button>
      </header>

      <main>
        <section className="hero-section" id="inicio">
          <div className="hero-content">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              EL ORIGEN TIENE SABOR
            </span>

            <h1>
              De la Amazonía
              <br />
              peruana <em>a tu mesa.</em>
            </h1>

            <p className="hero-description">
              Descubre los sabores auténticos de Tarapoto. Productos de nuestra
              tierra, cultivados con respeto y preparados para acompañar tu día.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#productos">
                Descubrir productos <ArrowRight size={18} />
              </a>
              <a className="text-link" href="#historia">
                Conoce nuestra historia
              </a>
            </div>

            <div className="hero-note">
              <span className="note-icon"><Sprout size={20} /></span>
              <span>
                <strong>De nuestra chacra a tu hogar</strong>
                <small>Origen amazónico · Producción responsable</small>
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image" role="img" aria-label="Paisaje verde de la Amazonía peruana" />
            <div className="hero-image-label">
              <span className="label-leaf"><Leaf size={21} /></span>
              <span>
                <small>NUESTRO ORIGEN</small>
                <strong>Tarapoto, Perú</strong>
              </span>
            </div>
            <div className="hero-stamp">
              <Sprout size={24} />
              <span>Naturalmente</span>
              <strong>amazónico</strong>
            </div>
          </div>

          <div className="hero-decoration" aria-hidden="true">R</div>
        </section>

        <section className="values-strip" aria-label="Nuestros valores">
          <div><Sprout /><span>Origen amazónico</span></div>
          <div><Leaf /><span>Respeto por la tierra</span></div>
          <div><ShoppingBag /><span>Hecho con dedicación</span></div>
          <div><HeartIcon /><span>De nuestra familia para ti</span></div>
        </section>

        <section className="products-section section-wrap" id="productos">
          <div className="section-heading">
            <div>
              <span className="eyebrow">TESOROS DE NUESTRA TIERRA</span>
              <h2>Pequeños grandes <em>orígenes.</em></h2>
              <p>Ingredientes amazónicos que llevan un pedacito de nuestra tierra hasta tu hogar.</p>
            </div>
            <span className="product-count">01 — 04 / SELECCIÓN NATURAL</span>
          </div>

          <div className="product-grid">
            {products.map((product, index) => (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                  />
                  <span className="product-tag">{product.tag}</span>
                  <button
                    className="quick-add"
                    onClick={() => addToCart(product)}
                    aria-label={`Agregar ${product.name} al carrito`}
                  >
                    <Plus size={20} />
                  </button>
                  <span className="product-index">0{index + 1}</span>
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-bottom">
                    <strong>S/ {product.price.toFixed(2)}</strong>
                    <button onClick={() => addToCart(product)} className="add-link">
                      Agregar <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="catalog-footer">
            <span>Lo bueno de nuestra tierra, seleccionado para ti.</span>
            <span className="catalog-leaf"><Leaf size={20} /></span>
          </div>
        </section>

        <section className="story-section" id="historia">
          <div className="story-image">
            <img
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85"
              alt="Vegetación de un bosque tropical"
              loading="lazy"
            />
            <div className="story-image-caption">
              <Sprout size={22} />
              <span>Un origen que queremos cuidar</span>
            </div>
          </div>

          <div className="story-content">
            <span className="eyebrow">UNA HISTORIA QUE CRECE</span>
            <h2>La Amazonía no es solo nuestro origen. <em>Es nuestro compromiso.</em></h2>
            <p>
              Somos una iniciativa familiar en Tarapoto que busca compartir la
              riqueza de nuestra tierra. Trabajamos con prácticas responsables,
              cuidando el suelo y valorando cada etapa del proceso.
            </p>
            <p>
              Queremos que cada producto te acerque a la Amazonía peruana y a
              las personas que la trabajan con dedicación.
            </p>
            <a href="#contacto" className="button button-outline">
              Conoce más de nosotros <ArrowRight size={18} />
            </a>
            <div className="story-signature">
              <Sprout size={30} />
              <span>Con raíces en Tarapoto, Perú</span>
            </div>
          </div>
        </section>

        <section className="closing-banner" id="contacto">
          <div className="closing-leaf"><Leaf size={30} /></div>
          <span className="eyebrow">UN PEDACITO DE LA SELVA PARA TI</span>
          <h2>Los mejores encuentros<br />comienzan <em>en la tierra.</em></h2>
          <a href="#productos" className="button button-light">
            Explorar la tienda <ArrowRight size={18} />
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#inicio">
          <span className="brand-icon"><Sprout size={25} /></span>
          <span className="brand-copy">
            <strong>raíces</strong>
            <small>DE LA AMAZONÍA</small>
          </span>
        </a>
        <p>De Tarapoto para tu hogar, con respeto por nuestra tierra.</p>
        <span className="footer-copy">© 2026 Raíces de la Amazonía</span>
      </footer>

      {notice && <div className="toast" role="status">{notice}</div>}

      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <aside
            className="cart-drawer"
            onClick={(event) => event.stopPropagation()}
            aria-label="Tu carrito de compras"
          >
            <div className="cart-header">
              <div>
                <span className="eyebrow">TU SELECCIÓN</span>
                <h2>Mi carrito <span>({cartCount})</span></h2>
              </div>
              <button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Cerrar carrito">
                <X />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBag size={42} strokeWidth={1.2} />
                <h3>Tu cesta está esperando</h3>
                <p>Descubre los sabores de nuestra tierra y agrega tus favoritos.</p>
                <button className="button button-primary" onClick={() => setCartOpen(false)}>
                  Explorar productos <ArrowRight size={17} />
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.product.id}>
                      <img src={item.product.image} alt={item.product.name} />
                      <div className="cart-item-info">
                        <h3>{item.product.name}</h3>
                        <span>S/ {item.product.price.toFixed(2)}</span>
                        <div className="quantity-control">
                          <button onClick={() => changeQuantity(item.product.id, -1)} aria-label="Restar unidad">
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => changeQuantity(item.product.id, 1)} aria-label="Agregar unidad">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <button
                        className="remove-item"
                        onClick={() => setCart((current) => current.filter((entry) => entry.product.id !== item.product.id))}
                        aria-label={`Eliminar ${item.product.name}`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <div className="total-line">
                    <span>Subtotal</span>
                    <strong>S/ {cartTotal.toFixed(2)}</strong>
                  </div>
                  <p>El costo de envío se calculará al coordinar tu pedido.</p>
                  <button
                    className="button button-primary checkout-button"
                    onClick={() => {
                      setNotice('El carrito está listo. Próximamente podrás finalizar tu pedido.')
                      setCartOpen(false)
                      window.setTimeout(() => setNotice(''), 3500)
                    }}
                  >
                    Continuar con mi pedido <ArrowRight size={18} />
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}

function HeartIcon() {
  return <Leaf aria-hidden="true" />
}

export default App
