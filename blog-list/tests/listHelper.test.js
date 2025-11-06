const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const emptyBlog = [];

    const result = listHelper.totalLikes(emptyBlog);
    assert.strictEqual(result, 0);
  })

  test('when list has only one blog equals the likes of that', () => {
    const oneBlog = [
      {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
      }
    ];

    const result = listHelper.totalLikes(oneBlog);
    assert.strictEqual(result, 5);
  })

  test('of a bigger list is calculated right', () => {
    const multipleBlogs = [
      {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
      },
      {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Test Blog',
      author: 'Sarah Manning',
      url: 'https://www.google.com',
      likes: 8,
      __v: 0
      },
      {
      _id: '5a422aa71b54a676234d17f7',
      title: 'Blog Title',
      author: 'Allison Hendrix',
      url: 'https://www.wikipedia.org',
      likes: 10,
      __v: 0
      }
    ];

    const result = listHelper.totalLikes(multipleBlogs);
    assert.strictEqual(result, 23);
  })
})

describe('favorite blog', () => {
  test('of empty list is none', () => {
    const emptyBlog = [];

    const result = listHelper.favoriteBlog(emptyBlog);
    assert.deepStrictEqual(result, {});
  })

  test('when list has only one blog it equals that', () => {
    const oneBlog = [
      {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
      }
    ];

    const result = listHelper.favoriteBlog(oneBlog);
    assert.deepStrictEqual(result, {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    });
  })

  test('of a bigger list is one with most likes', () => {
    const multipleBlogs = [
      {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
      },
      {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Test Blog',
      author: 'Sarah Manning',
      url: 'https://www.google.com',
      likes: 8,
      __v: 0
      },
      {
      _id: '5a422aa71b54a676234d17f7',
      title: 'Blog Title',
      author: 'Allison Hendrix',
      url: 'https://www.wikipedia.org',
      likes: 10,
      __v: 0
      }
    ];

    const result = listHelper.favoriteBlog(multipleBlogs);
    assert.deepStrictEqual(result, {
      _id: '5a422aa71b54a676234d17f7',
      title: 'Blog Title',
      author: 'Allison Hendrix',
      url: 'https://www.wikipedia.org',
      likes: 10,
      __v: 0
    });
  })
})

describe('most blogs', () => {
  test('of empty list is none', () => {
    const emptyBlog = [];

    const result = listHelper.mostBlogs(emptyBlog);
    assert.deepStrictEqual(result, {});
  })

  test('when list has only one blog it equals that author and total', () => {
    const oneBlog = [
      {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
      }
    ];

    const result = listHelper.mostBlogs(oneBlog);
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    });
  })

  test('of a bigger list is one with most entries', () => {
    const multipleBlogs = [
      {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
      },
      {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Test Blog',
      author: 'Sarah Manning',
      url: 'https://www.google.com',
      likes: 8,
      __v: 0
      },
      {
      _id: '5a422aa71b54a676234d17f7',
      title: 'Blog Title',
      author: 'Allison Hendrix',
      url: 'https://www.wikipedia.org',
      likes: 10,
      __v: 0
      },
      {
      _id: '5a422aa71b54a676234d17f7',
      title: 'Second Blog',
      author: 'Sarah Manning',
      url: 'https://www.youtube.com',
      likes: 6,
      __v: 0
      }
    ];

    const result = listHelper.mostBlogs(multipleBlogs);
    assert.deepStrictEqual(result, {
      author: 'Sarah Manning',
      blogs: 2,
    });
  })
})