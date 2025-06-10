export interface JourneyPost {
  id: string;
  date: string;
  type: 'text' | 'image-text';
  title: string;
  content: string;
  image?: string;
}

export const journeyPosts: JourneyPost[] = [
  {
    id: '1',
    date: '2024-01-15',
    type: 'image-text',
    title: 'Keynote at International AI Conference',
    content: 'Honored to deliver the opening keynote at the International Conference on Artificial Intelligence. Discussed the future of human-AI collaboration and shared insights from our recent research on ethical AI development. The audience engagement was incredible, with thought-provoking questions that will shape our future research directions.',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    date: '2024-01-10',
    type: 'text',
    title: 'New Research Grant Awarded',
    content: 'Excited to announce that our research proposal on "Quantum-Classical Hybrid Algorithms for Optimization" has been awarded a $2.5M grant from the National Science Foundation. This three-year project will explore novel approaches to solving complex optimization problems by leveraging both quantum and classical computing paradigms. Looking forward to collaborating with our partners at MIT and Stanford.'
  },
  {
    id: '3',
    date: '2024-01-05',
    type: 'image-text',
    title: 'Paper Published in Nature Computational Science',
    content: 'Our latest research on machine learning applications in drug discovery has been published in Nature Computational Science. This work represents two years of collaboration with pharmaceutical researchers and demonstrates how AI can accelerate the identification of promising drug candidates. The methodology we developed reduces screening time by 60% while maintaining high accuracy.',
    image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    date: '2023-12-20',
    type: 'text',
    title: 'Invited Panel Discussion on AI Ethics',
    content: 'Participated in a panel discussion on "Responsible AI Development" at the Tech Ethics Summit. Shared perspectives on building ethical frameworks for AI research and the importance of diverse voices in shaping AI policy. The conversation highlighted the need for interdisciplinary collaboration between technologists, ethicists, and policymakers.'
  },
  {
    id: '5',
    date: '2023-12-15',
    type: 'image-text',
    title: 'Teaching Excellence Award',
    content: 'Humbled to receive the University Teaching Excellence Award for contributions to graduate education in computational sciences. This recognition reflects the collaborative efforts with my students and colleagues who make teaching such a rewarding experience. Grateful for the opportunity to mentor the next generation of researchers.',
    image: 'https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '6',
    date: '2023-12-01',
    type: 'text',
    title: 'New Lab Equipment Installation',
    content: 'Our new quantum computing simulation cluster is now operational! This state-of-the-art facility will enable us to test quantum algorithms at unprecedented scales. The installation process took three months, but the capabilities it provides will accelerate our research significantly. Special thanks to the technical team who made this possible.'
  }
];