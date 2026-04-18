import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto space-y-8 mt-12">
        <Link to="/" className="inline-flex items-center text-primary/80 hover:text-primary transition-colors mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold font-display text-primary mb-6">Privacy Policy</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>

          <p>
            Welcome to Open Algorithms. Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information when you use our website at <a href="https://openalgorithms.vercel.app/">openalgorithms.vercel.app</a>.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">1. Information We Collect</h2>
          <p>When you use Open Algorithms, we may collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account Information:</strong> If you create an account, we collect your email address and profile information (such as name or profile picture) provided via our authentication provider (Clerk).</li>
            <li><strong>Usage Data:</strong> We automatically collect certain information when you visit, use, or navigate the site. This may include your IP address, browser type, device type, operating system, and data about how you interact with our application (e.g., algorithms visualized, settings changed).</li>
            <li><strong>Chat Data:</strong> If you use our AI chat feature, the messages you send are processed by our backend and third-party AI services providers (Google Gemini) to provide responses.</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect or receive to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Facilitate account creation and authentication and otherwise manage user accounts.</li>
            <li>Provide, operate, and maintain our application.</li>
            <li>Improve, personalize, and expand our services through features and algorithms.</li>
            <li>Understand and analyze how you use our platform to develop new products, services, features, and functionality.</li>
            <li>Communicate with you regarding updates, security alerts, and support messages.</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">3. Third-Party Services</h2>
          <p>We rely on several third-party services to operate Open Algorithms:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Authentication:</strong> We use Clerk (<a href="https://clerk.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>) to manage user authentication safely and securely.</li>
            <li><strong>Hosting:</strong> Our frontend is hosted on Vercel (<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a>).</li>
            <li><strong>Database:</strong> We use MongoDB to securely store user data, chat history, and application state.</li>
            <li><strong>AI Features:</strong> We use Google's Gemini API for our AI assistant. Please note that data sent to the AI might be processed according to Google's data privacy standards.</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">5. Children's Privacy</h2>
          <p>
            Our services are not directed to children under 13 (or under 16 in some jurisdictions). We do not knowingly collect personal information from children. Make sure to consult the specific age requirements in your region before using the application.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">6. Changes to this Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this policy.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">7. Contact Us</h2>
          <p>
            If you have questions or comments about this policy, you can reach out via our GitHub repository or through the contact methods provided on our website.
          </p>
        </div>
      </div>
    </div>
  );
}
