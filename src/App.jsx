import { useState, useEffect } from 'react';
import { Terminal, Film, Code2, Scissors, MonitorPlay, ExternalLink, Mail, Camera } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { motion } from 'framer-motion';
import CustomCursor from './CustomCursor';
import './Contact.css';
import heroImg from './assets/hero.jpeg';
import './App.css';

function App() {
  const [typedText, setTypedText] = useState('');
  const fullText = "Software Engineer";
  
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="app-container">
      <CustomCursor />
      <nav className="navbar">
        <motion.div 
          className="nav-logo text-gradient"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1, textShadow: "0 0 8px rgba(0,240,255,0.8)" }}
        >
          SV.
        </motion.div>
        <motion.div 
          className="nav-links"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <motion.a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              whileHover={{ scale: 1.1, color: "var(--accent-cyan)" }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.a>
          ))}
        </motion.div>
      </nav>

      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <div className="hero-text-side">
            <motion.div 
              className="hero-subtitle mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <Terminal size={16} /> console.log("Hello, World!");
            </motion.div>
            
            <motion.h1 
              className="hero-title"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
              I'm <span className="glitch-effect" data-text="Soham Vora">Soham Vora</span>
            </motion.h1>
            
            <motion.div 
              className="hero-roles"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="mono" style={{ color: 'var(--accent-cyan)' }}>
                <span className="glow-cyan">{typedText}</span>
                <span style={{ animation: 'blink 1s step-end infinite', borderRight: '2px solid var(--accent-cyan)' }}></span>
              </div>

            </motion.div>
            
            <motion.div 
              className="hero-cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <motion.a 
                href="#projects" 
                className="btn btn-primary"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(0, 240, 255, 0.6)" }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
              <motion.a 
                href="#contact" 
                className="btn btn-secondary"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(189, 0, 255, 0.6)" }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </motion.div>
          </div>

          <motion.div 
            className="hero-image-side"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 80, delay: 0.2 }}
          >
            <div className="hero-image-wrapper">
              <img src={heroImg} alt="Soham Vora" className="hero-img" />
              
              <motion.div 
                className="floating-icon icon-cyan"
                animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Code2 size={24} />
              </motion.div>
              

            </div>
          </motion.div>

        </div>
      </section>

      <motion.section 
        id="about" 
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeInUp} className="section-header">
          <Code2 size={32} /> About Me
        </motion.h2>
        
        <div className="about-bento-grid">
          <motion.div 
            className="glass-panel bento-card bio-card"
            variants={fadeInUp}
            whileHover={{ y: -5, boxShadow: "0px 15px 35px rgba(0,0,0,0.4)" }}
          >
            <span className="highlight text-gradient">
              Precision meets Creativity.
            </span>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.8' }}>
              I'm a B.Tech student with a passion for writing clean, efficient code and building scalable software.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
              I believe that strong engineering principles and logical architecture are the foundation of unforgettable digital experiences.
            </p>
          </motion.div>

          <motion.div 
            className="glass-panel bento-card dev-card"
            variants={fadeInUp}
            whileHover={{ x: -5, boxShadow: "-10px 10px 30px rgba(0,240,255,0.1)", borderColor: "var(--accent-cyan)" }}
          >
            <h3><Terminal size={24} className="glow-cyan" /> Logic & Engineering</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Debugging complex software architecture and building scalable, responsive web applications that perform flawlessly under the hood.
            </p>
          </motion.div>


        </div>
      </motion.section>

      <motion.section 
        id="skills" 
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeInUp} className="section-header">
          <Terminal size={32} /> Technical Arsenal
        </motion.h2>
        <div className="skills-grid">
          <motion.div 
            variants={fadeInUp}
            className="glass-panel" 
            style={{ padding: '2rem' }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="skill-category-title glow-cyan" style={{ animation: 'float 6s ease-in-out infinite' }}>
              <Code2 size={24} /> Software Development
            </h3>
            <div className="skill-list">
              {['JavaScript / TS', 'React.js', 'Node.js', 'Python', 'C++', 'Git', 'TailwindCSS'].map((skill) => (
                <motion.span 
                  key={skill} 
                  className="skill-tag dev mono"
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={0.5}
                  whileDrag={{ scale: 1.2, zIndex: 10, cursor: 'grabbing' }}
                  whileHover={{ scale: 1.1, y: -5, borderColor: "var(--accent-cyan)", boxShadow: "0px 5px 15px rgba(0,240,255,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>


        </div>
      </motion.section>

      <motion.section 
        id="projects" 
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeInUp} className="section-header">
          <MonitorPlay size={32} /> Featured Work
        </motion.h2>
        <div className="projects-grid">
          {/* Software Project */}
          <motion.div 
            variants={fadeInUp}
            className="glass-panel project-card" 
            style={{ borderTop: '4px solid var(--accent-cyan)' }}
            whileHover={{ y: -10, boxShadow: "0px 20px 30px rgba(0,0,0,0.5), 0px 0px 15px rgba(0,240,255,0.1)" }}
          >
            <div className="project-type dev mono">Software Engineering</div>
            <h3 className="project-title">NovaTix - Ticket Booking</h3>
            <p className="project-desc">
              A comprehensive online ticket booking platform featuring a sleek UI, responsive design, and seamless user experience for booking event tickets.
            </p>
            <div>
              <motion.a 
                href="https://novatix-booking.vercel.app/" 
                target="_blank" 
                rel="noreferrer" 
                className="project-link"
                whileHover={{ x: 5, color: "var(--accent-cyan)" }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={16} /> View Live App
              </motion.a>
            </div>
          </motion.div>

          {/* Placeholder for future coding project */}
          <motion.div 
            variants={fadeInUp}
            className="glass-panel project-card" 
            style={{ borderTop: '4px solid var(--accent-cyan)', opacity: 0.7 }}
            whileHover={{ y: -10, opacity: 1, boxShadow: "0px 20px 30px rgba(0,0,0,0.5), 0px 0px 15px rgba(0,240,255,0.1)" }}
          >
            <div className="project-type dev mono">Software Engineering</div>
            <h3 className="project-title">Algorithm Visualizer</h3>
            <p className="project-desc">
              Interactive visualization tool for common sorting and pathfinding algorithms built with React and Canvas API.
            </p>
            <div>
              <motion.a 
                href="#" 
                className="project-link"
                whileHover={{ x: 5, color: "var(--accent-cyan)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Code2 size={16} /> View Source
              </motion.a>
            </div>
          </motion.div>


        </div>
      </motion.section>

      <motion.footer 
        id="contact" 
        className="footer"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className="contact-container glass-panel">
          <div className="contact-header">
            <h2>Let's Work Together</h2>
            <p>Have a project in mind or just want to say hi? I'm currently open for new opportunities.</p>
          </div>
          
          <form action="https://formsubmit.co/sohamvora0207@gmail.com" method="POST">
            <input type="hidden" name="_subject" value="New message from portfolio!" />
            <input type="hidden" name="_captcha" value="false" />
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="info@example.com" required />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Tell me about your project..." required></textarea>
            </div>
            
            <motion.button 
              type="submit" 
              className="submit-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </form>
        </div>

        <div className="contact-divider">Or connect with me directly</div>

        <div className="social-icons-wrapper">
          {[
            { id: 'Github', href: 'https://github.com/Soham-0207', label: 'GitHub' },
            { id: 'Linkedin', href: 'https://www.linkedin.com/in/soham-vora-7209b732b', label: 'LinkedIn' },
            { id: 'X', href: 'https://twitter.com', label: 'X' },
            { id: 'Mail', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=sohamvora0207@gmail.com', label: 'Mail' }
          ].map((item, idx) => {
            const Icon = item.id === 'Linkedin' ? LinkedinIcon : item.id === 'Github' ? GithubIcon : item.id === 'X' ? ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg> : Mail;
            const isMail = item.id === 'Mail';
            return (
              <motion.a 
                key={idx} 
                href={item.href}
                target={isMail ? undefined : "_blank"}
                rel={isMail ? undefined : "noopener noreferrer"}
                className="social-icon-btn"
                whileHover={{ y: -5 }}
              >
                <div className="social-icon-circle">
                  <Icon size={20} />
                </div>
                <span>{item.label}</span>
              </motion.a>
            )
          })}
        </div>
        
        <p className="mono" style={{ fontSize: '0.9rem', marginTop: '2rem' }}>
          &copy; {new Date().getFullYear()} Soham Vora. Engineered with passion.
        </p>
      </motion.footer>
    </div>
  );
}

export default App;
