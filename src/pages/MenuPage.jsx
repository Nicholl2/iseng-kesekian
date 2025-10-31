import { useNavigate } from 'react-router-dom';
import MenuItemCard from '../components/menu/MenuItemCard';
import { makanan } from '../data/makanan';
import { minuman } from '../data/minuman';

export default function MenuPage() {
  const navigate = useNavigate();

  const handlePesan = (item, tipe) => {
    // Ambil pesanan sebelumnya dari localStorage (sementara sebelum checkout)
    const tempPesanan = JSON.parse(localStorage.getItem('tempPesanan')) || [];

    // Cek apakah item sudah ada
    const existing = tempPesanan.find((p) => p.id === item.id && p.tipe === tipe);
    let newPesanan;

    if (existing) {
      newPesanan = tempPesanan.map((p) =>
        p.id === item.id && p.tipe === tipe ? { ...p, qty: p.qty + 1 } : p
      );
    } else {
      newPesanan = [...tempPesanan, { ...item, tipe, qty: 1 }];
    }

    // Simpan ke localStorage
    localStorage.setItem('tempPesanan', JSON.stringify(newPesanan));

    // Arahkan ke halaman PesanPage
    navigate('/pesan');
  };

  return (
    <div className="text-center mb-12">
  <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
    🍽️ Daftar Menu
  </h1>
  <p className="text-gray-600 text-base max-w-2xl mx-auto">
    Temukan berbagai pilihan makanan dan minuman khas Nusantara. 
    Dari hidangan utama hingga minuman segar, semua tersedia di sini.
  </p>

      

      {/* Makanan Section */}
      <section className="mb-8">
        <h2 className="text-xl font-medium mb-3">Makanan</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {makanan.map((item) => (
            <div key={item.id} className="relative">
              <MenuItemCard item={item} hideAction={true} onPesan={() => handlePesan(item, 'makanan')} />
            </div>
          ))}
        </div>
      </section>

      {/* Minuman Section */}
      <section>
        <h2 className="text-xl font-medium mb-3">🥤 Minuman</h2>
       <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {minuman.map((item) => (
            <div key={item.id} className="relative">
              <MenuItemCard item={item} hideAction={true} onPesan={() => handlePesan(item, 'minuman')} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
