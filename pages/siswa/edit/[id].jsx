import Layout from "@/components/Layout";
import Popup from "@/components/Popup";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";

export async function getServerSideProps({ params }) {
    try {
        const request = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/siswa/${params.id}`);
        const response = request.data;

        return {
            props: {
                siswa: response.data || [],
                message: response.message,
            },
        };
    } catch (err) {
        console.log(err);
        return {
            props: {
                siswa: null,
                message: "Terjadi kesalahan saat mengambil data siswa",
            },
        };
    }
}

export default function EditSiswa({ siswa, message }) {
    const [nama, setNama] = useState(siswa.nama);
    const [nis, setNis] = useState(siswa.nis);
    const [foto, setFoto] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const [validation, setValidation] = useState({});

    const handleFileChange = (e) => {
        // isi foto
        const imageData = e.target.files[0];

        // cek validasi tipe
        if (!imageData.type.match("image.*")) {
            setFoto("");

            return;
        }

        // set image
        setFoto(imageData);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        // define formdata
        const formData = new FormData();

        // append ke dalam formdata
        formData.append("nama", nama);
        formData.append("nis", nis);
        formData.append("foto", foto);
        formData.append("_method", "PUT");

        // kirim data ke server
        await axios
            .post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/siswa/${siswa.id}`, formData)
            .then((res) => {
                setIsOpen(true);
                setPopupMessage(res.data.message);

                setTimeout(() => {
                    Router.push("/siswa");
                }, 2000);
            })
            .catch((e) => {
                setValidation(e.response.data);
            });
    };

    return (
        <Layout>
            <div className="container mx-auto mt-10">
                <h1 className="text-2xl font-bold mb-4">{message}</h1>

                {isOpen && <Popup isOpen={isOpen} message={popupMessage} />}

                <div>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label htmlFor="nama" className="block text-gray-700 text-sm font-bold mb-2">
                                Nama:
                            </label>
                            <input
                                type="text"
                                id="nama"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Masukkan nama siswa"
                                onChange={(e) => setNama(e.target.value)}
                                value={nama}
                            />
                            {validation.nama && (
                                <div className="p-2 bg-red-500 my-2 rounded-lg">
                                    <p className="text-white">{validation.nama}</p>
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="nis" className="block text-gray-700 text-sm font-bold mb-2">
                                NIS:
                            </label>
                            <input
                                type="text"
                                id="nis"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Masukkan NIS siswa"
                                onChange={(e) => setNis(e.target.value)}
                                value={nis}
                            />
                            {validation.nis && (
                                <div className="p-2 bg-red-500 my-2 rounded-lg">
                                    <p className="text-white">{validation.nis}</p>
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="foto" className="block text-gray-700 text-sm font-bold mb-2">
                                Foto:
                            </label>
                            <input type="file" id="foto" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleFileChange} />
                            {validation.foto && (
                                <div className="p-2 bg-red-500 my-2 rounded-lg">
                                    <p className="text-white">{validation.foto}</p>
                                </div>
                            )}
                        </div>
                        <button type="submit" className="py-2 px-3 bg-emerald-500 text-white rounded-lg">
                            Update
                        </button>
                        <Link href="/siswa" className="py-2 px-3 bg-yellow-500 text-white rounded-lg mx-4">
                            Kembali
                        </Link>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
