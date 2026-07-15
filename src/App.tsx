import { Builder } from "./components/builder/Builder";
import { ReviewPanel } from "./components/review/ReviewPanel";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[100rem] px-4 py-8 sm:px-8 sm:py-10 xxl:px-12 xxl:py-12">
        <h1 className="mb-8 block text-center text-4xl font-extrabold text-ink md:hidden">Let&apos;s get started!</h1>
        {/*
          <lg          : single column (mobile + small tablet) — review stacked below
          lg .. <xxl   : Frame 1735 sidebar — builder | review (sticky)
          >=xxl (1440) : Frame 1736 — builder full-width, review below (2-col internally)
        */}
        <div className="grid grid-cols-1 items-start gap-8 lg:max-xxl:grid-cols-[minmax(0,1fr)_22.5rem] xxl:grid-cols-1">
          <Builder />
          <ReviewPanel />
        </div>
      </div>
    </div>
  );
}

export default App;
