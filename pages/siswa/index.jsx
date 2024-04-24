import Layout from "@/components/Layout";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export async function getServerSideProps({ query }) {
    const page = query.page || 1;

    try {
        const request = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/siswa`, {
            params: {
                page: page,
            },
        });
        const response = request.data;

        return {
            props: {
                siswa: response.data.data || [],
                message: response.message,
                currentPage: page,
                totalPages: Math.ceil(response.data.total / response.data.per_page),
            },
        };
    } catch (err) {
        console.log(err.message);
        return {
            props: {
                siswa: [],
                message: "Error fetch data",
                currentPage: page,
                totalPages: 1,
            },
        };
    }
}

export default function Home({ siswa, message, currentPage, totalPages }) {
    // router
    const router = useRouter();
    // refresh data
    const refreshData = () => {
        router.replace(router.asPath);
    };

    const deleteSiswa = async (id) => {
        if (confirm("Yakin delete siswa?")) {
            try {
                // delete siswa
                await axios.delete(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/siswa/${id}`);
                // refresh data
                refreshData();
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Layout>
            <div className="container mx-auto mt-10">
                <h1 className="text-2xl font-bold mb-4">{message}</h1>
                <Link href="/siswa/tambah-siswa" className="px-3 py-2 bg-red-400">
                    Tambah siswa
                </Link>
                <table className="min-w-full table-auto border-[3px]">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-[3px]" width="30px">
                                No
                            </th>
                            <th className="px-4 py-2 border-[3px]" width="300px">
                                Foto
                            </th>
                            <th className="px-4 py-2 border-[3px]">Nama</th>
                            <th className="px-4 py-2 border-[3px]">NIS</th>
                            <th className="px-4 py-2 border-[3px]">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {siswa.map((siswa, i) => (
                            <tr key={siswa.id}>
                                <td className="px-4 py-2 border-[3px]">{i + 1}</td>
                                <td className="px-4 py-2 border-[3px]">
                                    <Image src={`${process.env.NEXT_PUBLIC_API_BACKEND}/storage/siswa/${siswa.foto}`} alt={siswa.nama} className="" width={300} height={200} />
                                </td>
                                <td className="px-4 py-2 border-[3px]">{siswa.nama}</td>
                                <td className="px-4 py-2 border-[3px]">{siswa.nis}</td>
                                <td className="text-center border-[3px]">
                                    <Link href={`/siswa/edit/${siswa.id}`}>
                                        <button className="bg-yellow-500 text-white py-2 px-3 rounded-lg ">Edit</button>
                                    </Link>
                                    <button className="bg-red-500 text-white py-2 px-3 rounded-lg " onClick={() => deleteSiswa(siswa.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Navigasi paginasi */}
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <Link key={page} href={`/siswa/?page=${page}`} className={page == currentPage ? "active bg-emerald-400" : "bg-red-400"}>
                            {page}
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
