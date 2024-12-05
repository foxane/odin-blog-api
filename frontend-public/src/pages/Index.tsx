import Header from '../components/Header';
import Footer from '../components/Footer';

export default function IndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <Header></Header>
      <main className="flex-1">Main plaveholder</main>
      <Footer></Footer>
    </div>
  );
}
