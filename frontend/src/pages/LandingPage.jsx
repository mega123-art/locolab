import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-red-600">LocoLab</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-red-600 transition-colors">Home</a>
              <a href="#about" className="text-gray-700 hover:text-red-600 transition-colors">About Us</a>
              <a href="#features" className="text-gray-700 hover:text-red-600 transition-colors">Features</a>
              <a href="#contact" className="text-gray-700 hover:text-red-600 transition-colors">Contact</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/signin" className="btn btn-outline btn-sm">Sign In</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 bg-gradient-to-br from-red-50 via-white to-red-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gray-900">The Marketplace Where</span>
              <br />
              <span className="text-red-600 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                Influence Meets
              </span>
              <br />
              <span className="text-gray-900">Local Impact</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect brands with authentic local content creators. Build meaningful partnerships 
              that drive real engagement and create lasting impact in communities across India.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/signup" className="btn btn-primary btn-lg transform hover:scale-105 transition-transform">
                🎨 Join as Creator
              </Link>
              <Link to="/signup" className="btn btn-secondary btn-lg transform hover:scale-105 transition-transform">
                🏢 Partner as Brand
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-red-600 mb-2">1000+</div>
                <div className="text-gray-600 font-medium">Active Creators</div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-red-600 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Brand Partners</div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-red-600 mb-2">50+</div>
                <div className="text-gray-600 font-medium">Cities Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-red-600">LocoLab</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We bridge the gap between brands and local influencers with cutting-edge technology 
              and deep market insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Feature 1 - Local Discovery */}
            <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                Local Discovery
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Find authentic creators in specific cities and regions. Target your campaigns 
                with precision and connect with audiences that matter most to your brand.
              </p>
              <div className="mt-6 flex items-center text-red-600 font-medium text-sm group-hover:text-red-700">
                <span>Explore Creators</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Feature 2 - Smart Analytics */}
            <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                Smart Analytics
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Access detailed creator metrics, engagement rates, and performance data 
                to make informed partnership decisions backed by real insights.
              </p>
              <div className="mt-6 flex items-center text-red-600 font-medium text-sm group-hover:text-red-700">
                <span>View Analytics</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Feature 3 - Flexible Rewards */}
            <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                Flexible Rewards
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Choose between monetary compensation or product barter systems. 
                Create campaigns that work perfectly for your budget and goals.
              </p>
              <div className="mt-6 flex items-center text-red-600 font-medium text-sm group-hover:text-red-700">
                <span>Setup Rewards</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Feature 4 - Curated Network */}
            <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                Curated Network
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Work with verified creators who have been vetted for quality, 
                authenticity, and professional standards. Quality guaranteed.
              </p>
              <div className="mt-6 flex items-center text-red-600 font-medium text-sm group-hover:text-red-700">
                <span>Browse Network</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Feature 5 - Quick Campaigns */}
            <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                Quick Campaigns
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Launch campaigns in minutes, not weeks. Our streamlined process 
                gets your brand message to market faster than ever before.
              </p>
              <div className="mt-6 flex items-center text-red-600 font-medium text-sm group-hover:text-red-700">
                <span>Create Campaign</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Feature 6 - Secure Platform */}
            <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                Secure Platform
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Built with enterprise-grade security. Your data, campaigns, 
                and creator relationships are protected at every step of the journey.
              </p>
              <div className="mt-6 flex items-center text-red-600 font-medium text-sm group-hover:text-red-700">
                <span>Learn Security</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Additional Features Row */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Feature 7 - Real-time Collaboration */}
            <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                Real-time Collaboration
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Communicate directly with creators through our built-in messaging system. 
                Share briefs, feedback, and collaborate seamlessly on campaign content.
              </p>
            </div>

            {/* Feature 8 - Performance Tracking */}
            <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                Performance Tracking
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Monitor campaign performance with detailed analytics and ROI tracking. 
                Get insights that help you optimize future collaborations and maximize impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About <span className="text-red-600">LocoLab</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              LocoLab is revolutionizing how brands connect with local content creators across India. 
              We believe that authentic, location-based influence drives the most meaningful engagement 
              and creates lasting impact in communities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
              <div className="text-left">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 mb-6">
                  To democratize influencer marketing by connecting brands with authentic local voices. 
                  We empower creators to monetize their influence while helping brands reach their 
                  target audiences with genuine, location-specific content.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Authentic local connections
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Data-driven partnerships
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Transparent collaboration
                  </li>
                </ul>
              </div>
              
              <div className="text-left">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 mb-6">
                  To become India's leading platform for local influencer marketing, where every 
                  brand can find the perfect creator match and every creator can build a sustainable 
                  business from their passion and local expertise.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Nationwide creator network
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    AI-powered matching
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Community-driven growth
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Join thousands of brands and creators who are already building meaningful 
            partnerships through LocoLab.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn bg-white text-red-600 hover:bg-gray-100 btn-lg transform hover:scale-105 transition-all">
              Get Started Today
            </Link>
            <a href="#contact" className="btn border-2 border-white text-white hover:bg-white hover:text-red-600 btn-lg transform hover:scale-105 transition-all">
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
              <p className="text-xl text-gray-600">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-6 h-6 text-red-600 mt-1 mr-4">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Address</h4>
                      <p className="text-gray-600">123 Business District<br />Mumbai, Maharashtra 400001<br />India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-6 h-6 text-red-600 mt-1 mr-4">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-gray-600">hello@locolab.com<br />support@locolab.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-6 h-6 text-red-600 mt-1 mr-4">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Phone</h4>
                      <p className="text-gray-600">+91 98765 43210<br />+91 98765 43211</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <form className="space-y-6">
                  <div>
                    <label className="form-label">Name</label>
                    <input type="text" className="form-input" placeholder="Your full name" />
                  </div>
                  
                  <div>
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" placeholder="your.email@example.com" />
                  </div>
                  
                  <div>
                    <label className="form-label">Subject</label>
                    <input type="text" className="form-input" placeholder="How can we help?" />
                  </div>
                  
                  <div>
                    <label className="form-label">Message</label>
                    <textarea className="form-textarea" rows={5} placeholder="Tell us more about your inquiry..."></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-primary btn-lg w-full">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-red-500 mb-4">LocoLab</h3>
              <p className="text-gray-400 mb-4">
                The marketplace where influence meets local impact. Connecting brands with authentic local creators across India.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-red-500 transition-colors">For Creators</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">For Brands</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-red-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Press</a></li>
                <li><a href="#contact" className="hover:text-red-500 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-red-500 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LocoLab. All rights reserved. Made with ❤️ in India.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;