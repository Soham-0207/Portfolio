import { useState, useEffect } from 'react';
import { Terminal, Film, Code2, Scissors, MonitorPlay, ExternalLink, Mail, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import CustomCursor from './CustomCursor';
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
              <div className="role-separator"></div>
              <div style={{ color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <Film size={20} className="glow-purple" />
                </motion.div>
                Video & Photo Editor
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
              
              <motion.div 
                className="floating-icon icon-purple"
                animate={{ y: [0, 15, 0], rotate: [0, -10, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Film size={24} />
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
              I'm a B.Tech student with a dual passion: writing clean, efficient code and crafting compelling visual stories.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
              I believe that engineering provides the logic, and editing provides the emotion—together, they create unforgettable digital experiences.
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

          <motion.div 
            className="glass-panel bento-card edit-card"
            variants={fadeInUp}
            whileHover={{ x: -5, boxShadow: "-10px 10px 30px rgba(189,0,255,0.1)", borderColor: "var(--accent-purple)" }}
          >
            <h3><Film size={24} className="glow-purple" /> Emotion & Storytelling</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Color grading footage on a timeline and pacing edits to bring visual stories to life. Transforming raw clips into cinematic experiences.
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

          <motion.div 
            variants={fadeInUp}
            className="glass-panel" 
            style={{ padding: '2rem' }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="skill-category-title glow-purple" style={{ animation: 'float 6s ease-in-out infinite reverse' }}>
              <Scissors size={24} /> Post-Production
            </h3>
            <div className="timeline-track">
              <div style={{ paddingBottom: '1.5rem', position: 'relative' }}>
                <div className="timeline-node" style={{ borderColor: 'var(--accent-purple)', animation: 'pulse-glow 2s infinite' }}></div>
                <h4 style={{ marginBottom: '0.5rem' }}>Video Editing</h4>
                <div className="skill-list">
                  {['DaVinci Resolve', 'CapCut'].map(skill => (
                    <motion.span 
                      key={skill} 
                      className="skill-tag edit"
                      drag
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      dragElastic={0.5}
                      whileDrag={{ scale: 1.2, zIndex: 10, cursor: 'grabbing' }}
                      whileHover={{ scale: 1.1, y: -5, borderColor: "var(--accent-purple)", boxShadow: "0px 5px 15px rgba(189,0,255,0.3)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                <div className="timeline-node" style={{ borderColor: 'var(--accent-purple)', animation: 'pulse-glow 2s infinite 1s' }}></div>
                <h4 style={{ marginBottom: '0.5rem' }}>Photo Editing & Color</h4>
                <div className="skill-list">
                  {['Lightroom', 'Photoshop'].map(skill => (
                    <motion.span 
                      key={skill} 
                      className="skill-tag edit"
                      drag
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      dragElastic={0.5}
                      whileDrag={{ scale: 1.2, zIndex: 10, cursor: 'grabbing' }}
                      whileHover={{ scale: 1.1, y: -5, borderColor: "var(--accent-purple)", boxShadow: "0px 5px 15px rgba(189,0,255,0.3)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
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

          {/* Video Editing Project Placeholder */}
          <motion.div 
            variants={fadeInUp}
            className="glass-panel project-card" 
            style={{ borderTop: '4px solid var(--accent-purple)' }}
            whileHover={{ y: -10, boxShadow: "0px 20px 30px rgba(0,0,0,0.5), 0px 0px 15px rgba(189,0,255,0.1)" }}
          >
            <div className="project-type edit mono">Video Production</div>
            <h3 className="project-title">Cinematic Tech Reel</h3>
            <p className="project-desc">
              A fast-paced, highly stylized montage edited in DaVinci Resolve featuring speed ramping, motion graphics, and advanced color grading.
            </p>
            <div>
              <motion.a 
                href="#" 
                className="project-link" 
                style={{ color: 'var(--text-muted)' }}
                whileHover={{ x: 5, color: "var(--accent-purple)" }}
                whileTap={{ scale: 0.95 }}
              >
                <MonitorPlay size={16} /> Coming Soon
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
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeInUp}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#fff' }}>Let's Create Something Amazing</h2>
        <div className="social-links">
          {['Code2', 'Camera', 'Mail'].map((IconStr, idx) => {
            const Icon = IconStr === 'Code2' ? Code2 : IconStr === 'Camera' ? Camera : Mail;
            return (
              <motion.a 
                key={idx} 
                href="#"
                whileHover={{ scale: 1.2, y: -5, color: "var(--accent-cyan)", filter: "drop-shadow(0px 0px 8px rgba(0,240,255,0.8))" }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={24} />
              </motion.a>
            )
          })}
        </div>
        <p className="mono" style={{ fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Soham Vora. Engineered with passion.
        </p>
      </motion.footer>
    </div>
  );
}

export default App;
