

export default function Footer() {
  return (
    <footer className="footer flex flex-col justify-center items-center footer-center p-10 bg-base-200 text-base-content rounded mt-10">
      <div>
        <p className="font-bold">Library Management System</p>
        <p>Empowering Readers Since 2025</p>
      </div>
      <div>
        <p>© {new Date().getFullYear()} XYZ Library. All rights reserved.</p>
      </div>
    </footer>
  );
}
