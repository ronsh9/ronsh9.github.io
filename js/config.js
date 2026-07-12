/**
 * Site configuration — edit this file to customize your personal website.
 * All content, links, and metadata live here for easy updates.
 */
const SITE_CONFIG = {
  meta: {
    title: "Ron Shprints",
    description: "Official Website of Ron Shprints",
    copyright: "© 2025-2026 Ron Shprints",
    lastUpdated: "12 JUL 2026",
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
      "I'm a ML researcher working on drug discovery and molecular design. Generally, I'm interested in facilitating the process in which we simulate materials, probe their properties, test them in wet labs, and develop them into useful products.",
    image: "assets/images/IMG_1064.JPG",
    imageAlt: "Ron Shprints",
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
        image: "assets/research_items/decaf.png",
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
        image: "assets/research_items/fragmentflow.png",
        authors: [
          "Ron Shprints",
          "Peter Holderrieth",
          "Juno Nam",
          "Rafael Gómez-Bombarelli",
          "Tommi Jaakkola",
        ],
        venue:
          "AI4Mat and FM4Science Workshops at the 2026 International Conference on Learning Representations",
        year: "2026",
        links: [
          { label: "Paper", url: "https://arxiv.org/abs/2602.02310" },
          { label: "Code", url: "https://github.com/ronsh9/FragmentFlow" },
        ],
      },
    ],
  },

  potpourri: [
    {
      name: "my favorite spot in boston",
      date: "2026",
      url: "#",
      image: "assets/potpourri/boston_fav.JPG",
    },
  ],

  bioPanel: `
    <h2 class="bio-panel__title">Education</h2>
    <p>I obtained my MEng in Computer Science from MIT. There, I worked in Professor <a href="https://people.csail.mit.edu/tommi/" class="link-underline" target="_blank" rel="noopener noreferrer">Tommi Jaakkola</a>'s group and collaborated closely with <a href="https://www.peterholderrieth.com/" class="link-underline" target="_blank" rel="noopener noreferrer">Peter Holderrieth</a> and <a href="https://junonam.com/" class="link-underline" target="_blank" rel="noopener noreferrer">Juno Nam</a>.</p>
    <p>Before that, I graduated from MIT with a B.Sc. in Mathematics and in Computer Science and Engineering. I started my research journey as an undergraduate student at <a href="https://jensenlab.mit.edu/" class="link-underline" target="_blank" rel="noopener noreferrer">Professor Klavs Jensen</a>'s group working with (now Professor) <a href="https://www.zahrtgroup.org/" class="link-underline" target="_blank" rel="noopener noreferrer">Andrew Zahrt</a>. This experience convinced me that the recent advances in ML can be quite impactful on the way we do science, so I decided to devote the rest of my undergraduate studies to explore that route. I continued to <a href="https://coley.mit.edu/" class="link-underline" target="_blank" rel="noopener noreferrer">Professor Connor Coley</a>'s group, where I worked closely with (soon Professor) <a href="https://wenhao-gao.github.io/" class="link-underline" target="_blank" rel="noopener noreferrer">Wenhao Gao</a> for 2 wonderful years. During my last year of college, I worked on video generative models with <a href="https://people.csail.mit.edu/kaiming/" class="link-underline" target="_blank" rel="noopener noreferrer">Professor Kaiming He</a> and on sampling rare events with <a href="https://stephenbates19.github.io/" class="link-underline" target="_blank" rel="noopener noreferrer">Professor Stephen Bates</a>. After graduating, I interned at <a href="https://voltaris.ai/" class="link-underline" target="_blank" rel="noopener noreferrer">Voltaris AI</a>, where I worked on molecular simulation.</p>
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
