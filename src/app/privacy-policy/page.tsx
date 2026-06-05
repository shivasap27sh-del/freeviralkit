import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy | FreeViralKit',
  description: 'Read the FreeViralKit Privacy Policy to understand how we collect, use, and protect your data while using our YouTube SEO tools.',
  openGraph: {
    title: 'Privacy Policy | FreeViralKit',
    description: 'Read the FreeViralKit Privacy Policy to understand how we collect, use, and protect your data while using our YouTube SEO tools.',
    url: buildAbsoluteUrl('/privacy-policy'),
    type: 'website',
  },
  alternates: {
    canonical: buildAbsoluteUrl('/privacy-policy'),
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto px-6 py-16 max-w-4xl min-h-screen">
      <div className="mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="text-slate-500">Last Updated: June 4, 2026</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-purple-500 hover:prose-a:text-purple-600 prose-p:text-slate-600 dark:prose-p:text-slate-400 leading-loose">
        <p>
          At FreeViralKit ("we," "our," or "us"), your privacy is of paramount importance to us. This Comprehensive Privacy Policy explains in detail how we collect, use, disclose, and safeguard your information when you visit our website at freeviralkit.com (the "Site") and use our suite of AI-powered YouTube SEO tools, including but not limited to the Title Generator, Description Generator, Hashtag Generator, Tags Generator, Channel Name Generator, Script Generator, Shorts Idea Generator, and Niche Researcher (collectively, the "Services").
        </p>

        <p>
          Please read this Privacy Policy carefully. By accessing or using our Site and Services, you signify that you have read, understood, and agree to be bound by all the terms described in this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the Site or use the Services.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We believe in data minimization. Because our Services do not require you to create an account, log in, or provide a credit card, the scope of personal information we collect is intentionally limited. However, to provide a functioning and optimized service, we do collect certain data automatically and through your direct interactions with the Site.
        </p>
        
        <h3>1.1 Information You Provide to Us</h3>
        <ul>
          <li><strong>Input Data:</strong> When you use our tools, you enter text prompts, video topics, channel niches, and keywords. We process this input data in real-time through our AI integration (such as Groq or OpenAI APIs) to generate your requested output. We do not permanently store your specific queries associated with any personal identifier.</li>
          <li><strong>Communications:</strong> If you contact us directly via email for support, business inquiries, or feedback, we will collect your name, email address, the contents of your message, and any attachments you provide.</li>
        </ul>

        <h3>1.2 Information Collected Automatically</h3>
        <ul>
          <li><strong>Log and Usage Data:</strong> Like most websites, our servers automatically record information that your browser sends whenever you visit the Site. This may include your IP address, browser type and version, device type, operating system, language preferences, the referring webpage, the pages of our Site that you visit, the time and date of your visit, and the time spent on those pages.</li>
          <li><strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and similar tracking technologies to track activity on our Site and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site. We use both session cookies (which expire when you close your browser) and persistent cookies (which stay on your device until you delete them) to understand how you interact with our Services and to improve our platform.</li>
          <li><strong>Analytics Data:</strong> We utilize third-party analytics providers (such as Google Analytics or Vercel Web Analytics) to collect and analyze information about the use of our Site. These services collect data regarding user behavior, traffic sources, and performance metrics. This data is aggregated and anonymized.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
        </p>
        <ul>
          <li><strong>Provide and Maintain the Services:</strong> To process your queries, generate AI responses, and ensure the Site functions correctly across different devices and browsers.</li>
          <li><strong>Improve and Optimize the Site:</strong> To analyze user behavior, test new features, resolve technical issues, and enhance the overall user experience.</li>
          <li><strong>Communicate with You:</strong> To respond to your emails, answer your questions, and provide customer support.</li>
          <li><strong>Monitor and Analyze Trends:</strong> To understand which tools are most popular, how users navigate the Site, and to gather demographic information about our user base as a whole.</li>
          <li><strong>Ensure Security:</strong> To detect, prevent, and address technical issues, fraud, or abuse of our API resources.</li>
          <li><strong>Compliance:</strong> To comply with applicable legal obligations, enforce our Terms of Service, and protect our rights.</li>
        </ul>

        <h2>3. Disclosure of Your Information</h2>
        <p>
          We do not sell, trade, or rent your personal identification information to third parties. We may share information we have collected about you in certain situations, as described below:
        </p>

        <h3>3.1 Third-Party Service Providers</h3>
        <p>
          We may share your information with third parties that perform services for us or on our behalf. This is necessary to operate the Site. These providers include:
        </p>
        <ul>
          <li><strong>AI and API Providers:</strong> We use third-party API providers (such as Groq Inc. or OpenAI) to process your input and generate the AI responses. The text you input is transmitted to these providers for processing. Please refer to their respective privacy policies to understand how they handle data.</li>
          <li><strong>Hosting and Infrastructure:</strong> Our Site is hosted on platforms like Vercel. These providers may have access to raw server logs and IP addresses as part of providing their infrastructure services.</li>
          <li><strong>Analytics Providers:</strong> We share aggregated, anonymized usage data with analytics partners to help us understand Site traffic and usage.</li>
        </ul>

        <h3>3.2 Legal Obligations and Rights</h3>
        <p>
          We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena. We may also disclose your information to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person, and illegal activities, or as evidence in litigation in which we are involved.
        </p>

        <h3>3.3 Business Transfers</h3>
        <p>
          We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
        </p>

        <h2>4. Advertising and Monetization</h2>
        <p>
          FreeViralKit is provided as a free service. To support the ongoing costs of hosting, API usage, and development, we may monetize the Site through advertising networks, such as Google AdSense.
        </p>
        <ul>
          <li><strong>Third-Party Advertisers:</strong> We may use third-party advertising companies to serve ads when you visit the Site. These companies may use information about your visits to our Site and other websites that are contained in web cookies in order to provide advertisements about goods and services of interest to you.</li>
          <li><strong>Google AdSense and DoubleClick Cookie:</strong> Google, as a third-party vendor, uses cookies to serve ads on our Site. Google's use of the DoubleClick cookie enables it and its partners to serve ads to our users based on their visit to our Site or other websites on the Internet. You may opt out of the use of the DoubleClick Cookie for interest-based advertising by visiting the <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google Ads Settings</a> webpage.</li>
        </ul>

        <h2>5. Data Security</h2>
        <p>
          We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          We will only retain your personal information for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements. Because we do not use a user account system, we do not retain persistent profiles of your generated content. Web server logs and analytics data are typically retained for a short period (e.g., 30 to 90 days) before being aggregated or deleted, unless required longer for security incident investigations.
        </p>

        <h2>7. Your Data Protection Rights (GDPR & CCPA)</h2>
        <p>
          Depending on your location, you may have specific rights regarding your personal information.
        </p>

        <h3>7.1 European Economic Area (EEA) and UK Residents (GDPR)</h3>
        <p>
          If you are a resident of the EEA or the UK, you have certain data protection rights under the General Data Protection Regulation (GDPR). We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data. Your rights include:
        </p>
        <ul>
          <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
          <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
          <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
          <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
          <li><strong>The right to object to processing:</strong> You have the right to object to our processing of your personal data, under certain conditions.</li>
          <li><strong>The right to data portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
        </ul>

        <h3>7.2 California Residents (CCPA)</h3>
        <p>
          If you are a California resident, the California Consumer Privacy Act (CCPA) grants you specific rights regarding your personal information:
        </p>
        <ul>
          <li><strong>The right to know:</strong> You have the right to request that we disclose what personal information we collect, use, disclose, and sell.</li>
          <li><strong>The right to delete:</strong> You have the right to request the deletion of your personal information that we collected and retained, subject to certain exceptions.</li>
          <li><strong>The right to opt-out:</strong> You have the right to opt-out of the sale of your personal information. Note that <strong>we do not sell your personal information</strong>.</li>
          <li><strong>The right to non-discrimination:</strong> You have the right not to receive discriminatory treatment for exercising your CCPA rights.</li>
        </ul>

        <p>
          To exercise any of these rights, please contact us at privacy@freeviralkit.com. Please note that because we do not require accounts, we may not be able to identify specific data associated with you based merely on an email request, but we will do our best to assist you in compliance with applicable laws.
        </p>

        <h2>8. Children's Privacy</h2>
        <p>
          Our Services are not intended for use by children under the age of 13 (or 16 in certain European jurisdictions). We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us immediately, and we will take steps to delete that information from our servers as quickly as possible.
        </p>

        <h2>9. Third-Party Websites</h2>
        <p>
          Our Site may contain links to third-party websites and applications of interest, including advertisements and external services (such as YouTube or social media platforms), that are not affiliated with us. Once you have used these links to leave our Site, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information. Before visiting and providing any information to any third-party websites, you should inform yourself of the privacy policies and practices of the third party responsible for that website.
        </p>

        <h2>10. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </p>

        <h2>11. Contact Us</h2>
        <p>
          If you have any questions, comments, or concerns about this Privacy Policy or our privacy practices, please contact us at:
        </p>
        <p>
          <strong>Email:</strong> privacy@freeviralkit.com<br />
          <strong>Website:</strong> www.freeviralkit.com/contact
        </p>
      </div>
    </main>
  );
}
