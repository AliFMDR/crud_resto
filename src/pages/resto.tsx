import React, { useState } from "react";

const menuDatabase = [
  { id: 1, nama: "Nasi Goreng" },
  { id: 2, nama: "Mie Ayam" },
  { id: 3, nama: "Sate Ayam" },
  { id: 4, nama: "Ayam Goreng" },
  { id: 5, nama: "Ikan Bakar" },
  { id: 6, nama: "Nasi Uduk" },
  { id: 7, nama: "Seblak" },
  { id: 8, nama: "Kwetiaw" },
  { id: 9, nama: "Ayam Geprek" },
  { id: 10, nama: "Fried Chiken" },
];

const MenuManagement = () => {
  const [namaMenu, setNamaMenu] = useState("");
  const [editId, setEditId] = useState(null);
  const [daftarMenu, setDaftarMenu] = useState(menuDatabase);

  const [pesananMeja1, setPesananMeja1] = useState([]);
  const [pesananMeja2, setPesananMeja2] = useState([]);
  const [pesananMeja3, setPesananMeja3] = useState([]);
  const [strukPesanan, setStrukPesanan] = useState(""); // State untuk struk pesanan

  const tambahMenu = () => {
    if (namaMenu.trim() === "") return;
    const newId = daftarMenu.length + 1;
    const newMenu = { id: newId, nama: namaMenu };
    setDaftarMenu([...daftarMenu, newMenu]);
    setNamaMenu("");
  };

  const editMenu = () => {
    if (namaMenu.trim() === "") return;
    const updatedMenu = daftarMenu.map((menu) => (menu.id === editId ? { ...menu, nama: namaMenu } : menu));
    setDaftarMenu(updatedMenu);
    setEditId(null);
    setNamaMenu("");
  };

  const handleEditClick = (id, nama) => {
    setEditId(id);
    setNamaMenu(nama);
  };

  const hapusMenu = (id) => {
    const updatedMenu = daftarMenu.filter((menu) => menu.id !== id);
    setDaftarMenu(updatedMenu);
  };

  const cetakStruk = (meja, pesanan) => {
    if (pesanan.length === 0) {
      setStrukPesanan(`Meja ${meja} tidak memiliki pesanan.`);
    } else {
      let struk = `Struk Pesanan Meja ${meja}:\n`;
      pesanan.forEach((item) => {
        struk += `${item.menu} x ${item.jumlah}\n`;
      });
      struk += "Terima kasih telah makan di restoran kami!";
      setStrukPesanan(struk);
      // Selanjutnya, Anda dapat menambahkan logika untuk mengosongkan pesanan di sini.
      kosongkanMeja(meja);
    }
  };

  const kosongkanMeja = (meja) => {
    switch (meja) {
      case "meja1":
        setPesananMeja1([]);
        break;
      case "meja2":
        setPesananMeja2([]);
        break;
      case "meja3":
        setPesananMeja3([]);
        break;
      default:
        break;
    }
  };

  const tambahPesanan = (meja, menu, jumlah) => {
    if (jumlah > 0) {
      switch (meja) {
        case "meja1":
          setPesananMeja1([...pesananMeja1, { menu, jumlah }]);
          break;
        case "meja2":
          setPesananMeja2([...pesananMeja2, { menu, jumlah }]);
          break;
        case "meja3":
          setPesananMeja3([...pesananMeja3, { menu, jumlah }]);
          break;
        default:
          break;
      }
    }
  };

  const renderMenuTable = () => {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Daftar Menu Makanan</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-gray-600 text-white text-xl">Nama Menu</th> {/* Menambahkan background color pada elemen th */}
              <th className="py-2 px-4 border-b bg-gray-600 text-white text-xl text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {daftarMenu.map((menu) => (
              <tr key={menu.id}>
                <td className="py-2 px-4 border-b">{menu.nama}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button onClick={() => handleEditClick(menu.id, menu.nama)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mr-2">
                    Edit
                  </button>{" "}
                  {/* Menambahkan background color dan border radius pada tombol "Edit" */}
                  <button onClick={() => hapusMenu(menu.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md">
                    Hapus
                  </button>{" "}
                  {/* Menambahkan background color dan border radius pada tombol "Hapus" */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderMenuForm = () => {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{editId !== null ? "Edit Menu" : "Tambah Menu Makanan"}</h2>
        <div className="flex space-x-2">
          <input type="text" placeholder="Nama Menu" value={namaMenu} onChange={(e) => setNamaMenu(e.target.value)} className="border border-gray-300 rounded px-2 py-1 flex-grow" />
          {editId !== null ? (
            <button onClick={editMenu} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              Simpan Perubahan
            </button>
          ) : (
            <button onClick={tambahMenu} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
              Tambah
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderPesanan = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Pesanan</h2>
        <div className="flex flex-col md:flex-row mb-4">
          <div className="mb-4 md:mr-4 flex-grow">
            <label htmlFor="meja-select" className="block font-medium">
              Pilih Meja:
            </label>
            <select id="meja-select" className="border bg-gray-400 text-black border-black rounded px-2 py-1">
              <option value="meja1">Meja 1</option>
              <option value="meja2">Meja 2</option>
              <option value="meja3">Meja 3</option>
            </select>
          </div>
          <div className="mb-4 md:mr-4 flex-grow">
            <label htmlFor="menu-select" className="block font-medium">
              Pilih Menu:
            </label>
            <select id="menu-select" className="border bg-gray-400 text-black border-gray-300 rounded px-2 py-1">
              {daftarMenu.map((menu) => (
                <option key={menu.id} value={menu.nama}>
                  {menu.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 flex-grow">
            <label htmlFor="jumlah" className="block font-medium">
              Jumlah:
            </label>
            <input type="number" id="jumlah" className="border bg-gray-400 text-black border-gray-300 rounded px-2 py-1" />
          </div>
        </div>
        <button
          onClick={() => {
            const meja = document.getElementById("meja-select").value;
            const menu = document.getElementById("menu-select").value;
            const jumlah = parseInt(document.getElementById("jumlah").value);
            tambahPesanan(meja, menu, jumlah);
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Tambah Pesanan
        </button>
      </div>
    );
  };

  const renderDaftarPesanan = () => {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Daftar Pesanan</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Meja 1</h3>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b bg-gray-600 text-white text-xl">Menu</th>
                <th className="py-2 px-4 border-b bg-gray-600 text-white text-xl text-center">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {pesananMeja1.map((pesanan, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{pesanan.menu}</td>
                  <td className="py-2 px-4 border-b text-center">{pesanan.jumlah}x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold ">Meja 2</h3>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b bg-gray-600 text-white text-xl">Menu</th>
                <th className="py-2 px-4 border-b text-center bg-gray-600 text-white text-xl">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {pesananMeja2.map((pesanan, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{pesanan.menu}</td>
                  <td className="py-2 px-4 border-b text-center">{pesanan.jumlah}x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Meja 3</h3>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b bg-gray-600 text-white text-xl">Menu</th>
                <th className="py-2 px-4 border-b text-center bg-gray-600 text-white text-xl">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {pesananMeja3.map((pesanan, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{pesanan.menu}</td>
                  <td className="py-2 px-4 border-b text-center">{pesanan.jumlah}x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <button
            onClick={() => {
              const meja = document.getElementById("meja-select").value;
              let pesanan;
              switch (meja) {
                case "meja1":
                  pesanan = pesananMeja1;
                  break;
                case "meja2":
                  pesanan = pesananMeja2;
                  break;
                case "meja3":
                  pesanan = pesananMeja3;
                  break;
                default:
                  break;
              }
              cetakStruk(meja, pesanan);
            }}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Cetak Struk
          </button>
          <button
            onClick={() => {
              const meja = document.getElementById("meja-select").value;
              kosongkanMeja(meja);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
          >
            Kosongkan Meja
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="container mx-auto p-4 flex flex-wrap">
      <div className="w-full md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-3xl font-semibold mb-4">Sistem Restoran</h1>
        {renderMenuTable()}
        {renderMenuForm()}
      </div>
      <div className="w-full md:w-1/2">
        {renderPesanan()}
        {renderDaftarPesanan()}
      </div>
      <div className="w-full mt-8">
        <h2 className="text-2xl text-center text-black font-semibold mb-2">Struk Pesanan</h2>
        <pre className=" text-center text-xl text-slate-700">{strukPesanan}</pre>
      </div>
    </div>
  );
};

export default MenuManagement;
