import {
  Filter,
  Home,
  Map,
  MessageCircle,
  Minus,
  Plus,
  SlidersHorizontal,
  WalletCards,
} from 'lucide-react'

import { useEffect, useState } from 'react'
import { getProperties } from '../services/api'
import './Properties.css'

function Properties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProperties() {
      try {
        const result = await getProperties()

        console.log('Properties:', result)

        setProperties(result.properties || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [])

  const mapPins = [
    { price: 'RM 4.5k', top: '31%', left: '43%' },
    { price: 'RM 3.2k', top: '55%', left: '52%' },
    { price: 'RM 2.2k', top: '40%', left: '75%' },
    { price: 'RM 5.8k', top: '66%', left: '63%', active: true },
  ]

  if (loading) {
    return (
      <div className="loading-screen">
        Loading Properties...
      </div>
    )
  }

  return (
    <>
      <section className="property-browse-filterbar">
        <div className="property-browse-location">
          <Map size={22} />
          <span>Kuala Lumpur, Malaysia</span>
        </div>

        <button type="button" className="property-browse-chip">
          <WalletCards size={20} />
          RM 2.5k - 5k
        </button>

        <button type="button" className="property-browse-chip">
          <Home size={20} />
          Apartment
        </button>

        <button type="button" className="property-browse-filter-btn">
          <Filter size={20} />
          Filters
        </button>
      </section>

      <section className="property-browse-layout">
        <aside className="property-browse-list">
          <div className="property-browse-list-header">
            <h2>186 Properties Available</h2>
            <SlidersHorizontal size={22} />
          </div>

          <div className="property-browse-cards">
            {properties.map((property) => (
              <article className="property-browse-card" key={property.name}>
                <div className="property-browse-image">
                  <img src={property.image} alt={property.name} />
                  <span>{property.rating} ★</span>
                </div>

                <div className="property-browse-info">
                  <div className="property-browse-title-row">
                    <h3>{property.name}</h3>
                    <strong>{property.price}</strong>
                  </div>

                  <p>{property.location}</p>

                  <div className="property-browse-meta">
                    <span>{property.beds} beds</span>
                    <span>{property.size}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </aside>

        <section className="property-browse-map-panel">
          <div className="property-browse-map">
            <div className="property-map-label property-label-one">KLCC Park</div>
            <div className="property-map-label property-label-two">Pavilion KL</div>
            <div className="property-map-label property-label-three">Jalan Bukit Bintang</div>
            <div className="property-map-label property-label-four">Starhill</div>

            <div className="property-main-pin"></div>

            {mapPins.map((pin) => (
              <div
                className={pin.active ? 'property-map-price active' : 'property-map-price'}
                style={{ top: pin.top, left: pin.left }}
                key={`${pin.price}-${pin.top}`}
              >
                {pin.price}
                {pin.active && <span>★</span>}
              </div>
            ))}

            <button type="button" className="property-chat-float">
              <MessageCircle size={30} />
            </button>

            <button type="button" className="property-redraw-btn">
              <Map size={20} />
              Redraw Search Area
            </button>

            <div className="property-zoom-controls">
              <button type="button">
                <Plus size={22} />
              </button>

              <button type="button">
                <Minus size={22} />
              </button>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

export default Properties