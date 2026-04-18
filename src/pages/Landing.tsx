import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { LogoDropdown } from "@/components/LogoDropdown";
import { ArrowRight, BarChart3, Search, Network } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";
import { useTheme } from "next-themes";
import { useAuth, SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";

export default function Landing() {
  const { scrollY } = useScroll();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { isSignedIn } = useAuth();

  const handleVisualizerClick = () => {
    if (isSignedIn) {
      navigate("/algorithms/bubble-sort");
    }
  };

  // Parallax transforms
  const heroTextY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroButtonsY = useTransform(scrollY, [0, 500], [0, -50]);
  const backgroundShape1Y = useTransform(scrollY, [0, 1000], [0, 300]);
  const backgroundShape2Y = useTransform(scrollY, [0, 1000], [0, -200]);

  // Navbar animation logic
  const navWidth = useSpring(useTransform(scrollY, [0, 50], ["100%", "70%"]), { stiffness: 400, damping: 30 });
  const navTop = useSpring(useTransform(scrollY, [0, 50], ["0px", "16px"]), { stiffness: 400, damping: 30 });
  const navRadius = useSpring(useTransform(scrollY, [0, 50], ["0px", "50px"]), { stiffness: 400, damping: 30 });
  const navBorder = useTransform(scrollY, [0, 50], ["transparent", "rgba(255, 255, 255, 0.3)"]);
  const howItWorksCardY = useTransform(scrollY, [0, 1500], [0, 100]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-x-hidden transition-colors duration-500">
      <LiquidEffectAnimation theme={theme as "light" | "dark"} />

      {/* Parallax Background Shapes */}
      <motion.div
        style={{ y: backgroundShape1Y, opacity: 0.15 }}
        className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl -z-10"
      />
      <motion.div
        style={{ y: backgroundShape2Y, opacity: 0.15 }}
        className="absolute top-96 right-10 w-96 h-96 bg-primary rounded-full blur-3xl -z-10"
      />

      {/* Animated Navbar */}
      <motion.header
        style={{
          width: navWidth,
          top: navTop,
          borderRadius: navRadius,
          borderColor: navBorder,
        }}
        className="fixed left-1/2 -translate-x-1/2 z-50 border glass-mist max-w-6xl shadow-sm overflow-hidden"
      >
        <div className="container flex h-16 items-center justify-between px-3 md:px-8 mx-auto">
          <div className="flex items-center font-bold">
            <span className="font-display tracking-tight text-primary text-lg md:text-2xl">
              <span className="hidden sm:inline">Open Algorithms</span>
              <span className="sm:inline hidden absolute text-transparent">OA</span> {/* Accessible hide */}
              <span className="sm:hidden" aria-hidden="true">OA</span>
            </span>
          </div>

          <nav className="flex items-center gap-3 sm:gap-8 text-xs sm:text-base font-medium">
            <Link to="/algorithms/bubble-sort" className="text-primary/80 hover:text-primary transition-colors">Sorting</Link>
            <Link to="/algorithms/binary-search" className="text-primary/80 hover:text-primary transition-colors">Searching</Link>
            <Link to="/algorithms/bfs" className="text-primary/80 hover:text-primary transition-colors">Graphs</Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" className="text-primary hover:bg-primary/10 px-4 rounded-full font-bold">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <LogoDropdown />
          </div>
        </div>
      </motion.header>

      <main className="flex-1 pt-24 md:pt-16">
        {/* Hero Section */}
        <section className="min-h-[90vh] flex flex-col items-center justify-center px-4 md:px-8 text-center space-y-8 max-w-5xl mx-auto relative z-10">
          <motion.div
            style={{ y: heroTextY }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[1.1] text-primary">
              Algorithm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-mist italic font-display">
                Visualizer
              </span>
            </h1>
            <p className="text-base md:text-lg text-primary/60 font-mono tracking-wide uppercase">
              Free &amp; Interactive — Sorting · Searching · Graphs
            </p>

            <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-body">
              Visualize sorting algorithms like Bubble Sort, Quick Sort, and Merge Sort. Step through Binary Search, Linear Search, BFS, and DFS with real-time animations. The best free <strong className="text-primary/80">algorithm visualizer</strong> for students and developers.
            </p>
          </motion.div>

          <motion.div
            style={{ y: heroButtonsY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <SignedIn>
              <Button
                size="lg"
                className="h-14 px-8 text-lg btn-primary-slate cursor-pointer"
                onClick={handleVisualizerClick}
              >
                Launch Visualizer <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg btn-primary-slate cursor-pointer"
                >
                  Launch Visualizer <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </SignInButton>
            </SignedOut>
          </motion.div>
        </section>

        {/* Features Grid */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-32 relative z-20"
        >
          <div className="container px-4 md:px-8 mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">Free DSA Visualizer — Interactive Algorithm Animations</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Master data structures and algorithms with our free interactive visualizer. Watch sorting, searching, and graph algorithms execute step by step with full playback control.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<BarChart3 className="h-8 w-8 text-primary" />}
                title="Sorting Algorithm Visualizer"
                description="Visualize Bubble Sort, Selection Sort, Insertion Sort, Quick Sort, and Merge Sort animations. Watch comparisons, swaps, and partitions happen step by step with adjustable speed."
                link="/algorithms/bubble-sort"
                delay={0.2}
              />
              <FeatureCard
                icon={<Search className="h-8 w-8 text-primary" />}
                title="Search Algorithm Visualizer"
                description="Step through Linear Search and Binary Search in real time. See how Binary Search divides a sorted array in half at each step — O(log n) vs O(n) visualized."
                link="/algorithms/linear-search"
                delay={0.3}
              />
              <FeatureCard
                icon={<Network className="h-8 w-8 text-primary" />}
                title="Graph Algorithm Visualizer — BFS & DFS"
                description="Watch Breadth First Search explore level by level and Depth First Search dive deep before backtracking. Interactive graph traversal with queue and stack animations."
                link="/algorithms/bfs"
                delay={0.4}
              />
            </div>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-32 container px-4 md:px-8 mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-primary">Your Path to Mastery</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We engineered an environment that strips away complexity. You aren't just a spectator; you dictate the pace, manipulate the inputs, and directly observe the mechanical elegance of computation.
              </p>

              <div className="space-y-6">
                <StepItem
                  number="01"
                  title="Isolate the Mechanism"
                  description="Handpick from an elite arsenal of industry-standard sorting, searching, and graph-traversal architectures."
                />
                <StepItem
                  number="02"
                  title="Inject the Payload"
                  description="Deploy curated datasets or inject your own extreme edge cases to push the algorithm's boundaries to the absolute limit."
                />
                <StepItem
                  number="03"
                  title="Take Command"
                  description="Dictate the timeline. Play, pause, micro-step, and accelerate execution speed to forge profound neurological connections."
                />
              </div>
            </div>
            <div className="flex-1 relative w-full mt-12 md:mt-0">
              <motion.div
                style={{ y: howItWorksCardY }}
                className="neumorphic-card p-8 w-full max-w-md mx-auto aspect-square flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="h-8 w-3/4 neumorphic-inset rounded-full" />
                  <div className="h-32 neumorphic-inset rounded-2xl" />
                  <div className="flex gap-4">
                    <div className="h-10 w-24 neumorphic-inset rounded-full" />
                    <div className="h-10 w-10 neumorphic-inset rounded-full" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-32 container px-4 md:px-8 mx-auto text-center"
        >
          <div className="max-w-3xl mx-auto space-y-8 neumorphic-card p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary">Ready to Think Like a Machine?</h2>
            <p className="text-xl text-muted-foreground">
              Join the elite tier of developers leveraging Open Algorithms to dissect, understand, and dominate intricate computational paradigms.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <SignedIn>
                <Button
                  size="lg"
                  className="h-14 px-10 text-lg btn-primary-slate cursor-pointer"
                  onClick={handleVisualizerClick}
                >
                  Initialize System
                </Button>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    size="lg"
                    className="h-14 px-10 text-lg btn-primary-slate cursor-pointer"
                  >
                    Initialize System
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </motion.section>
        {/* SEO Content Section — keyword-rich, interlinked */}
        <section id="learn-algorithms" className="py-24 container px-4 md:px-8 mx-auto border-t border-border/50">
          <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-primary">Free Algorithm Visualizer — Learn Sorting, Searching & Graph Algorithms Online</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Open Algorithms is the best free <strong>algorithm visualizer</strong> for students, developers, and anyone preparing for coding interviews. Our interactive <strong>DSA visualizer</strong> lets you step through sorting algorithms, searching algorithms, and graph traversal algorithms with real-time animations and full speed control.
            </p>
            <p className="text-lg text-muted-foreground mb-12">
              Whether you're studying for a data structures and algorithms exam, preparing for FAANG interviews, or just want to understand how algorithms work visually — Open Algorithms is built for you. No downloads, no payments — just open your browser and start learning.
            </p>

            <div className="grid gap-12">
              {/* Bubble Sort */}
              <div id="bubble-sort">
                <h3 className="text-2xl font-bold mb-4 text-primary">
                  <Link to="/algorithms/bubble-sort" className="hover:underline">Bubble Sort Visualization — How Bubble Sort Works</Link>
                </h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Bubble Sort</strong> is one of the simplest sorting algorithms. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, meaning the list is sorted.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our <strong>bubble sort visualizer</strong> lets you control the animation speed and watch each comparison and swap happen in real time. It's the perfect starting point for understanding sorting algorithms and Big O notation.
                </p>
                <p className="text-muted-foreground">
                  <strong>Time Complexity:</strong> O(n²) worst/average case, O(n) best case (already sorted). <strong>Space Complexity:</strong> O(1). Bubble Sort is a stable, in-place comparison sort.
                </p>
              </div>

              {/* Selection Sort */}
              <div id="selection-sort">
                <h3 className="text-2xl font-bold mb-4 text-primary">
                  <Link to="/algorithms/selection-sort" className="hover:underline">Selection Sort Visualization — How Selection Sort Works</Link>
                </h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Selection Sort</strong> works by repeatedly finding the minimum element from the unsorted portion and placing it at the beginning. It divides the array into a sorted and unsorted region, growing the sorted region one element at a time.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our <strong>selection sort visualizer</strong> highlights the current minimum and the comparison process so you can see exactly why selection sort makes fewer swaps than bubble sort.
                </p>
                <p className="text-muted-foreground">
                  <strong>Time Complexity:</strong> O(n²) in all cases. <strong>Space Complexity:</strong> O(1). Selection Sort minimizes the number of swaps to O(n).
                </p>
              </div>

              {/* Insertion Sort */}
              <div id="insertion-sort">
                <h3 className="text-2xl font-bold mb-4 text-primary">
                  <Link to="/algorithms/insertion-sort" className="hover:underline">Insertion Sort Visualization — How Insertion Sort Works</Link>
                </h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Insertion Sort</strong> builds the final sorted array one element at a time. It takes each element from the input and inserts it into the correct position among the already-sorted elements, shifting larger elements to the right.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our <strong>insertion sort visualizer</strong> shows each insertion step clearly. Insertion sort is efficient for small datasets and nearly-sorted arrays, making it useful in practice as a component of hybrid algorithms like Timsort.
                </p>
                <p className="text-muted-foreground">
                  <strong>Time Complexity:</strong> O(n²) worst case, O(n) best case. <strong>Space Complexity:</strong> O(1). A stable, in-place, adaptive sorting algorithm.
                </p>
              </div>

              {/* Quick Sort */}
              <div id="quick-sort">
                <h3 className="text-2xl font-bold mb-4 text-primary">
                  <Link to="/algorithms/quick-sort" className="hover:underline">Quick Sort Visualization — How Quick Sort Works</Link>
                </h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Quick Sort</strong> is a highly efficient divide-and-conquer sorting algorithm. It works by selecting a pivot element and partitioning the array so elements smaller than the pivot come before it and larger elements come after. This partitioning is then applied recursively.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our <strong>quick sort visualizer</strong> animates pivot selection, partitioning, and recursive calls so you can understand why Quick Sort is the default sorting algorithm in many programming languages.
                </p>
                <p className="text-muted-foreground">
                  <strong>Time Complexity:</strong> O(n log n) average, O(n²) worst case. <strong>Space Complexity:</strong> O(log n). Quick Sort is typically faster than Merge Sort in practice due to better cache performance.
                </p>
              </div>

              {/* Merge Sort */}
              <div id="merge-sort">
                <h3 className="text-2xl font-bold mb-4 text-primary">
                  <Link to="/algorithms/merge-sort" className="hover:underline">Merge Sort Visualization — How Merge Sort Works</Link>
                </h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Merge Sort</strong> is a classic divide-and-conquer algorithm. It splits the array in half, recursively sorts each half, and then merges the two sorted halves back together in the correct order.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our <strong>merge sort visualization</strong> breaks down each split and merge step so you can follow exactly how the sorted array is constructed. It's the best way to understand divide-and-conquer thinking.
                </p>
                <p className="text-muted-foreground">
                  <strong>Time Complexity:</strong> O(n log n) guaranteed in all cases. <strong>Space Complexity:</strong> O(n). Merge Sort is stable and predictable — ideal when worst-case guarantees matter.
                </p>
              </div>

              {/* Linear Search */}
              <div id="linear-search">
                <h3 className="text-2xl font-bold mb-4 text-primary">
                  <Link to="/algorithms/linear-search" className="hover:underline">Linear Search Visualization — How Linear Search Works</Link>
                </h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Linear Search</strong> (also called sequential search) is the simplest search algorithm. It checks each element in a list one by one from the beginning until the target value is found or the end of the list is reached.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our <strong>linear search visualizer</strong> shows exactly which elements are being compared at each step, helping you understand why this O(n) algorithm is slow for large datasets but simple and works on unsorted data.
                </p>
                <p className="text-muted-foreground">
                  <strong>Time Complexity:</strong> O(n). <strong>Space Complexity:</strong> O(1). Linear Search requires no preprocessing and works on any array — sorted or unsorted.
                </p>
              </div>

              {/* Binary Search */}
              <div id="binary-search">
                <h3 className="text-2xl font-bold mb-4 text-primary">
                  <Link to="/algorithms/binary-search" className="hover:underline">Binary Search Visualization — How Binary Search Works</Link>
                </h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Binary Search</strong> is one of the most efficient search algorithms. It works on <strong>sorted arrays</strong> by repeatedly dividing the search interval in half. If the target is less than the middle element, search the left half; otherwise, search the right half.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our <strong>binary search visualizer</strong> shows the low, mid, and high pointers updating in real time so you can see exactly why it's exponentially faster than <Link to="/algorithms/linear-search" className="text-primary hover:underline">linear search</Link>.
                </p>
                <p className="text-muted-foreground">
                  <strong>Time Complexity:</strong> O(log n). <strong>Space Complexity:</strong> O(1) iterative, O(log n) recursive. Binary Search is used in databases, dictionaries, and as a building block in many algorithms.
                </p>
              </div>

              {/* BFS */}
              <div id="bfs">
                <h3 className="text-2xl font-bold mb-4 text-primary">
                  <Link to="/algorithms/bfs" className="hover:underline">BFS Visualization — How Breadth First Search Works</Link>
                </h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Breadth First Search (BFS)</strong> is a graph traversal algorithm that explores all neighbors of a node before moving to the next level. It uses a <strong>queue</strong> data structure (FIFO) to track which nodes to visit next.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our <strong>BFS visualizer</strong> animates the traversal level by level, making it easy to understand how BFS finds the <strong>shortest path</strong> in unweighted graphs. Watch the queue grow and shrink in real time.
                </p>
                <p className="text-muted-foreground">
                  <strong>Time Complexity:</strong> O(V + E). <strong>Space Complexity:</strong> O(V). BFS is used in shortest path algorithms, social network analysis, web crawlers, and GPS navigation.
                </p>
              </div>

              {/* DFS */}
              <div id="dfs">
                <h3 className="text-2xl font-bold mb-4 text-primary">
                  <Link to="/algorithms/dfs" className="hover:underline">DFS Visualization — How Depth First Search Works</Link>
                </h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Depth First Search (DFS)</strong> is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a <strong>stack</strong> (or recursion) to keep track of the current path.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our <strong>DFS visualizer</strong> shows how the algorithm dives deep into one path before exploring others — helping you understand <strong>recursion, backtracking, and stack-based traversal</strong> clearly.
                </p>
                <p className="text-muted-foreground">
                  <strong>Time Complexity:</strong> O(V + E). <strong>Space Complexity:</strong> O(V). DFS is used in maze solving, topological sorting, cycle detection, and strongly connected components.
                </p>
              </div>

              {/* Comparison Table — highly keyword-rich, Google loves tables */}
              <div id="algorithm-comparison">
                <h3 className="text-2xl font-bold mb-6 text-primary">Sorting Algorithm Comparison — Time & Space Complexity</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="p-3 font-bold text-primary">Algorithm</th>
                        <th className="p-3 font-bold text-primary">Best Case</th>
                        <th className="p-3 font-bold text-primary">Average Case</th>
                        <th className="p-3 font-bold text-primary">Worst Case</th>
                        <th className="p-3 font-bold text-primary">Space</th>
                        <th className="p-3 font-bold text-primary">Stable?</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border/50"><td className="p-3"><Link to="/algorithms/bubble-sort" className="text-primary hover:underline">Bubble Sort</Link></td><td className="p-3">O(n)</td><td className="p-3">O(n²)</td><td className="p-3">O(n²)</td><td className="p-3">O(1)</td><td className="p-3">Yes</td></tr>
                      <tr className="border-b border-border/50"><td className="p-3"><Link to="/algorithms/selection-sort" className="text-primary hover:underline">Selection Sort</Link></td><td className="p-3">O(n²)</td><td className="p-3">O(n²)</td><td className="p-3">O(n²)</td><td className="p-3">O(1)</td><td className="p-3">No</td></tr>
                      <tr className="border-b border-border/50"><td className="p-3"><Link to="/algorithms/insertion-sort" className="text-primary hover:underline">Insertion Sort</Link></td><td className="p-3">O(n)</td><td className="p-3">O(n²)</td><td className="p-3">O(n²)</td><td className="p-3">O(1)</td><td className="p-3">Yes</td></tr>
                      <tr className="border-b border-border/50"><td className="p-3"><Link to="/algorithms/quick-sort" className="text-primary hover:underline">Quick Sort</Link></td><td className="p-3">O(n log n)</td><td className="p-3">O(n log n)</td><td className="p-3">O(n²)</td><td className="p-3">O(log n)</td><td className="p-3">No</td></tr>
                      <tr className="border-b border-border/50"><td className="p-3"><Link to="/algorithms/merge-sort" className="text-primary hover:underline">Merge Sort</Link></td><td className="p-3">O(n log n)</td><td className="p-3">O(n log n)</td><td className="p-3">O(n log n)</td><td className="p-3">O(n)</td><td className="p-3">Yes</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* FAQ Section — matches JSON-LD schema for rich results */}
            <div className="mt-20">
              <h3 className="text-2xl font-bold mb-8 text-primary">Frequently Asked Questions About Algorithm Visualization</h3>
              <div className="grid gap-6">
                <details className="group neumorphic-card p-6 rounded-xl cursor-pointer">
                  <summary className="font-bold text-primary text-lg list-none flex justify-between items-center">What is an algorithm visualizer?<span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span></summary>
                  <p className="text-muted-foreground mt-4">An algorithm visualizer is an interactive web tool that shows how algorithms work through real-time animations. Open Algorithms lets you visualize sorting algorithms (Bubble Sort, Quick Sort, Merge Sort, Selection Sort, Insertion Sort), searching algorithms (Binary Search, Linear Search), and graph algorithms (BFS, DFS) step by step with adjustable speed and custom inputs. It's the best way to learn data structures and algorithms visually.</p>
                </details>
                <details className="group neumorphic-card p-6 rounded-xl cursor-pointer">
                  <summary className="font-bold text-primary text-lg list-none flex justify-between items-center">Which sorting algorithm is the fastest?<span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span></summary>
                  <p className="text-muted-foreground mt-4">For general-purpose sorting, <Link to="/algorithms/quick-sort" className="text-primary hover:underline">Quick Sort</Link> and <Link to="/algorithms/merge-sort" className="text-primary hover:underline">Merge Sort</Link> are the fastest with O(n log n) average time complexity. Quick Sort is typically faster in practice due to better cache performance, while Merge Sort guarantees O(n log n) in all cases. <Link to="/algorithms/bubble-sort" className="text-primary hover:underline">Bubble Sort</Link>, <Link to="/algorithms/selection-sort" className="text-primary hover:underline">Selection Sort</Link>, and <Link to="/algorithms/insertion-sort" className="text-primary hover:underline">Insertion Sort</Link> are O(n²) and slower for large datasets.</p>
                </details>
                <details className="group neumorphic-card p-6 rounded-xl cursor-pointer">
                  <summary className="font-bold text-primary text-lg list-none flex justify-between items-center">What is the difference between BFS and DFS?<span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span></summary>
                  <p className="text-muted-foreground mt-4"><Link to="/algorithms/bfs" className="text-primary hover:underline">BFS (Breadth First Search)</Link> explores a graph level by level using a queue, visiting all neighbors before going deeper. <Link to="/algorithms/dfs" className="text-primary hover:underline">DFS (Depth First Search)</Link> explores as far as possible along each branch before backtracking, using a stack. BFS finds the shortest path in unweighted graphs; DFS is better for topological sorting and cycle detection. Both run in O(V + E) time.</p>
                </details>
                <details className="group neumorphic-card p-6 rounded-xl cursor-pointer">
                  <summary className="font-bold text-primary text-lg list-none flex justify-between items-center">When should I use Binary Search vs Linear Search?<span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span></summary>
                  <p className="text-muted-foreground mt-4">Use <Link to="/algorithms/binary-search" className="text-primary hover:underline">Binary Search</Link> when your data is <strong>sorted</strong> — it runs in O(log n) time, making it exponentially faster for large datasets. Use <Link to="/algorithms/linear-search" className="text-primary hover:underline">Linear Search</Link> when data is unsorted or the dataset is small — it runs in O(n) but requires no preprocessing.</p>
                </details>
                <details className="group neumorphic-card p-6 rounded-xl cursor-pointer">
                  <summary className="font-bold text-primary text-lg list-none flex justify-between items-center">Is Open Algorithms free?<span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span></summary>
                  <p className="text-muted-foreground mt-4">Yes! Open Algorithms is completely free. You can visualize all sorting, searching, and graph algorithms with no payment required. Sign in to save your progress and use the AI-powered algorithm chatbot for explanations.</p>
                </details>
                <details className="group neumorphic-card p-6 rounded-xl cursor-pointer">
                  <summary className="font-bold text-primary text-lg list-none flex justify-between items-center">What algorithms does Open Algorithms support?<span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span></summary>
                  <p className="text-muted-foreground mt-4">We support 9 algorithms across 3 categories: <strong>Sorting</strong> — <Link to="/algorithms/bubble-sort" className="text-primary hover:underline">Bubble Sort</Link>, <Link to="/algorithms/selection-sort" className="text-primary hover:underline">Selection Sort</Link>, <Link to="/algorithms/insertion-sort" className="text-primary hover:underline">Insertion Sort</Link>, <Link to="/algorithms/quick-sort" className="text-primary hover:underline">Quick Sort</Link>, <Link to="/algorithms/merge-sort" className="text-primary hover:underline">Merge Sort</Link>. <strong>Searching</strong> — <Link to="/algorithms/linear-search" className="text-primary hover:underline">Linear Search</Link>, <Link to="/algorithms/binary-search" className="text-primary hover:underline">Binary Search</Link>. <strong>Graphs</strong> — <Link to="/algorithms/bfs" className="text-primary hover:underline">BFS</Link>, <Link to="/algorithms/dfs" className="text-primary hover:underline">DFS</Link>.</p>
                </details>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-border bg-background">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-display font-bold text-xl text-primary">Open Algorithms</span>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <Link to="/achyuth-privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <p className="text-sm text-muted-foreground">
                © 2026 Open Algorithms. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, link, delay }: { icon: React.ReactNode, title: string, description: string, link: string, delay: number }) {
  return (
    <Link to={link} className="group block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="neumorphic-card p-8 h-full flex flex-col hover:scale-[1.02] active:scale-95"
      >
        <div className="mb-6 p-4 neumorphic-inset rounded-full w-fit">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-3 font-display text-primary">{title}</h3>
        <p className="text-muted-foreground leading-relaxed flex-1 font-body">
          {description}
        </p>
        <div className="mt-6 flex items-center text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
          Explore <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </motion.div>
    </Link>
  );
}

function StepItem({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="neumorphic-inset w-16 h-16 rounded-full flex items-center justify-center shrink-0">
        <span className="font-display text-xl font-bold text-primary">{number}</span>
      </div>
      <div className="pt-2">
        <h3 className="text-xl font-bold mb-2 text-primary">{title}</h3>
        <p className="text-muted-foreground font-body">{description}</p>
      </div>
    </div>
  );
}