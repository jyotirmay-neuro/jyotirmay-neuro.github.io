export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  postCount: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'machine-learning-breakthrough-2024',
    title: 'Revolutionary Advances in Machine Learning: A 2024 Perspective',
    excerpt: 'Exploring the latest breakthroughs in machine learning algorithms and their implications for computational science. This comprehensive analysis covers transformer architectures, federated learning, and quantum-classical hybrid approaches.',
    content: `
      <h2>Introduction</h2>
      <p>The field of machine learning has witnessed unprecedented growth in 2024, with several groundbreaking developments that are reshaping our understanding of artificial intelligence and its applications.</p>
      
      <h2>Transformer Architectures</h2>
      <p>The evolution of transformer architectures has led to more efficient and powerful models. Recent developments include:</p>
      <ul>
        <li>Sparse attention mechanisms that reduce computational complexity</li>
        <li>Multi-modal transformers capable of processing text, images, and audio simultaneously</li>
        <li>Improved positional encoding techniques for better sequence understanding</li>
      </ul>
      
      <h2>Federated Learning Advances</h2>
      <p>Privacy-preserving machine learning has taken center stage with federated learning innovations...</p>
      
      <h2>Conclusion</h2>
      <p>These advances represent just the beginning of what promises to be an exciting decade for machine learning research and applications.</p>
    `,
    category: 'machine-learning',
    tags: ['ML', 'AI', 'Research', 'Transformers'],
    date: '2024-01-15',
    readTime: '8 min read'
  },
  {
    id: '2',
    slug: 'computational-biology-insights',
    title: 'Computational Approaches to Understanding Biological Systems',
    excerpt: 'Diving deep into how computational methods are revolutionizing our understanding of complex biological processes. From protein folding predictions to systems biology modeling.',
    content: `
      <h2>The Intersection of Computing and Biology</h2>
      <p>Computational biology represents one of the most exciting interdisciplinary fields, combining the rigor of computer science with the complexity of biological systems.</p>
      
      <h2>Protein Folding Predictions</h2>
      <p>Recent advances in protein structure prediction have transformed drug discovery and molecular biology research...</p>
    `,
    category: 'computational-biology',
    tags: ['Biology', 'Computation', 'Proteins', 'Modeling'],
    date: '2024-01-10',
    readTime: '12 min read'
  },
  {
    id: '3',
    slug: 'quantum-computing-applications',
    title: 'Practical Applications of Quantum Computing in Research',
    excerpt: 'Examining real-world applications of quantum computing in scientific research, from optimization problems to quantum chemistry simulations.',
    content: `
      <h2>Quantum Computing in Practice</h2>
      <p>While quantum computing is still in its early stages, practical applications are beginning to emerge across various scientific domains.</p>
    `,
    category: 'quantum-computing',
    tags: ['Quantum', 'Computing', 'Physics', 'Chemistry'],
    date: '2024-01-05',
    readTime: '10 min read'
  },
  {
    id: '4',
    slug: 'data-visualization-techniques',
    title: 'Advanced Data Visualization for Scientific Communication',
    excerpt: 'Exploring cutting-edge techniques for visualizing complex scientific data, making research more accessible and impactful.',
    content: `
      <h2>The Art and Science of Data Visualization</h2>
      <p>Effective data visualization is crucial for scientific communication and discovery...</p>
    `,
    category: 'data-science',
    tags: ['Visualization', 'Data', 'Communication', 'Research'],
    date: '2023-12-28',
    readTime: '6 min read'
  },
  {
    id: '5',
    slug: 'ethics-in-ai-research',
    title: 'Navigating Ethical Considerations in AI Research',
    excerpt: 'A comprehensive discussion on the ethical implications of artificial intelligence research and the responsibility of researchers in shaping the future.',
    content: `
      <h2>The Ethical Imperative</h2>
      <p>As AI systems become more powerful and prevalent, the ethical considerations surrounding their development and deployment become increasingly critical...</p>
    `,
    category: 'ai-ethics',
    tags: ['Ethics', 'AI', 'Society', 'Responsibility'],
    date: '2023-12-20',
    readTime: '15 min read'
  }
];

export const blogCategories: BlogCategory[] = [
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    description: 'Latest developments in ML algorithms, neural networks, and AI applications',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
    postCount: 8
  },
  {
    id: 'computational-biology',
    name: 'Computational Biology',
    description: 'Interdisciplinary research combining computing and biological sciences',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=600',
    postCount: 6
  },
  {
    id: 'quantum-computing',
    name: 'Quantum Computing',
    description: 'Exploring the frontiers of quantum algorithms and applications',
    image: 'https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg?auto=compress&cs=tinysrgb&w=600',
    postCount: 4
  },
  {
    id: 'data-science',
    name: 'Data Science',
    description: 'Data analysis, visualization, and statistical modeling techniques',
    image: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=600',
    postCount: 12
  },
  {
    id: 'ai-ethics',
    name: 'AI Ethics',
    description: 'Ethical considerations and societal implications of artificial intelligence',
    image: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=600',
    postCount: 5
  }
];