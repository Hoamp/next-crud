import Layout from "@/components/Layout";
import axios from "axios";
// import Image from "next/image";
import Link from "next/link";

export async function getServerSideProps() {
    try {
        const request = await axios.get(`http://127.0.0.1:8000/api/siswa`);
        const response = request.data;

        return {
            props: {
                siswa: response.data.data || [],
                message: response.message,
            },
        };
    } catch (err) {
        console.log(err.message);
    }
}

export default function Home({ siswa, message }) {
    return <Layout></Layout>;
}
