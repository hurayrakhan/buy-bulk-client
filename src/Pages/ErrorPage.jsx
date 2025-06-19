import { Link } from "react-router";
import { AlertCircle } from "lucide-react"; // You can use Heroicons or Lucide

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF5F5] px-6 py-12 text-center">
      
        <AlertCircle className="text-[#FF3F33]" size={45} />
      

      <h1 className="mt-3 text-6xl font-extrabold text-[#FF3F33]">404</h1>
      <h2 className="mt-2 text-2xl font-semibold text-gray-800">Page Not Found</h2>
      <p className="mt-2 text-gray-600 max-w-md">
        The page you’re looking for might have been removed, renamed, or temporarily unavailable.
        Let’s get you back to your product dashboard.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block bg-[#FF3F33] hover:bg-[#e63228] text-white font-semibold px-6 py-3 rounded transition duration-300"
      >
        Go to Homepage
      </Link>

      <div className="mt-12 text-sm text-gray-500">
        B2B Marketplace – Your products, your control.
      </div>
    </div>
  );
}
