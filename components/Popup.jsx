export default function Popup({ isOpen, message }) {
    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center ">
                <div className="bg-white p-6 rounded shadow-md z-50">
                    <p className="text-xl font-semibold mb-4">{message}</p>
                    <p className="text-sm text-center mb-4">Mohon tunggu sebentar</p>
                </div>
                <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
            </div>
        )
    );
}
