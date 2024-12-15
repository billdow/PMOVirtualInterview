// Learning Resources Configuration

export const resourceTypes = {
  videos: 'Videos',
  documents: 'Documents', 
  courses: 'Courses',
  webinars: 'Webinars',
  downloads: 'Downloads',
  ebooks: 'E-Books',
  products: 'Products',
  externalSites: 'External Sites'
};

export const getAllResourceTypes = () => {
  return Object.entries(resourceTypes).map(([key, label]) => ({
    type: key,
    label
  }));
};

export const initialLearningResources = {
  'Project Management Fundamentals': {
    videos: [
      {
        id: 1,
        title: 'Introduction to Project Management',
        description: 'A comprehensive overview of project management principles',
        link: 'https://example.com/video1',
        duration: '45 mins'
      }
    ],
    documents: [
      {
        id: 1,
        title: 'Project Management Handbook',
        description: 'Detailed guide to project management techniques',
        link: 'https://example.com/doc1',
        fileSize: '2.5 MB'
      }
    ],
    courses: [],
    webinars: [],
    downloads: [],
    ebooks: [],
    products: [],
    externalSites: []
  },
  'Agile Methodologies': {
    videos: [],
    documents: [],
    courses: [
      {
        id: 1,
        title: 'Agile Scrum Master Certification',
        description: 'Comprehensive course on Agile and Scrum methodologies',
        link: 'https://example.com/course1',
        provider: 'Agile Academy',
        duration: '40 hours',
        price: '$499'
      }
    ],
    webinars: [],
    downloads: [],
    ebooks: [],
    products: [],
    externalSites: []
  },
  'Leadership and People Management': {
    videos: [],
    documents: [],
    courses: [],
    webinars: [
      {
        id: 1,
        title: 'Effective Team Leadership',
        description: 'Webinar on building and managing high-performance teams',
        link: 'https://example.com/webinar1',
        presenter: 'John Smith',
        date: '2024-02-15'
      }
    ],
    downloads: [],
    ebooks: [
      {
        id: 1,
        title: 'The People Management Playbook',
        description: 'Comprehensive guide to managing and motivating teams',
        link: 'https://example.com/ebook1',
        author: 'Sarah Johnson',
        fileSize: '3.2 MB'
      }
    ],
    products: [
      {
        id: 1,
        title: 'Leadership Assessment Tool',
        description: 'Comprehensive leadership skills evaluation kit',
        link: 'https://example.com/product1',
        vendor: 'Leadership Insights',
        pricing: '$199'
      }
    ],
    externalSites: []
  },
  "PMO Fundamentals": {
    videos: [
      {
        id: 2,
        title: "PMO Fundamentals and Best Practices",
        description: "Learn the core principles of PMO leadership and governance",
        link: "https://www.youtube.com/watch?v=example1",
        duration: "45 mins"
      },
      {
        id: 3,
        title: "Setting Up a Successful PMO",
        description: "Step-by-step guide to establishing an effective PMO",
        link: "https://www.youtube.com/watch?v=example2",
        duration: "30 mins"
      }
    ],
    documents: [
      {
        id: 2,
        title: "PMO Charter Template",
        description: "Template for creating a comprehensive PMO charter",
        link: "/documents/pmo-charter-template.pdf",
        fileSize: "2.5 MB"
      },
      {
        id: 3,
        title: "PMO Maturity Assessment",
        description: "Framework for assessing PMO maturity levels",
        link: "/documents/pmo-maturity-assessment.pdf",
        type: "PDF"
      }
    ],
    courses: [
      {
        id: 2,
        title: "PMO Leadership Certification",
        description: "Comprehensive course covering PMO strategic leadership",
        provider: "PMO Institute",
        duration: "40 hours",
        link: "https://example.com/pmo-leadership-course",
        price: "$499"
      }
    ],
    webinars: [
      {
        id: 2,
        title: "Future of PMO: Emerging Trends",
        description: "Insights into the evolving role of Project Management Offices",
        presenter: "Jane Doe, PMO Expert",
        date: "2024-03-15",
        link: "https://example.com/pmo-trends-webinar"
      }
    ],
    downloads: [
      {
        id: 2,
        title: "PMO Maturity Assessment Toolkit",
        description: "Comprehensive toolkit for assessing and improving PMO capabilities",
        link: "/downloads/pmo-maturity-toolkit.zip",
        fileSize: "5.2 MB"
      }
    ],
    ebooks: [
      {
        id: 2,
        title: "The Strategic PMO Playbook",
        description: "In-depth guide to transforming PMO into a strategic business partner",
        author: "Michael Johnson",
        link: "/ebooks/strategic-pmo-playbook.pdf",
        fileSize: "3.8 MB"
      }
    ],
    products: [
      {
        id: 2,
        title: "PMO Management Software",
        description: "Comprehensive project management and tracking tool",
        vendor: "ProjectPro Solutions",
        pricing: "Starting at $99/month",
        link: "https://example.com/pmo-software"
      }
    ],
    externalSites: []
  },
  "Resource Management": {
    videos: [
      {
        id: 4,
        title: "Resource Capacity Planning",
        description: "Effective techniques for resource capacity planning",
        link: "https://www.youtube.com/watch?v=example3",
        duration: "35 mins"
      }
    ],
    documents: [
      {
        id: 4,
        title: "Resource Allocation Framework",
        description: "Template for resource allocation and prioritization",
        link: "/documents/resource-framework.pdf",
        type: "PDF"
      }
    ],
    externalSites: []
  },
  "Performance Metrics": {
    videos: [
      {
        id: 5,
        title: "KPI Development for PMOs",
        description: "How to develop and track effective PMO KPIs",
        link: "https://www.youtube.com/watch?v=example4",
        duration: "40 mins"
      }
    ],
    documents: [
      {
        id: 5,
        title: "PMO Metrics Dashboard",
        description: "Template for tracking PMO performance metrics",
        link: "/documents/metrics-dashboard.xlsx",
        type: "Excel"
      }
    ],
    externalSites: []
  },
  "Change Management": {
    videos: [
      {
        id: 6,
        title: "Change Management in PMO",
        description: "Managing organizational change through PMO",
        link: "https://www.youtube.com/watch?v=example5",
        duration: "50 mins"
      }
    ],
    documents: [
      {
        id: 6,
        title: "Change Management Toolkit",
        description: "Complete toolkit for managing organizational change",
        link: "/documents/change-toolkit.pdf",
        type: "PDF"
      }
    ],
    externalSites: []
  },
  "Portfolio Management": {
    videos: [
      {
        id: 7,
        title: "Portfolio Optimization Techniques",
        description: "Advanced techniques for portfolio optimization",
        link: "https://www.youtube.com/watch?v=example6",
        duration: "45 mins"
      }
    ],
    documents: [
      {
        id: 7,
        title: "Portfolio Prioritization Framework",
        description: "Framework for project prioritization and selection",
        link: "/documents/portfolio-framework.pdf",
        type: "PDF"
      }
    ],
    externalSites: []
  },
  "Methodology": {
    videos: [
      {
        id: 8,
        title: "Selecting Project Methodologies",
        description: "Guide to choosing appropriate project methodologies",
        link: "https://www.youtube.com/watch?v=example7",
        duration: "40 mins"
      }
    ],
    documents: [
      {
        id: 8,
        title: "Methodology Selection Matrix",
        description: "Tool for selecting project methodologies",
        link: "/documents/methodology-matrix.xlsx",
        type: "Excel"
      }
    ],
    externalSites: []
  },
  "Capability Development": {
    videos: [
      {
        id: 9,
        title: "Building PM Capabilities",
        description: "Strategies for developing project management capabilities",
        link: "https://www.youtube.com/watch?v=example8",
        duration: "35 mins"
      }
    ],
    documents: [
      {
        id: 9,
        title: "Capability Development Plan",
        description: "Template for PM capability development",
        link: "/documents/capability-plan.pdf",
        type: "PDF"
      }
    ],
    externalSites: []
  },
  "Risk Management": {
    videos: [
      {
        id: 10,
        title: "Portfolio Risk Management",
        description: "Managing risks across project portfolio",
        link: "https://www.youtube.com/watch?v=example9",
        duration: "45 mins"
      }
    ],
    documents: [
      {
        id: 10,
        title: "Risk Management Framework",
        description: "Comprehensive risk management framework",
        link: "/documents/risk-framework.pdf",
        type: "PDF"
      }
    ],
    externalSites: []
  },
  "Tools and Technology": {
    videos: [
      {
        id: 11,
        title: "PMO Tool Selection",
        description: "Guide to selecting PMO tools and technologies",
        link: "https://www.youtube.com/watch?v=example10",
        duration: "30 mins"
      }
    ],
    documents: [
      {
        id: 11,
        title: "Tool Assessment Template",
        description: "Template for evaluating PM tools",
        link: "/documents/tool-assessment.xlsx",
        type: "Excel"
      }
    ],
    externalSites: []
  },
  "Stakeholder Management": {
    videos: [
      {
        id: 12,
        title: "Stakeholder Engagement",
        description: "Effective stakeholder engagement strategies",
        link: "https://www.youtube.com/watch?v=example11",
        duration: "40 mins"
      }
    ],
    documents: [
      {
        id: 12,
        title: "Stakeholder Management Plan",
        description: "Template for stakeholder management",
        link: "/documents/stakeholder-plan.pdf",
        type: "PDF"
      }
    ],
    externalSites: []
  },
  "Governance": {
    videos: [
      {
        id: 13,
        title: "PMO Governance Framework",
        description: "Establishing effective PMO governance",
        link: "https://www.youtube.com/watch?v=example12",
        duration: "45 mins"
      }
    ],
    documents: [
      {
        id: 13,
        title: "Governance Framework Template",
        description: "Template for PMO governance framework",
        link: "/documents/governance-framework.pdf",
        type: "PDF"
      }
    ],
    externalSites: []
  },
  "Benefits Realization": {
    videos: [
      {
        id: 14,
        title: "Benefits Tracking and Realization",
        description: "Methods for tracking and realizing project benefits",
        link: "https://www.youtube.com/watch?v=example13",
        duration: "40 mins"
      }
    ],
    documents: [
      {
        id: 14,
        title: "Benefits Realization Framework",
        description: "Framework for tracking project benefits",
        link: "/documents/benefits-framework.xlsx",
        type: "Excel"
      }
    ],
    externalSites: []
  },
  "Strategic Planning": {
    videos: [
      {
        id: 15,
        title: "Strategic Project Alignment Techniques",
        description: "Aligning projects with organizational strategy",
        link: "https://www.youtube.com/watch?v=strategic-alignment",
        duration: "35 mins"
      }
    ],
    courses: [
      {
        id: 15,
        title: "Strategic Project Portfolio Management",
        description: "Advanced course on portfolio optimization",
        provider: "Strategy Academy",
        duration: "30 hours",
        link: "https://example.com/strategic-portfolio-course",
        price: "$599"
      }
    ],
    externalSites: []
  },
  "General PMO": {
    externalSites: [
      {
        id: 'default-1',
        title: 'PMO Learning Channel',
        description: 'A curated list of PMO learning resources',
        type: 'YouTube',
        link: 'https://www.youtube.com/channel/example',
        category: 'General PMO'
      }
    ]
  }
};

export default initialLearningResources;
