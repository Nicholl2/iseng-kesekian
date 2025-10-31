import { useState } from 'react';
import { makanan } from '../data/makanan';
import { minuman } from '../data/minuman';
import { useEffect } from 'react';


export default function PesanPage() {
  const [pesanan, setPesanan] = useState([]);
  const [total, setTotal] = useState(0);

  const tambahPesanan = (item) => {
    const existing = pesanan.find((p) => p.id === item.id && p.tipe === item.tipe);
    let newPesanan;

    if (existing) {
      newPesanan = pesanan.map((p) =>
        p.id === item.id && p.tipe === item.tipe ? { ...p, qty: p.qty + 1 } : p
      );
    } else {
      newPesanan = [...pesanan, { ...item, qty: 1 }];
    }

    setPesanan(newPesanan);
    setTotal(total + item.harga);
  };

  // ... di dalam komponen PesanPage()
useEffect(() => {
  const temp = JSON.parse(localStorage.getItem('tempPesanan')) || [];
  if (temp.length > 0) {
    setPesanan(temp);
    const totalAwal = temp.reduce((sum, p) => sum + p.harga * p.qty, 0);
    setTotal(totalAwal);
    localStorage.removeItem('tempPesanan');
  }
}, []);

  const hapusPesanan = (id, tipe) => {
    const item = pesanan.find((p) => p.id === id && p.tipe === tipe);
    if (!item) return;

    const newPesanan =
      item.qty > 1
        ? pesanan.map((p) =>
            p.id === id && p.tipe === tipe ? { ...p, qty: p.qty - 1 } : p
          )
        : pesanan.filter((p) => !(p.id === id && p.tipe === tipe));

    setPesanan(newPesanan);
    setTotal(total - item.harga);
  };

  const konfirmasiPesanan = () => {
    if (pesanan.length === 0) return alert('Belum ada pesanan!');
    const waktu = new Date().toLocaleString();
    const data = { waktu, pesanan, total };
    const history = JSON.parse(localStorage.getItem('riwayatPesanan')) || [];
    history.push(data);
    localStorage.setItem('riwayatPesanan', JSON.stringify(history));

    alert('Pesanan disimpan ke histori ✅');
    setPesanan([]);
    setTotal(0);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-blue-600">🧾 Pesan Makanan & Minuman</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Makanan */}
        <div>
          <h2 className="text-xl font-medium mb-2">🍗 Makanan</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {makanan.map((m) => (
              <div
                key={m.id}
                className="p-3 border rounded-lg shadow-sm hover:shadow-md transition bg-white"
              >
                <p className="font-semibold">{m.nama}</p>
                <p className="text-slate-600 text-sm mb-2">Rp {m.harga.toLocaleString()}</p>
                <button
                  onClick={() => tambahPesanan({ ...m, tipe: 'makanan' })}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                >
                  Tambah
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Minuman */}
        <div>
          <h2 className="text-xl font-medium mb-2">🥤 Minuman</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {minuman.map((m) => (
              <div
                key={m.id}
                className="p-3 border rounded-lg shadow-sm hover:shadow-md transition bg-white"
              >
                <p className="font-semibold">{m.nama}</p>
                <p className="text-slate-600 text-sm mb-2">Rp {m.harga.toLocaleString()}</p>
                <button
                  onClick={() => tambahPesanan({ ...m, tipe: 'minuman' })}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                >
                  Tambah
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daftar Pesanan */}
      <div className="mt-8">
        <h2 className="text-xl font-medium mb-2">🛒 Daftar Pesanan</h2>
        {pesanan.length === 0 ? (
          <p className="text-slate-500">Belum ada pesanan.</p>
        ) : (
          <div className="border rounded-lg p-4 bg-white">
            {pesanan.map((p, idx) => (
              <div key={idx} className="flex justify-between items-center mb-2">
                <p>
                  {p.nama} <span className="text-sm text-slate-500">x{p.qty}</span>
                </p>
                <div className="flex items-center space-x-2">
                  <p>Rp {(p.harga * p.qty).toLocaleString()}</p>
                  <button
                    onClick={() => hapusPesanan(p.id, p.tipe)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
            <hr className="my-3" />
            <p className="font-semibold text-lg">
              Total: Rp {total.toLocaleString()}
            </p>
            <button
              onClick={konfirmasiPesanan}
              className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
            >
              Konfirmasi Pesanan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
