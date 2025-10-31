import { Link } from 'react-router-dom'
import MenuItemCard from '../menu/MenuItemCard'
import { makanan } from '../../data/makanan'
import { minuman } from '../../data/minuman'
import { useNavigate } from 'react-router-dom'

export default function FeaturedMenuSection({ limit = 3 }) {
  const topMakanan = makanan.slice(0, limit)
  const topMinuman = minuman.slice(0, limit)
  const navigate = useNavigate()

  const handlePesan = (item, tipe) => {
    const tempPesanan = JSON.parse(localStorage.getItem('tempPesanan')) || [];
    const existing = tempPesanan.find((p) => p.id === item.id && p.tipe === tipe);
    let newPesanan;

    if (existing) {
      newPesanan = tempPesanan.map((p) =>
        p.id === item.id && p.tipe === tipe ? { ...p, qty: p.qty + 1 } : p
      );
    } else {
      newPesanan = [...tempPesanan, { ...item, tipe, qty: 1 }];
    }

    localStorage.setItem('tempPesanan', JSON.stringify(newPesanan));
    navigate('/pesan');
  }

  return (
    <section className="max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">Menu Unggulan</h2>
        <Link to="/menu" className="text-sm text-blue-600 hover:underline">Lihat Semua</Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Makanan */}
        <div>
          <h3 className="text-lg font-medium mb-3">Makanan</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {topMakanan.map((item) => (
              <MenuItemCard key={`m-${item.id}`} item={item} hideAction={true} onPesan={() => handlePesan(item, 'makanan')} />
            ))}
          </div>
        </div>

        {/* Minuman */}
        <div>
          <h3 className="text-lg font-medium mb-3">Minuman</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {topMinuman.map((item) => (
              <MenuItemCard key={`d-${item.id}`} item={item} hideAction={true} onPesan={() => handlePesan(item, 'minuman')} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}