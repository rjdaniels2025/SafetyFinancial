import Button from '../components/ui/Button';
import usePageMeta from '../hooks/usePageMeta';

export default function NotFoundPage() {
  usePageMeta('Page not found', 'The page you are looking for could not be found.', '/404');

  return (
    <section className="flex min-h-[70vh] items-center pb-20 pt-36">
      <div className="container-page max-w-2xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="h-section mt-4">We couldn't find that page.</h1>
        <p className="lead mt-4">It may have moved as part of our new website.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/" arrow>
            Go to the homepage
          </Button>
          <Button to="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
