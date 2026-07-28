import { useState, useEffect, useRef, type MouseEvent } from 'react'

// ─── Data ────────────────────────────────────────────────────────────────────
const NAV_ITEMS = ['About', 'Skills', 'Exploring', 'Projects', 'Contact']

const STATS = [
  { label: 'Knowledge', value: 85, color: '#4fc3f7' },
  { label: 'Guts', value: 95, color: '#e8001d' },
  { label: 'Proficiency', value: 90, color: '#ffd600' },
  { label: 'Kindness', value: 95, color: '#81c784' },
  { label: 'Charm', value: 85, color: '#ce93d8' },
]

const SKILLS = [
  { name: 'Laravel / PHP', level: 80, tag: 'FULLSTACK / BACKEND' },
  { name: 'Code Igniter 4 (CI4)', level: 80, tag: 'FRAMEWORK' },
  { name: 'Bootstrap / HTML & CSS', level: 85, tag: 'FRONTEND' },
  { name: 'MySQL / Relational DB', level: 80, tag: 'DATABASE' },
  { name: 'UI / UX Design', level: 78, tag: 'DESIGN' },
  { name: 'IT & Network Support', level: 85, tag: 'OPERATION / SYSTEMS' },
]

const EXPLORING_SKILLS = [
  { name: 'React / Next.js', level: 55, tag: 'FRONTEND' },
  { name: 'TypeScript', level: 50, tag: 'LANGUAGE' },
  { name: 'Node.js / Express', level: 55, tag: 'BACKEND' },
  { name: 'Python', level: 60, tag: 'LANGUAGE' },
  { name: 'PostgreSQL', level: 60, tag: 'DATABASE' },
  { name: 'Three.js / WebGL', level: 50, tag: 'GRAPHICS' },
]

const PROJECTS = [
  {
    code: 'OP-01',
    name: 'Parakarsa Pendamping Co-Creation UMKM ',
    type: 'IT Support Intership',
    desc: 'Maintaining the office’s operational stability through routine maintenance, internet network repairs, and troubleshooting office hardware and software. Designing and developing interactive and responsive landing pages to support MSME mentoring and promotional programmes. Providing swift and accurate technical solutions to day-to-day IT issues to ensure the smooth running of the organisation’s entire team’s work.',
    tags: ['Bootstrap', 'HTML/JS', 'Network Troubleshooting', 'IT Infrastructure'],
    status: 'COMPLETE',
    year: '2022',
  },
  {
    code: 'OP-02',
    name: 'Fakultas Ilmu & Teknologi Kesehatan - UNJANI',
    type: 'Fullstack Web Development ',
    desc: 'Designing and developing an integrated tracking website to monitor laboratory practical sessions and fieldwork undertaken by students at the Faculty of Health Sciences (FITKES), UNJANI. Coordinating with faculty stakeholders to digitise operational monitoring workflows, thereby improving the efficiency of reporting and the accuracy of data on student activities. Resolving issues relating to the management of student activity data by designing a structured and user-friendly system interface.',
    tags: ['Full-Stack Web', 'Database Architecture', 'UI/UX Design', 'MySQL', 'CI4'],
    status: 'COMPLETE',
    year: '2025',
  },
  {
    code: 'OP-03',
    name: 'Fakultas Sains & Informatika',
    type: 'Laboratory Assistant',
    desc: 'Assisting with the operational management of practical classes, including the preparation of structured teaching materials and the assessment of student assignments. Communicating complex technical concepts clearly and interactively to dozens of students to support the smooth running of the teaching and learning process. Maintaining administrative discipline in the laboratory and ensuring that all practical session timetables run on time in accordance with the curriculum.',
    tags: ['Laboratory Assistant', 'Problem Solving', 'Communication', 'Data Analysis', 'Machine Learning', 'Game Theory'],
    status: 'COMPLETE',
    year: '2026',
  },

]

const TICKER_TEXT = [
  'FULL-STACK DEVELOPER', '✦', 'SYSTEM ARCHITECT', '✦',
  'UI ARCHITECT', '✦', 'CREATIVE CODER', '✦',
  'TECH TROUBLESHOOTER', '✦', 'FULL-STACK DEVELOPER', '✦',
  'SYSTEM ARCHITECT', '✦', 'UI ARCHITECT', '✦',
  'CREATIVE CODER', '✦', 'TECH TROUBLESHOOTER', '✦',
]

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useIntersectionObserver(ref: React.RefObject<Element | null>) {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
  return isVisible
}

// ─── Sub-components ──────────────────────────────────────────────────────────
function HeroSection() {
  const [hovered, setHovered] = useState(false)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Checker background */}
      <div className="checker-bg absolute inset-0 opacity-60" />

      {/* Red diagonal slab */}
      <div
        className="absolute top-0 right-0 h-full"
        style={{
          width: '45%',
          background: 'var(--p5-red)',
          clipPath: 'polygon(18% 0, 100% 0, 100% 100%, 0% 100%)',
        }}
      >
        {/* Inner texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(0,0,0,0.3) 28px, rgba(0,0,0,0.3) 30px)',
          }}
        />
      </div>

      {/* Phantom mask silhouette */}
      <div
        className="absolute float-anim"
        style={{ right: '6%', top: '50%', transform: 'translateY(-50%)', opacity: 0.15 }}
      >
        <svg width="360" height="360" viewBox="0 0 200 200" fill="none">
          <ellipse cx="100" cy="80" rx="60" ry="70" fill="white" />
          <ellipse cx="75" cy="70" rx="18" ry="10" fill="#0a0a0a" transform="rotate(-15 75 70)" />
          <ellipse cx="125" cy="70" rx="18" ry="10" fill="#0a0a0a" transform="rotate(15 125 70)" />
          <path d="M70 110 Q100 130 130 110" stroke="#0a0a0a" strokeWidth="4" fill="none" />
          <path d="M60 45 Q75 25 100 30 Q125 25 140 45" stroke="#0a0a0a" strokeWidth="5" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* Decorative lines */}
      {[0.2, 0.4, 0.6, 0.8].map((y, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 h-px opacity-5"
          style={{ top: `${y * 100}%`, background: 'var(--p5-red)' }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full">
        {/* Tag line */}
        <div
          className="flex items-center gap-3 mb-6 animate-fade-right"
          style={{ animationDelay: '0.1s' }}
        >
          <div style={{ width: 32, height: 2, background: 'var(--p5-red)' }} />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.75rem',
              letterSpacing: '0.25em',
              color: 'var(--p5-red)',
              textTransform: 'uppercase',
            }}
          >
            Codename: JOKER
          </span>
        </div>

        {/* Name */}
        <h1
          className="glitch-text animate-fade-up"
          data-text="FAKHRI"
          style={{
            fontFamily: "'Big Shoulders Display', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(5rem, 12vw, 12rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            color: 'var(--p5-white)',
            animationDelay: '0.2s',
          }}
        >
          FAKHRI
        </h1>

        <h2
          className="animate-fade-up"
          style={{
            fontFamily: "'Big Shoulders Display', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(5rem, 12vw, 14rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            color: 'transparent',
            WebkitTextStroke: '2px var(--p5-red)',
            animationDelay: '0.35s',
          }}
        >
          FAWWAZ
          <br />
          AYDIN
        </h2>

        {/* Subtitle */}
        <p
          className="animate-fade-up mt-8 max-w-lg"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 600,
            fontSize: '1.2rem',
            letterSpacing: '0.05em',
            color: 'rgba(245,245,245,0.65)',
            lineHeight: 1.6,
            animationDelay: '0.5s',
          }}
        >
          Informatics engineering student & software developer.
          Bridging the gap between creative web development and seamless IT infrastructure management.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 mt-10 animate-fade-up" style={{ animationDelay: '0.65s' }}>
          <a
            href="#projects"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              display: 'inline-block',
              padding: '14px 36px',
              background: hovered ? 'var(--p5-white)' : 'var(--p5-red)',
              color: hovered ? 'var(--p5-black)' : 'var(--p5-white)',
              fontFamily: "'Big Shoulders Display', sans-serif",
              fontWeight: 800,
              fontSize: '1.1rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
              transition: 'all 0.2s ease',
              border: 'none',
            }}
          >
            View Operations
          </a>
          <a
            href="#contact"
            style={{
              display: 'inline-block',
              padding: '14px 36px',
              background: 'transparent',
              color: 'var(--p5-white)',
              fontFamily: "'Big Shoulders Display', sans-serif",
              fontWeight: 800,
              fontSize: '1.1rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              border: '2px solid rgba(245,245,245,0.3)',
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
              transition: 'all 0.2s ease',
            }}
          >
            Send a Signal
          </a>
        </div>

        {/* Stats strip */}
        <div className="flex gap-8 mt-16 animate-fade-up" style={{ animationDelay: '0.8s' }}>
          {[
            { num: '1+', label: 'Years Active' },
            { num: '3', label: 'Operations' },
            { num: '100%', label: 'Success Rate' },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: "'Big Shoulders Display', sans-serif",
                  fontWeight: 900,
                  fontSize: '2.5rem',
                  color: 'var(--p5-red)',
                  lineHeight: 1,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: 'rgba(245,245,245,0.45)',
                  textTransform: 'uppercase',
                  marginTop: 4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2"
        style={{ transform: 'translateX(-50%)', textAlign: 'center' }}
      >
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            color: 'rgba(245,245,245,0.3)',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          Scroll
        </div>
        <div
          style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(to bottom, var(--p5-red), transparent)',
            margin: '0 auto',
          }}
        />
      </div>
    </section>
  )
}

function TickerSection() {
  return (
    <div
      style={{
        background: 'var(--p5-red)',
        borderTop: '3px solid var(--p5-black)',
        borderBottom: '3px solid var(--p5-black)',
        overflow: 'hidden',
        padding: '12px 0',
      }}
    >
      <div className="ticker-track">
        {[...TICKER_TEXT, ...TICKER_TEXT].map((text, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Big Shoulders Display', sans-serif",
              fontWeight: 800,
              fontSize: '1.1rem',
              letterSpacing: '0.15em',
              color: 'var(--p5-black)',
              marginRight: '3rem',
              whiteSpace: 'nowrap',
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}

function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const visible = useIntersectionObserver(ref)

  return (
    <section
      id="about"
      ref={ref}
      className={`section-hidden ${visible ? 'section-visible' : ''}`}
      style={{ padding: '120px 0', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 50%, rgba(232,0,29,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Character card */}
          <div>
            <div
              style={{
                background: 'var(--p5-gray)',
                border: '2px solid var(--p5-red)',
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                padding: '2px',
                position: 'relative',
              }}
            >
              {/* Card inner */}
              <div
                style={{
                  background: 'var(--p5-gray)',
                  clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                  padding: '32px',
                }}
              >
                {/* Card header */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 24,
                    paddingBottom: 16,
                    borderBottom: '1px solid rgba(232,0,29,0.3)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.65rem',
                      letterSpacing: '0.25em',
                      color: 'var(--p5-red)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Confidant Profile
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.65rem',
                      color: 'rgba(245,245,245,0.3)',
                    }}
                  >
                    #001
                  </span>
                </div>

                {/* Avatar placeholder */}
                <div
                  style={{
                    width: 100,
                    height: 100,
                    background: 'var(--p5-red)',
                    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                    fontSize: '2.5rem',
                  }}
                >
                  🃏
                </div>

                <h3
                  style={{
                    fontFamily: "'Big Shoulders Display', sans-serif",
                    fontWeight: 900,
                    fontSize: '2.5rem',
                    color: 'var(--p5-white)',
                    marginBottom: 4,
                  }}
                >
                  FAKHRI FAWWAZ AYDIN
                </h3>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    color: 'var(--p5-red)',
                    marginBottom: 24,
                  }}
                >
                  THE PHANTOM // JOKER
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {STATS.map((stat) => (
                    <div key={stat.label}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: 5,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: '0.65rem',
                            letterSpacing: '0.15em',
                            color: 'rgba(245,245,245,0.5)',
                            textTransform: 'uppercase',
                          }}
                        >
                          {stat.label}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: '0.65rem',
                            color: stat.color,
                          }}
                        >
                          {stat.value}
                        </span>
                      </div>
                      <div
                        style={{
                          height: 4,
                          background: 'rgba(255,255,255,0.08)',
                          position: 'relative',
                          clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 100%)',
                        }}
                      >
                        <div
                          className="stat-bar-fill"
                          style={{
                            position: 'absolute',
                            top: 0, left: 0,
                            height: '100%',
                            width: visible ? `${stat.value}%` : '0%',
                            background: stat.color,
                            transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${0.1}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: About text */}
          <div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.7rem',
                letterSpacing: '0.25em',
                color: 'var(--p5-red)',
                textTransform: 'uppercase',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div style={{ width: 24, height: 2, background: 'var(--p5-red)' }} />
              Section 01 — About
            </div>

            <h2
              style={{
                fontFamily: "'Big Shoulders Display', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 0.9,
                color: 'var(--p5-white)',
                marginBottom: 24,
              }}
            >
              WILL YOU
              <br />
              <span style={{ color: 'var(--p5-red)' }}>REBEL</span>
              <br />
              AGAINST FATE?
            </h2>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                color: 'rgba(245,245,245,0.65)',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 500,
                fontSize: '1.1rem',
                lineHeight: 1.7,
                maxWidth: 480,
              }}
            >
              <p>
                I am a Full-Stack Developer passionate about engineering scalable,
                high-performance web applications that deliver seamless digital experiences.
              </p>
              <p>
                Combining robust backend architectures with intuitive frontend design,
                I turn complex requirements into clean, maintainable, and efficient code.
                Currently open for software engineering opportunities and impactful tech collaborations.
              </p>
              <p>
                Based in <span style={{ color: 'var(--p5-red)' }}>Bandung, Indonesia</span> —
                operating worldwide.
              </p>
            </div>

            {/* Persona info pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 28 }}>
              {['Persona: ARSENE', 'Arcana: THE FOOL', 'Level: 99', 'SL: MAX'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '6px 14px',
                    background: 'rgba(232,0,29,0.1)',
                    border: '1px solid rgba(232,0,29,0.3)',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    color: 'var(--p5-red)',
                    textTransform: 'uppercase',
                    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  const ref = useRef<HTMLElement>(null)
  const visible = useIntersectionObserver(ref)

  return (
    <section
      id="skills"
      ref={ref}
      className={`section-hidden ${visible ? 'section-visible' : ''}`}
      style={{
        padding: '120px 0',
        background: 'var(--p5-gray)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Diagonal accent */}
      <div
        className="absolute top-0 left-0 w-full h-2"
        style={{ background: 'var(--p5-red)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-2"
        style={{ background: 'var(--p5-red)' }}
      />

      <div className="max-w-7xl mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.7rem',
                letterSpacing: '0.25em',
                color: 'var(--p5-red)',
                textTransform: 'uppercase',
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div style={{ width: 24, height: 2, background: 'var(--p5-red)' }} />
              Section 02 — Abilities
            </div>
            <h2
              style={{
                fontFamily: "'Big Shoulders Display', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                lineHeight: 0.9,
                color: 'var(--p5-white)',
              }}
            >
              MASTERED
              <br />
              <span style={{ color: 'var(--p5-red)' }}>SKILLS</span>
            </h2>
          </div>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.75rem',
              color: 'rgba(245,245,245,0.3)',
              letterSpacing: '0.1em',
            }}
          >
            — PERSONA ACTIVE —
          </div>
        </div>

        {/* Skills grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 16,
          }}
        >
          {SKILLS.map((skill, i) => (
            <div
              key={skill.name}
              style={{
                background: '#0a0a0a',
                border: '1px solid rgba(232,0,29,0.2)',
                padding: '24px 28px',
                clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                transition: 'border-color 0.2s, transform 0.2s',
                animationDelay: `${i * 0.1}s`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(232,0,29,0.8)'
                el.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(232,0,29,0.2)'
                el.style.transform = 'translateY(0)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 16,
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    color: 'var(--p5-white)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {skill.name}
                </h3>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.55rem',
                    letterSpacing: '0.2em',
                    color: 'var(--p5-red)',
                    background: 'rgba(232,0,29,0.1)',
                    border: '1px solid rgba(232,0,29,0.3)',
                    padding: '3px 8px',
                  }}
                >
                  {skill.tag}
                </span>
              </div>

              {/* Level bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: 3,
                    background: 'rgba(255,255,255,0.08)',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, height: '100%',
                      width: visible ? `${skill.level}%` : '0%',
                      background: `linear-gradient(to right, var(--p5-red), #ff6b6b)`,
                      transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.65rem',
                    color: 'var(--p5-red)',
                    minWidth: 32,
                    textAlign: 'right',
                  }}
                >
                  {skill.level}
                </span>
              </div>

              {/* Dotted level indicator */}
              <div style={{ display: 'flex', gap: 3, marginTop: 10 }}>
                {Array.from({ length: 10 }).map((_, di) => (
                  <div
                    key={di}
                    style={{
                      width: 8,
                      height: 8,
                      background: di < Math.round(skill.level / 10) ? 'var(--p5-red)' : 'rgba(255,255,255,0.08)',
                      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                      transition: `background 0.05s ${visible ? di * 0.05 + i * 0.1 : 0}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExploringSection() {
  const ref = useRef<HTMLElement>(null)
  const visible = useIntersectionObserver(ref)

  return (
    <section
      id="exploring"
      ref={ref}
      className={`section-hidden ${visible ? 'section-visible' : ''}`}
      style={{
        padding: '120px 0',
        background: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(232,0,29,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Diagonal accent */}
      <div
        className="absolute top-0 left-0 w-full h-2"
        style={{ background: 'var(--p5-red)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-2"
        style={{ background: 'var(--p5-red)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.7rem',
                letterSpacing: '0.25em',
                color: 'var(--p5-red)',
                textTransform: 'uppercase',
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div style={{ width: 24, height: 2, background: 'var(--p5-red)' }} />
              Section 03 — Exploring
            </div>
            <h2
              style={{
                fontFamily: "'Big Shoulders Display', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                lineHeight: 0.9,
                color: 'var(--p5-white)',
              }}
            >
              EXPLORING
              <br />
              <span style={{ color: 'var(--p5-red)' }}>TECH & SKILLS</span>
            </h2>
          </div>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.75rem',
              color: 'rgba(245,245,245,0.3)',
              letterSpacing: '0.1em',
            }}
          >
            — IN TRAINING / EXPLORING —
          </div>
        </div>

        {/* Skills grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {EXPLORING_SKILLS.map((skill, i) => (
            <div
              key={skill.name}
              style={{
                background: 'var(--p5-gray)',
                border: '1px solid rgba(232,0,29,0.2)',
                padding: '24px 28px',
                clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                transition: 'border-color 0.2s, transform 0.2s',
                animationDelay: `${i * 0.1}s`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(232,0,29,0.8)'
                el.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(232,0,29,0.2)'
                el.style.transform = 'translateY(0)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 16,
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    color: 'var(--p5-white)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {skill.name}
                </h3>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.55rem',
                    letterSpacing: '0.2em',
                    color: 'var(--p5-red)',
                    background: 'rgba(232,0,29,0.1)',
                    border: '1px solid rgba(232,0,29,0.3)',
                    padding: '3px 8px',
                  }}
                >
                  {skill.tag}
                </span>
              </div>

              {/* Level bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: 3,
                    background: 'rgba(255,255,255,0.08)',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, height: '100%',
                      width: visible ? `${skill.level}%` : '0%',
                      background: `linear-gradient(to right, var(--p5-red), #ff6b6b)`,
                      transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.65rem',
                    color: 'var(--p5-red)',
                    minWidth: 32,
                    textAlign: 'right',
                  }}
                >
                  {skill.level}
                </span>
              </div>

              {/* Dotted level indicator */}
              <div style={{ display: 'flex', gap: 3, marginTop: 10 }}>
                {Array.from({ length: 10 }).map((_, di) => (
                  <div
                    key={di}
                    style={{
                      width: 8,
                      height: 8,
                      background: di < Math.round(skill.level / 10) ? 'var(--p5-red)' : 'rgba(255,255,255,0.08)',
                      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                      transition: `background 0.05s ${visible ? di * 0.05 + i * 0.1 : 0}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const visible = useIntersectionObserver(ref)

  return (
    <div
      ref={ref}
      className={visible ? 'card-reveal' : ''}
      style={{
        opacity: visible ? 1 : 0,
        animationDelay: `${index * 0.12}s`,
        position: 'relative',
        cursor: 'pointer',
      }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        style={{
          background: flipped ? 'var(--p5-red)' : 'var(--p5-gray)',
          border: `2px solid ${flipped ? 'var(--p5-red)' : 'rgba(232,0,29,0.25)'}`,
          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
          padding: '28px',
          transition: 'background 0.3s, border-color 0.3s',
          minHeight: 280,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Calling card stripe pattern */}
        {flipped && (
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(0,0,0,0.5) 10px, rgba(0,0,0,0.5) 11px)',
            }}
          />
        )}

        {/* Operation code */}
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            color: flipped ? 'rgba(0,0,0,0.6)' : 'var(--p5-red)',
            marginBottom: 12,
          }}
        >
          {project.code}
        </div>

        {/* Status badge */}
        <div
          style={{
            position: 'absolute',
            top: 28,
            right: 28,
            padding: '4px 10px',
            background: project.status === 'COMPLETE'
              ? 'rgba(129,199,132,0.15)'
              : 'rgba(255,214,0,0.15)',
            border: `1px solid ${project.status === 'COMPLETE' ? '#81c784' : '#ffd600'}`,
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.55rem',
            letterSpacing: '0.15em',
            color: project.status === 'COMPLETE' ? '#81c784' : '#ffd600',
          }}
        >
          {project.status}
        </div>

        <h3
          style={{
            fontFamily: "'Big Shoulders Display', sans-serif",
            fontWeight: 900,
            fontSize: '2rem',
            color: flipped ? 'var(--p5-black)' : 'var(--p5-white)',
            lineHeight: 1,
            marginBottom: 6,
            transition: 'color 0.3s',
          }}
        >
          {project.name}
        </h3>

        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            color: flipped ? 'rgba(0,0,0,0.7)' : 'rgba(245,245,245,0.4)',
            marginBottom: 16,
            transition: 'color 0.3s',
          }}
        >
          {project.type} — {project.year}
        </div>

        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 500,
            fontSize: '1rem',
            lineHeight: 1.6,
            color: flipped ? 'rgba(0,0,0,0.8)' : 'rgba(245,245,245,0.65)',
            marginBottom: 20,
            transition: 'color 0.3s',
          }}
        >
          {project.desc}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '4px 10px',
                background: flipped ? 'rgba(0,0,0,0.15)' : 'rgba(232,0,29,0.1)',
                border: `1px solid ${flipped ? 'rgba(0,0,0,0.2)' : 'rgba(232,0,29,0.3)'}`,
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.6rem',
                letterSpacing: '0.12em',
                color: flipped ? 'rgba(0,0,0,0.8)' : 'var(--p5-red)',
                transition: 'all 0.3s',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Flip hint */}
        <div
          style={{
            position: 'absolute',
            bottom: 14,
            right: 20,
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.55rem',
            color: flipped ? 'rgba(0,0,0,0.4)' : 'rgba(245,245,245,0.2)',
            letterSpacing: '0.1em',
          }}
        >
          {flipped ? 'CLICK TO CLOSE' : 'CLICK TO REVEAL'}
        </div>
      </div>
    </div>
  )
}

function ProjectsSection() {
  const ref = useRef<HTMLElement>(null)
  const visible = useIntersectionObserver(ref)

  return (
    <section
      id="projects"
      ref={ref}
      className={`section-hidden ${visible ? 'section-visible' : ''}`}
      style={{ padding: '120px 0', background: '#0a0a0a', position: 'relative' }}
    >
      {/* Background effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(232,0,29,0.05) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.7rem',
                letterSpacing: '0.25em',
                color: 'var(--p5-red)',
                textTransform: 'uppercase',
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div style={{ width: 24, height: 2, background: 'var(--p5-red)' }} />
              Section 04 — Operations
            </div>
            <h2
              style={{
                fontFamily: "'Big Shoulders Display', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                lineHeight: 0.9,
                color: 'var(--p5-white)',
              }}
            >
              CALLING
              <br />
              <span style={{ color: 'var(--p5-red)' }}>CARDS</span>
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 500,
              fontSize: '1rem',
              color: 'rgba(245,245,245,0.4)',
              maxWidth: 300,
              lineHeight: 1.6,
            }}
          >
            Each card is a calling card. Click to reveal the confession.
          </p>
        </div>

        {/* Projects grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 20,
          }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.code} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const visible = useIntersectionObserver(ref)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(232,0,29,0.25)',
    color: 'var(--p5-white)',
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: 600,
    fontSize: '1.05rem',
    padding: '14px 18px',
    outline: 'none',
    transition: 'border-color 0.2s',
    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
  }

  return (
    <section
      id="contact"
      ref={ref}
      className={`section-hidden ${visible ? 'section-visible' : ''}`}
      style={{
        padding: '120px 0',
        background: 'var(--p5-gray)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Red bar at top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--p5-red)' }} />

      {/* Background text */}
      <div
        className="absolute right-0 bottom-0 pointer-events-none select-none"
        style={{
          fontFamily: "'Big Shoulders Display', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(6rem, 18vw, 16rem)',
          color: 'rgba(232,0,29,0.04)',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        HEIST
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.7rem',
                letterSpacing: '0.25em',
                color: 'var(--p5-red)',
                textTransform: 'uppercase',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div style={{ width: 24, height: 2, background: 'var(--p5-red)' }} />
              Section 05 — Reach Out
            </div>

            <h2
              style={{
                fontFamily: "'Big Shoulders Display', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                lineHeight: 0.9,
                color: 'var(--p5-white)',
                marginBottom: 24,
              }}
            >
              SEND A
              <br />
              <span style={{ color: 'var(--p5-red)' }}>SIGNAL</span>
            </h2>

            <p
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 500,
                fontSize: '1.1rem',
                color: 'rgba(245,245,245,0.6)',
                lineHeight: 1.7,
                maxWidth: 380,
                marginBottom: 40,
              }}
            >
              Interested in working together or exploring a new opportunity?
              Drop a message through the secure channel below, and let's engineer something remarkable.
            </p>

            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { label: 'Email', value: 'fawwazaydinf@gmail.com' },
                { label: 'Location', value: 'Bandung, Indonesia' },
                { label: 'Availability', value: 'Open for new operations' },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.6rem',
                      letterSpacing: '0.2em',
                      color: 'var(--p5-red)',
                      textTransform: 'uppercase',
                      marginBottom: 4,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      color: 'var(--p5-white)',
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: 12, marginTop: 36 }}>
              {[
                { name: 'GitHub', url: 'https://github.com/Fakhri-911' },
                { name: 'Instagram', url: 'https://instagram.com/fakhri_bosca/' },
                { name: 'LinkedIn', url: 'https://linkedin.com/in/fakhri-fawwaz-aydin' },
                { name: 'Threads', url: 'https://threads.net/fakhri_bosca' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    textDecoration: 'none',
                    padding: '8px 16px',
                    background: 'rgba(232,0,29,0.08)',
                    border: '1px solid rgba(232,0,29,0.25)',
                    color: 'rgba(245,245,245,0.6)',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'var(--p5-red)'
                    el.style.color = 'var(--p5-white)'
                    el.style.borderColor = 'var(--p5-red)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'rgba(232,0,29,0.08)'
                    el.style.color = 'rgba(245,245,245,0.6)'
                    el.style.borderColor = 'rgba(232,0,29,0.25)'
                  }}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {submitted ? (
              <div
                style={{
                  background: '#0a0a0a',
                  border: '2px solid var(--p5-red)',
                  clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                  padding: '48px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>🃏</div>
                <h3
                  style={{
                    fontFamily: "'Big Shoulders Display', sans-serif",
                    fontWeight: 900,
                    fontSize: '2.5rem',
                    color: 'var(--p5-red)',
                    marginBottom: 12,
                  }}
                >
                  CALLING CARD SENT
                </h3>
                <p
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 500,
                    fontSize: '1.05rem',
                    color: 'rgba(245,245,245,0.6)',
                  }}
                >
                  The Phantom Thieves will be in touch. Await your change of heart.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  background: '#0a0a0a',
                  border: '1px solid rgba(232,0,29,0.15)',
                  clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                  padding: '40px',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    color: 'var(--p5-red)',
                    marginBottom: 8,
                  }}
                >
                  // ENCRYPTED CHANNEL OPEN
                </div>

                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--p5-red)' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(232,0,29,0.25)' }}
                />

                <input
                  type="email"
                  placeholder="Your email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--p5-red)' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(232,0,29,0.25)' }}
                />

                <textarea
                  placeholder="Your message — be bold."
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--p5-red)' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(232,0,29,0.25)' }}
                />

                <button
                  type="submit"
                  style={{
                    padding: '16px',
                    background: 'var(--p5-red)',
                    border: 'none',
                    color: 'var(--p5-white)',
                    fontFamily: "'Big Shoulders Display', sans-serif",
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
                >
                  SEND CALLING CARD
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer
      style={{
        background: '#0a0a0a',
        borderTop: '2px solid var(--p5-red)',
        padding: '32px',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: "'Big Shoulders Display', sans-serif",
            fontWeight: 900,
            fontSize: '1.5rem',
            color: 'var(--p5-white)',
            letterSpacing: '0.1em',
          }}
        >
          JOKER <span style={{ color: 'var(--p5-red)' }}>.</span>
        </div>

        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.6rem',
            color: 'rgba(245,245,245,0.25)',
            letterSpacing: '0.15em',
          }}
        >
          © 2026 PHANTOM THIEVES — ALL RIGHTS STOLEN
        </div>

        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.6rem',
            color: 'var(--p5-red)',
            letterSpacing: '0.15em',
          }}
        >
          TAKE YOUR TIME.
        </div>
      </div>
    </footer>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    const onScroll = () => setScrolled(window.scrollY > 50)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      {/* Custom cursor */}
      <div
        className="p5-cursor"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />
      <div
        className="p5-cursor-dot"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* Scanline */}
      <div className="scanline" />

      {/* NAV */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0 40px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(232,0,29,0.2)' : 'none',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            fontFamily: "'Big Shoulders Display', sans-serif",
            fontWeight: 900,
            fontSize: '1.4rem',
            color: 'var(--p5-white)',
            textDecoration: 'none',
            letterSpacing: '0.1em',
          }}
        >
          JOKER <span style={{ color: 'var(--p5-red)' }}>.</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
              {item}
            </a>
          ))}
        </div>

        {/* Hamburger (Mobile only) */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 24,
                height: 2,
                background: i === 1 ? 'var(--p5-red)' : 'var(--p5-white)',
                transition: 'all 0.2s',
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(10,10,10,0.98)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
          }}
          onClick={() => setMenuOpen(false)}
        >
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                fontFamily: "'Big Shoulders Display', sans-serif",
                fontWeight: 900,
                fontSize: '3.5rem',
                color: 'var(--p5-white)',
                textDecoration: 'none',
                letterSpacing: '0.08em',
                animation: `fadeSlideUp 0.4s ease ${i * 0.1}s both`,
              }}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* Page sections */}
      <HeroSection />
      <TickerSection />
      <AboutSection />
      <SkillsSection />
      <ExploringSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
