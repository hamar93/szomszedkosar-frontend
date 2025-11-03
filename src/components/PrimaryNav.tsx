import Link from 'next/link';

interface Category {
  name: string;
  slug: string;
}

const categories: Category[] = [
  { name: 'Zöldség és Gyümölcs', slug: '/browse/zoldseg' },
  { name: 'Kamra Termékek', slug: '/browse/kamra' },
  { name: 'Tejtermék és Tojás', slug: '/browse/tej' },
  { name: 'Hús és Húskészítmények', slug: '/browse/hus' },
  { name: 'Pékáru', slug: '/browse/pekaru' },
  { name: 'Kézműves Termékek', slug: '/browse/kezmuves' },
];

const PrimaryNav = () => {
  return (
    <nav>
      <ul>
        {categories.map((category) => (
          <li key={category.slug}>
            <Link href={category.slug}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PrimaryNav;
