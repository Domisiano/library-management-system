import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting library database seeding...');

  const genres = [
    { name: 'Science Fiction', slug: 'science-fiction' },
    { name: 'Technology', slug: 'technology' },
    { name: 'History', slug: 'history' },
    { name: 'Business', slug: 'business' },
  ];

  const createdGenres = [];

  for (const genre of genres) {
    const result = await prisma.genre.upsert({
      where: { slug: genre.slug },
      update: { name: genre.name },
      create: genre,
    });

    createdGenres.push(result);
  }

  const books = [
    {
      title: 'Dune',
      author: 'Frank Herbert',
      isbn: '9780441172719',
      genreSlug: 'science-fiction',
    },
    {
      title: 'Foundation',
      author: 'Isaac Asimov',
      isbn: '9780553293357',
      genreSlug: 'science-fiction',
    },
    {
      title: 'The Martian',
      author: 'Andy Weir',
      isbn: '9780553418026',
      genreSlug: 'science-fiction',
    },
    {
      title: 'Enders Game',
      author: 'Orson Scott Card',
      isbn: '9780812550702',
      genreSlug: 'science-fiction',
    },
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '9780132350884',
      genreSlug: 'technology',
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'David Thomas and Andrew Hunt',
      isbn: '9780135957059',
      genreSlug: 'technology',
    },
    {
      title: 'Design Patterns',
      author: 'Erich Gamma and others',
      isbn: '9780201633610',
      genreSlug: 'technology',
    },
    {
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen and others',
      isbn: '9780262046305',
      genreSlug: 'technology',
    },
    {
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      isbn: '9780553380163',
      genreSlug: 'history',
    },
    {
      title: 'The Diary of a Young Girl',
      author: 'Anne Frank',
      isbn: '9780553296983',
      genreSlug: 'history',
    },
    {
      title: 'Guns Germs and Steel',
      author: 'Jared Diamond',
      isbn: '9780393317558',
      genreSlug: 'history',
    },
    {
      title: 'The Silk Roads',
      author: 'Peter Frankopan',
      isbn: '9781101912379',
      genreSlug: 'history',
    },
    {
      title: 'The Lean Startup',
      author: 'Eric Ries',
      isbn: '9780307887894',
      genreSlug: 'business',
    },
    {
      title: 'Zero to One',
      author: 'Peter Thiel',
      isbn: '9780804139298',
      genreSlug: 'business',
    },
    {
      title: 'Good to Great',
      author: 'Jim Collins',
      isbn: '9780066620992',
      genreSlug: 'business',
    },
    {
      title: 'The 7 Habits of Highly Effective People',
      author: 'Stephen R. Covey',
      isbn: '9780743269513',
      genreSlug: 'business',
    },
  ];

  for (const book of books) {
    const genre = createdGenres.find(
      (item) => item.slug === book.genreSlug,
    );

    if (!genre) {
      throw new Error(`Genre not found: ${book.genreSlug}`);
    }

    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {},
      create: {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        totalCopies: 5,
        availableCopies: 5,
        genreId: genre.id,
      },
    });
  }

  console.log('Successfully seeded 4 genres and 16 books.');
}

main()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });