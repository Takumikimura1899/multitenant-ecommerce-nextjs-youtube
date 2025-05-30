import { getPayload } from 'payload';
import config from '@payload-config';

const categories = [
  { name: 'All', slug: 'all' },
  {
    name: 'Business & Money',
    color: '#ffb347',
    slug: 'business-money',
    subcategories: [{ name: 'Accounting', slug: 'accounting' }],
  },
  {
    name: 'Technology',
    color: '#3498db',
    slug: 'technology',
    subcategories: [
      { name: 'Software Development', slug: 'software-development' },
      { name: 'Hardware & Gadgets', slug: 'hardware-and-gadgets' },
      { name: 'Artificial Intelligence', slug: 'artificial-intelligence' },
    ],
  },
  {
    name: 'Health & Wellness',
    color: '#2ecc71',
    slug: 'health-and-wellness',
    subcategories: [
      { name: 'Fitness & Exercise', slug: 'fitness-and-exercise' },
      { name: 'Nutrition', slug: 'nutrition' },
      { name: 'Mental Health', slug: 'mental-health' },
    ],
  },
  {
    name: 'Arts & Hobbies',
    color: '#e74c3c',
    slug: 'arts-and-hobbies',
  },
  {
    name: 'Science',
    color: '#9b59b6',
    slug: 'science',
    subcategories: [
      { name: 'Space Exploration', slug: 'space-exploration' },
      { name: 'Environmental Science', slug: 'environmental-science' },
    ],
  },
  {
    name: 'Education',
    color: '#f1c40f',
    slug: 'education',
    subcategories: [
      { name: 'Online Courses', slug: 'online-courses' },
      { name: 'Study Skills', slug: 'study-skills' },
    ],
  },
];

const seed = async () => {
  const payload = await getPayload({ config });

  for (const category of categories) {
    const parentCategory = await payload.create({
      collection: 'categories',
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color,
        parent: null,
      },
    });

    for (const subcategory of category.subcategories || []) {
      await payload.create({
        collection: 'categories',
        data: {
          name: subcategory.name,
          slug: subcategory.slug,
          parent: parentCategory.id,
        },
      });
    }
  }
};

try {
  await seed();
  console.log('Seed completed successfully.');
  process.exit(0);
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}
