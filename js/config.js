/**
 * Site configuration — edit this file to customize your personal website.
 * All content, links, and metadata live here for easy updates.
 */
const SITE_CONFIG = {
  meta: {
    title: "Ron Shprints",
    description: "Official Website — template recreation",
    copyright: "© 2025-2026 Ron Shprints",
    lastUpdated: "26 JUN 2026",
    email: "ronsh at mit dot edu",
  },

  brand: {
    firstName: "Ron",
    lastName: "Shprints",
    homeUrl: "./",
  },

  social: [
    { label: "Github", url: "https://github.com/ronsh9" },
    { label: "Linkedin", url: "https://www.linkedin.com/in/ronshprints/" },
    { label: "X", url: "https://x.com/RShprints" },
  ],

  bio: {
    intro:
      "I want to understand our world in a fundamental way through the lens of machine learning.",
    image: "assets/images/IMG_1064.JPG",
    imageAlt: "Ron Shprints",
    paragraphs: [
      `Recently, I've obtained my MEng in Computer Science from MIT. There, I worked in Prof. <a href="https://people.csail.mit.edu/tommi/" class="link-underline" target="_blank" rel="noopener noreferrer">Tommi Jaakkola</a>'s group and collaborated closely with <a href="https://www.peterholderrieth.com/" class="link-underline" target="_blank" rel="noopener noreferrer">Peter Holderrieth</a> and <a href="https://junonam.com/" class="link-underline" target="_blank" rel="noopener noreferrer">Juno Nam</a>.`,
      "Generally, I'm interested in flow-based generative models and their applications in the natural sciences.",
    ],
  },

  newsletter: {
    consentLabel: "",
    action: "#",
    method: "post",
  },

  contacts: [],

  research: {
    scholarUrl:
      "https://scholar.google.com/citations?hl=en&user=xGMLzr4AAAAJ&view_op=list_works&sortby=pubdate",
    items: [
      {
        title: "Few-step Cofolding with All-Atom Flow Maps",
        authors: [
          "Gianluca Scarpellini",
          "Ron Shprints",
          "Peter Holderrieth",
          "Juno Nam",
          "Pranav Murugan",
          "Rafael Gómez-Bombarelli",
          "Tommi Jaakkola",
          "Maruan Al-Shedivat",
          "Nicholas Matthew Boffi",
          "Avishek Joey Bose",
        ],
        venue: "New",
        year: "2026",
        links: [
          { label: "Preprint", url: "https://arxiv.org/abs/2606.08375" },
          { label: "Code", url: "https://github.com/genesistherapeutics/decaf" },
        ],
      },
      {
        title: "FragmentFlow: Scalable Transition State Generation for Large Molecules",
        authors: [
          "Ron Shprints",
          "Peter Holderrieth",
          "Juno Nam",
          "Rafael Gómez-Bombarelli",
          "Tommi Jaakkola",
        ],
        venue:
          "AI4Mat and FM4Science Workshops at the International Conference on Learning Representations",
        year: "2026",
        links: [
          { label: "Paper", url: "https://arxiv.org/abs/2602.02310" },
          { label: "Code", url: "https://github.com/ronsh9/FragmentFlow" },
        ],
      },
    ],
  },

  store: [
    {
      name: "my favorite spot in boston",
      date: "2026",
      url: "#",
      image: "assets/potpourri/boston_fav.JPG",
    },
  ],

  bioPanel: `
    <h2 class="bio-panel__title">Education</h2>
    <p>I graduated from MIT with a B.Sc. in Mathematics and in Computer Science and Engineering. I started my research journey at <a href="https://jensenlab.mit.edu/" class="link-underline" target="_blank" rel="noopener noreferrer">Professor Klavs Jensen</a>'s group working with (now Professor) <a href="https://www.zahrtgroup.org/" class="link-underline" target="_blank" rel="noopener noreferrer">Andrew Zahrt</a>. I enjoyed the combination between wet lab work and computational analysis, and it was then that I became interested in using machine learning for chemistry. I continued to <a href="https://coley.mit.edu/" class="link-underline" target="_blank" rel="noopener noreferrer">Professor Connor Coley</a>'s group, where I worked closely with (soon Professor) <a href="https://wenhao-gao.github.io/" class="link-underline" target="_blank" rel="noopener noreferrer">Wenhao Gao</a> for 2 wondeful years. During my last year of college, I wanted to learn more about deep learning, and so, I was very fortunate to work with <a href="https://people.csail.mit.edu/kaiming/" class="link-underline" target="_blank" rel="noopener noreferrer">Professor Kaiming He</a>. I was also priveleged to work with <a href="https://stephenbates19.github.io/" class="link-underline" target="_blank" rel="noopener noreferrer">Professor Stephen Bates</a> on more theoretical topics related to statistical methods. This trajectory is rather diverse, but if I were to summarize what I learned from it in one sentence it'd be that I like working on theoretically grounded ideas, and I usually try to push projects from theory to practice. After graduating, I interned at <a href="https://voltaris.ai/" class="link-underline" target="_blank" rel="noopener noreferrer">Voltaris AI</a>.</p>
    <h2 class="bio-panel__title">Teaching</h2>
    <ul>
      <li>Teaching Assistant for Modeling with Machine Learning (6.C01/6.C011), MIT, Spring 2026.</li>
      <li>Teaching Assistant for <a href="https://diffusion.csail.mit.edu/2026/index.html" class="link-underline" target="_blank" rel="noopener noreferrer">Introduction to Flow Matching and Diffusion Models (6.S184)</a>, MIT, Winter 2026.</li>
      <li>Teaching Assistant for <a href="https://gradml.mit.edu/" class="link-underline" target="_blank" rel="noopener noreferrer">Graduate Machine Learning (6.7900)</a>, MIT, Fall 2025.</li>
      <li>Instructor for <a href="https://moldesign.github.io" class="link-underline" target="_blank" rel="noopener noreferrer">Machine Learning and Molecular Design (6.S085)</a>, MIT, Winter 2024.</li>
      <li>Teaching Assistant for Fundamentals of Statistics (18.650), MIT, Fall 2023.</li>
    </ul>

    <h2 class="bio-panel__title">Fun</h2>
    <p>I enjoy swimming quite a bit, but ever since I graduated from college and I no longer live 5 minutes away from an olympic pool, I mostly replaced it with some combination of weightlifting and different forms of cardio. I'm generally a big sports fan: my favorites are basketball and soccer, but you probably can't find a sport that I wouldn't enjoy watching/playing/doing. I also like photography, playing strategic games, and DJing.</p>
  `,
};
